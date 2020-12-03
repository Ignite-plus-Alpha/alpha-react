import { useState, useEffect } from 'react';

export const useHttp = (url, itemId, total) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    
    console.log('Sending Http request to URL: ' + url+itemId);
    fetch(url+itemId)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch.');
        }
        return response.json();
      })
      .then(data => {
        
        setFetchedData(data);
      })
      .catch(err => {
        console.log(err);
        
      });
  }, [total]);

  return [fetchedData];
};

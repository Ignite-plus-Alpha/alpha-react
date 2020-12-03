import { useState, useEffect } from 'react';
import Axios from 'axios';

export const remove = (url,wishlistId,itemId,getItems) => {

  
    Axios.delete(
        `http://localhost:8081/wishlist/${wishlistId}/${itemId}`
      )
        .then((response) => {
          console.log(response.data);
          console.log(wishlistId,itemId);
          getItems(wishlistId);
        })
        .catch((e) => {
          console.log(e);
        });
    
 

  return ;
};

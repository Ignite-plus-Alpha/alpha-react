import React, { useEffect } from 'react';

import { useHttp } from './http';
import { remove } from './remove';
import Card from './wishlistCard';


const Character = props => {

    const [fetchedData] = useHttp(
      'http://localhost:8082/item/',props.item,props.total);
  
  
  
  const removeItem = () => {
    remove('http://localhost:8081/wishlist/',props.wishlistId,props.item,props.getItems);

  }
  const moveToCart = () => {
    console.log("button clicked");
     props.moveToCart(fetchedData);
  }

  

  let loadedCharacter = null;

  if (fetchedData) {
    loadedCharacter = {
      id: props.item,
      title: fetchedData.title,
      price:fetchedData.price,
      imageUrl:fetchedData.imageUrl
      
    };
  }

  useEffect(() => {
    return () => {
      console.log('component did unmount');
    };
  }, []);

  let content = <p>Loading Character...</p>;

  if (loadedCharacter) {
    content = (
      <Card
        id={loadedCharacter.id}
        price={loadedCharacter.price}
        title={loadedCharacter.title}
        imageUrl={loadedCharacter.imageUrl}
        removeItem={removeItem}
        moveToCart={moveToCart}

      />
    );
  }
  return content;
};

export default React.memo(Character);

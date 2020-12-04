import React from "react";
import "./item-card.styles.scss";
import { withRouter } from "react-router-dom";

const CategoryItem = ({
  categoryId,
  groupId,
  imageUrl,
  price,
  title,
  history,
  match,
  itemId,
}) => (
  <div className="collection-item">
    {/* {console.log(history, match)} */}
    <div
      className="image-item"
      onClick={() => history.push(`${match.url}/${itemId}`)}
      style={{ backgroundImage: `url(${imageUrl})` }}
    />
    <div className="collection-footer">
      <div className="name"> {title}</div>
      <div className="price">Rs.{price}</div>
    </div>
  </div>
);
export default withRouter(CategoryItem);

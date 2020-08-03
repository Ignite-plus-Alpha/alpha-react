import React from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";
import image from "../../assets/alpha.png";
import Search from "../search/search.component";

export const Header = () => (
  <div className="header">
    <Link to="/" className="logo-conainer">
      <img
        src={image}
        alt="logo"
        style={{ height: "70px", marginLeft: "70px" }}
      />
    </Link>
    <Search />
    <div className="options">
      <Link to="/cart" className="option icon">
        <i className="fa fa-shopping-cart"></i>
      </Link>
      <Link to="/profile" className="option">
        <i className="fa fa-user"></i>
      </Link>
      <Link to="/wishlist" className="option">
        <i className="fa fa-heart"></i>
      </Link>
    </div>
  </div>
);

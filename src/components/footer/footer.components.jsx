import React from "react";
import "./footer.styles.scss";
import { Link } from "react-router-dom";

export const Footer = () => (
  <div className="footer">
    <div className="options">
      <a className="btn btn-social-icon btn-google" href="http://google.com/+">
        <i className="fa fa-google-plus"></i>
      </a>
      <a
        className="btn btn-social-icon btn-facebook"
        href="http://www.facebook.com/profile.php?id="
      >
        <i className="fa fa-facebook"></i>
      </a>
      <a
        className="btn btn-social-icon btn-linkedin"
        href="http://www.linkedin.com/in/"
      >
        <i className="fa fa-linkedin"></i>
      </a>
      <a className="btn btn-social-icon btn-twitter" href="http://twitter.com/">
        <i className="fa fa-twitter"></i>
      </a>
      <a className="btn btn-social-icon btn-google" href="http://youtube.com/">
        <i className="fa fa-youtube"></i>
      </a>
      <a className="btn btn-social-icon" href="mailto:">
        <i className="fa fa-envelope-o"></i>
      </a>
      <Link to="/contact" className="link">
        <b>CONTACT</b>
      </Link>
      <Link to="/aboutus" className="link">
        <b>ABOUT US</b>
      </Link>
    </div>

    <div className="copyright">
      <div className="col-auto ">
        <p>
          <b>© Copyright Alpha 2020</b>
        </p>
      </div>
    </div>
  </div>
);

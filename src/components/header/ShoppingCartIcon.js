import React, { Component } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Axios from "axios";

export default class CartIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total_quantity: this.props.total_quantity,
    };
  }

  render() {
    return (
      <div>
        <IconButton
          aria-owns={this.props.isMenuOpen ? "material-appbar" : undefined}
          aria-haspopup="true"
          color="inherit"
          aria-label="cart"
        >
          <Link to="/cart" className="option">
            <Badge badgeContent={4} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </Link>
        </IconButton>
      </div>
    );
  }
}

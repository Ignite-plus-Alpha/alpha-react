import "./cart.styles.scss";
import React, { Component } from "react";
import Axios from "axios";
import Card from "./cart.card";
import { Link, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.userId,
      cartId: this.props.cartId,
      cartItems: [],
      total_price: 0,
      total_quantity: 0,
      isLoaded: false,
      isConfirmClicked: false,
    };
  }

  componentDidMount = () => {
    console.log("User Found");
    console.log(this.props.cartId);
    this.getCartItems();
  };

  getCartItems = () => {
    Axios.get(`http://localhost:8081/cartItem/${this.state.cartId}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          cartItems: response.data.cartItems,
          total_price: response.data.total_price,
          total_quantity: response.data.total_quantity,
          isLoaded: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  confirmClicked = () => {
    this.setState({ isConfirmClicked: true });
  };

  render() {
    if (this.state.isConfirmClicked)
      return (
        <Redirect
          push
          to={{
            pathname: "/confirmation",
            state: {
              total_price: this.state.total_price,
              total_quantity: this.state.total_quantity,
              items: this.state.cartItems,
            },
          }}
        />
      );
    if (this.state.isLoaded && this.state.total_quantity === 0)
      return (
        <div className="Item">
          <div className="NoItem">
            <center>
              <img src="https://www.scholarswing.in/resources/images/empty-cart.png" />
              <h3>OOPS nothing found in your Cart!!! </h3>
              <h1>
                <Link to="/">SHOP HERE</Link>
              </h1>
            </center>
          </div>
        </div>
      );
    if (this.state.isLoaded)
      return (
        <div className="Item">
          SHOPPING CART
          <br />
          <br />
          {this.state.cartItems.map((item, index) => (
            <Card
              key={index}
              item={item}
              cartId={this.state.cartId}
              getCartItems={this.getCartItems}
            />
          ))}
          <h1>Total Price:₹{this.state.total_price}</h1>
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={this.confirmClicked}
          >
            CONFIRM
          </Button>
        </div>
      );
    return (
      <div className="Item">
        <center>
          <img src="https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif" />
        </center>
      </div>
    );
  }
}

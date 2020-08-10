import React from "react";
import Cart from "./cart";
import { Redirect, withRouter } from "react-router-dom";
import Axios from "axios";

class CartDirectory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartId: "",
      isLoaded: false,
    };
  }

  componentDidMount = () => {
    if (localStorage.getItem("userId")) {
      this.getUserCartId();
    }
  };

  getUserCartId = () => {
    Axios.get(`http://localhost:8081/cart/${localStorage.getItem("userId")}`)
      .then((response) => {
        // localStorage.setItem("cartId", response.data.cartId);
        console.log(response.data);
        this.setState({ cartId: response.data, isLoaded: true });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    if (
      !localStorage.getItem("userId") ||
      localStorage.getItem("userId") === ""
    )
      return (
        <Redirect
          push
          to={{ pathname: "/login", state: { from: this.props.location } }}
        />
      );
    if (this.state.isLoaded)
      return (
        <div>
          <Cart
            key={localStorage.getItem("userId")}
            userId={localStorage.getItem("userId")}
            cartId={this.state.cartId}
          />
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
export default withRouter(CartDirectory);

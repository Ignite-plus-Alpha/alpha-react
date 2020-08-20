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
    if (this.props.email !== null) {
      this.getUserCartId();
    }
  };

  getUserCartId = () => {
    Axios.get(`http://localhost:8081/cart/${localStorage.getItem("userId")}`)
      .then((response) => {
        console.log(response.data);
        this.setState({ cartId: response.data, isLoaded: true });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    if (this.props.email == null) return <Redirect to="/login" />;
    if (this.state.isLoaded)
      return (
        <div>
          <Cart
            key={localStorage.getItem("userId")}
            userId={localStorage.getItem("userId")}
            cartId={this.state.cartId}
            email={this.props.email}
            totalQuantity={this.props.totalQuantity}
            setTotalQuantity={this.props.setTotalQuantity}
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

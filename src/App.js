import React from "react";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import TabPanel from "./pages/profile/profile.component";
import Wishlist from "./pages/wishlist/wishlist.component";
import Cart from "./pages/cart/cart.component";
import { Route, Switch } from "react-router-dom";
import Header from "./components/header/header.component";
import AboutUs from "./pages/AboutUs/aboutus.component";
import Signup from "./pages/signup/signup";
import { Footer } from "./components/footer/footer.components";
import Confirmation from "./pages/confirmation/confirmation.component.jsx";
import CategoryPage from "./pages/category-page/category-page.component";
import ItemPage from "./pages/item-page/item-page.component";
import ProductDetailsPage from "./pages/product-details-page/product-details.component";
import SubHeader from "./components/subheader/subheader.component";
import Login from "./components/login/login.component";
import Invoice from "./pages/Invoice/invoice.component";
import Axios from "axios";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      userId: null,
      totalQuantity: 0,
    };
  }

  setTotalQuantity = (newQuantity) => {
    this.setState({ totalQuantity: newQuantity });
  };

  setEmail = (newEmail) => {
    this.setState({
      email: newEmail,
    });
  };
  setUserId = (newUserId) => {
    this.setState({
      userId: newUserId,
    });
  };
  logout = () => {
    console.log("logout");
    this.setState({
      email: null,
      userId: null,
    });
    localStorage.removeItem("userId");
    localStorage.removeItem("imageUrl");
    localStorage.removeItem("firstName");
    localStorage.removeItem("total_quantity");
  };

  render() {
    const { email, userId, totalQuantity } = this.state;
    console.log(this.state);
    return (
      <div>
        <Header
          email={email}
          userId={userId}
          logout={this.logout}
          totalQuantity={totalQuantity}
        />
        <SubHeader />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <HomePage email={email} />}
          />
          <Route
            exact
            path="/cart"
            render={(props) => (
              <Cart
                email={email}
                userId={userId}
                totalQuantity={totalQuantity}
                setTotalQuantity={this.setTotalQuantity}
              />
            )}
          />
          <Route exact path="/aboutus" component={AboutUs} />
          <Route
            exact
            path="/profile"
            render={(props) => <TabPanel email={email} userId={userId} />}
          />
          <Route exact path="/wishlist" component={Wishlist} />
          <Route exact path="/signup" component={Signup} />
          <Route
            exact
            path="/login"
            render={(props) => (
              <Login
                email={email}
                setEmail={this.setEmail}
                setUserId={this.setUserId}
                setTotalQuantity={this.setTotalQuantity}
              />
            )}
          />
          <Route exact path="/confirmation" component={Confirmation} />
          <Route exact path="/invoice" component={Invoice} />
          <Route exact path="/:groupId" component={CategoryPage} />
          <Route exact path="/:groupId/:categoryId" component={ItemPage} />
          <Route
            exact
            path="/:groupId/:categoryId/:itemId"
            render={(props) => (
              <ProductDetailsPage
                totalQuantity={totalQuantity}
                setTotalQuantity={this.setTotalQuantity}
              />
            )}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

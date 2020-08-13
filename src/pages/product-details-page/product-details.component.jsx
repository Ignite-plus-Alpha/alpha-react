import React from "react";
import productService from "../../services/product-service";
import WomenTopWear from "./item-detail-table/womeN-top-wear";
import Book from "./item-detail-table/book";
import Grocery from "./item-detail-table/grocery";
import HomeAndLiving from "./item-detail-table/homeAndLiving";
import "./product-details.styles.scss";
import Footwear from "./item-detail-table/footwear";
import Axios from "axios";
import CustomAlert from "./customAlert";

class ProductDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: "",
      groupId: "",
      itemId: "",
      item: "",
      description: "",
      size: [],
      chosenSize: "na",
      addToCart: false,
      cartId: "",
      showAlert: false,
    };
  }

  componentDidMount() {
    this.setState(
      {
        categoryId: this.props.match.params.categoryId,
        groupId: this.props.match.params.groupId,
        itemId: this.props.match.params.itemId,
      },
      () => this.getItem()
    );
    if (localStorage.getItem("userId")) this.getUserCartId();
  }

  getItem = () => {
    productService
      .getItemsByGroupIdCategoryIdItemId(
        this.state.groupId,
        this.state.categoryId,
        this.state.itemId
      )
      .then((response) => {
        console.log(response);
        this.setState({
          item: response.data,
          description: response.data.description,
          size: response.data.size,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  handleAlertClose = () => {
    this.setState({ showAlert: false });
  };

  handleClick = (event) => {
    console.log("add to Bag");
    {
      this.addToBag();
    }
  };

  addToBag = () => {
    if (
      !localStorage.getItem("userId") ||
      localStorage.getItem("userId") === ""
    ) {
      window.location = "/signup";
    }
    console.log(this.state.cartId);
    if (this.state.size !== null) {
      if (this.state.chosenSize === "na") this.setState({ showAlert: true });
      else {
        this.checkInBag();
      }
    } else {
      this.checkInBag();
    }
  };

  getUserCartId = () => {
    Axios.get(`http://localhost:8081/cart/${localStorage.getItem("userId")}`)
      .then((response) => {
        // localStorage.setItem("cartId", response.data.cartId);
        console.log(response.data);
        this.setState({ cartId: response.data });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  checkInBag = () => {
    Axios.get(
      `http://localhost:8081/cartItem/${this.state.cartId}/${this.state.itemId}/${this.state.chosenSize}`
    )
      .then((response) => {
        console.log(response.data);
        if (response.data !== "") {
          if (response.data.itemQuantity < 10) {
            this.updateCart(
              response.data.itemId,
              response.data.itemSize,
              response.data.itemQuantity
            );
          } else
            alert(
              "Already this item exists in cart with maximum quantity limit."
            );
        } else {
          this.addToCart();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  updateCart = (itemId, itemSize, itemQuantity) => {
    Axios.put(
      `http://localhost:8081/cartItem/${
        this.state.cartId
      }/${itemId}/${itemSize}/${itemQuantity + 1}`
    )
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // alert("Successfully added the item to your Cart.");
    window.location = "/cart";
  };

  addToCart = () => {
    const data = {
      cartId: this.state.cartId,
      itemId: this.state.itemId,
      itemSize: this.state.chosenSize,
      itemTitle: this.state.item.title,
      itemGroup: this.state.item.groupId,
      itemCategory: this.state.item.categoryId,
      itemImageURL: this.state.item.imageUrl,
      itemQuantity: 1,
      itemPrice: this.state.item.price,
    };
    Axios.post(`http://localhost:8081/cartItem`, data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    // alert("Successfully added the item to your Cart.");
    window.location = "/cart";
  };

  renderSwitchCategory(category) {
    switch (category) {
      case "dress":
        return <WomenTopWear description={this.state.description} />;
      case "jacket and shrug":
        return <WomenTopWear description={this.state.description} />;
      case "shirt":
        return <WomenTopWear description={this.state.description} />;
      case "kurta":
        return <WomenTopWear description={this.state.description} />;
      case "jeans":
        return <WomenTopWear description={this.state.description} />;
      case "chair":
        return <HomeAndLiving description={this.state.description} />;
      case "bed":
        return <HomeAndLiving description={this.state.description} />;
      case "dining table":
        return <HomeAndLiving description={this.state.description} />;
      case "couch":
        return <HomeAndLiving description={this.state.description} />;
      default:
        return <></>;
    }
  }
  renderSwitchGroup(group) {
    switch (group) {
      case "book":
        return <Book description={this.state.description} />;
      case "footwear":
        return <Footwear description={this.state.description} />;
      case "grocery":
        return <Grocery description={this.state.description} />;
      default:
        return <></>;
    }
  }

  render() {
    console.log(this.state.size);
    return (
      <div className="product-preview">
        <div className="flexbox-container-column">
          <div className="item-image">
            <img
              src={this.state.item.imageUrl}
              alt="product"
              style={{ maxWidth: "60%", height: "auto" }}
            ></img>
          </div>
          <div className="flexbox-container-row">
            <div className="item-header">
              <div
                style={{
                  color: "black",
                  fontSize: "35px",
                  fontWeight: "bold",
                  marginBottom: "2%",
                }}
              >
                {this.state.item.title}
              </div>
              <div
                className="subtitle"
                style={{
                  color: "gray",
                  marginTop: "10px",
                  marginBottom: "10px",
                  fontSize: "15px",
                  fontWeight: "bold",
                }}
              >
                {this.state.groupId} {this.state.item.categoryId}
              </div>
              <div
                className="price"
                style={{ color: "teal", fontSize: "18px", fontWeight: "bold" }}
              >
                Rs. {this.state.item.price}
              </div>
              {this.state.size !== null ? (
                <div className="size">
                  Select size :{" "}
                  {this.state.size.map((s) => {
                    if(s!==this.state.chosenSize){
                      return(
                    <a
                      class="ui teal circular label"
                      style={{ margin: "10px" }}
                      onClick={() => this.setState({ chosenSize: s })}
                    >
                      {s.toUpperCase()}
                    </a>
                      )
                    }
                    else{
                      return(
                      <a
                      class="ui black circular label"
                      style={{ margin: "10px" }}
                      onClick={() => this.setState({ chosenSize: s })}
                    >
                      {s.toUpperCase()}
                    </a>)
                  }})}
                </div>
              ) : (
                <></>
              )}
            </div>

            <div class="ui divider"></div>
            <div className="specification-table" style={{ width: "500px" }}>
              {this.renderSwitchCategory(this.state.categoryId)}
            </div>
            <div className="specification-table">
              {this.renderSwitchGroup(this.state.groupId)}{" "}
            </div>
            <span>
              <button
                class="ui teal button"
                style={{ margin: "7%", minWidth: 200 }}
                onClick={this.handleClick}
              >
                {" "}
                <i class="icon cart"></i>Add to cart
              </button>
            </span>
          </div>
          {console.log(this.state.chosenSize)}
        </div>
        {this.state.showAlert && (
          <CustomAlert
            handleAlertClose={this.handleAlertClose}
            showAlert={this.state.showAlert}
          />
        )}
      </div>
    );
  }
}
export default ProductDetailsPage;

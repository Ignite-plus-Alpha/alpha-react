import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import "./invoice.styles.scss";
import Button from "@material-ui/core/Button";
import ItemTable from "./itemTable.component";
import Axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ProfileDataService from "../../services/profile-service";

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: "",
      isLoaded: false,
      addressId: "",
      orderStatus: "",
      items: [],
      orderPrice: 0,
      orderQuantity: 0,
      address: [],
      isShoppingClicked: false,
    };
  }

  printDocument() {
    const input = document.getElementById("pdfdiv");
    html2canvas(input).then((canvas) => {
      var imgWidth = 200;
      var pageHeight = 1000;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      var position = 0;
      var heightLeft = imgHeight;
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      pdf.save("download.pdf");
    });
  }
  componentDidMount() {
    console.log(this.props);

    this.setState({
      orderId: this.props.location.state.orderId,
    });
    this.getOrderId();
  }
  loadAddress = () => {
    ProfileDataService.getAddressByUserIdAddressId(
      localStorage.getItem("userId"),
      this.state.addressId
    )
      .then((response) => {
        console.log(response);
        this.setState({
          address: response.data,
          isLoaded: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  getOrderId = () => {
    Axios.get(
      `http://localhost:8081/order/${this.props.location.state.orderId}`
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          orderId: response.data.orderId,
          addressId: response.data.deliveryAddress,
          orderStatus: response.data.orderStatus,
          items: JSON.parse(response.data.orderItems),
          orderPrice: response.data.orderPrice,
          orderQuantity: response.data.orderQuantity,
        });
        this.loadAddress();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  isClicked = () => {
    this.setState({ isShoppingClicked: true });
  };

  render() {
    if (this.state.isShoppingClicked)
      return (
        <Redirect
          to={{
            pathname: "/",
          }}
        />
      );
    if (!this.state.isLoaded) return <div></div>;
    return (
      <div id="pdfdiv" className="txt">
        <div className="outbox">
          <div className="box">
            <div className="checkMark">
              <div className="pic">
                <img
                  src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Dark-512.png"
                  alt=""
                />
              </div>
              <div className="text">Thank you for your purchase!</div>
            </div>
            <div className="content">
              <div className="info">
                <div className="order">
                  <div className="title">
                    Your order number is : {this.state.orderId} <br />
                    Your order Status is : {this.state.orderStatus} <br />
                    Your order Price is : {this.state.orderPrice}{" "}
                  </div>
                  <br />
                </div>
                <div className="address">
                  <div className="title">Billing & Shipping information :</div>
                  line1: {this.state.address.address_line1}
                  <br />
                  line2: {this.state.address.address_line2}
                  <br />
                  city: {this.state.address.city}
                  <br />
                  state: {this.state.address.state}
                  <br />
                  country: {this.state.address.country}
                  <br />
                  zipcode: {this.state.address.zipcode}
                  <br />
                </div>
              </div>
              {console.log(this.state.items)}
              <ItemTable items={this.state.items} />
              <div className="btn">
                <br />
                <br />
                <Button
                  onClick={this.printDocument}
                  variant="contained"
                  color="primary"
                  style={{ minWidth: 200 }}
                >
                  Generate Pdf
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.isClicked}
                  style={{ minWidth: 200, marginLeft: "70%" }}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(Invoice);

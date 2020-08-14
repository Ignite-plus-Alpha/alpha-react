import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PayPalBtn from "./PayWithPayPal";
import ProfileDataService from "../../services/profile-service";
import DeliveryAddressCard from "../confirmation/DeliveryAddressCard";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import WalletCard from "../confirmation/WalletCard.card";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import { width, height } from "@material-ui/system";

const styles = (theme) => ({
  confirmation: { width: "100%", textAlign: "center" },
  root: { width: "100%", height: "1000px", textTransform: "capitalize" },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: "auto",
    width: "300px",
    marginBottom: "1%",
    alignText: "center",
    alignItems: "center",
  },
});

class Confirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total_price: 0,
      total_quantity: 0,
      address: [],
      deliveryAddressId: "",
      userId: "",
      paymentCardId: "",
      wallet: [],
      isAddressLoaded: false,
      isCardLoaded: false,
    };
  }

  paymentHandler = (details, data) => {
    /** Here you can call your backend API
      endpoint and update the database */
    console.log(details, data);
  };

  componentDidMount = () => {
    this.setState({
      total_price: this.props.location.state.total_price,
      total_quantity: this.props.location.state.total_quantity,
      isLoaded: true,
    });
    this.loadProfileData();
    this.loadAddress();
    this.loadWallet();
  };

  loadProfileData = () => {
    ProfileDataService.getProfileByEmailId("pragathiindran@gmail.com")
      .then((response) => {
        console.log(response.data);
        this.setState({
          userId: response.data.userId,
          selectedAddressId: response.data.default_address,
          selectedCardId: response.data.default_card,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  loadAddress = () => {
    ProfileDataService.getAddressByUserIdAddressId(
      localStorage.getItem("userId"),
      this.props.location.state.deliveryAddressId
    )
      .then((response) => {
        console.log(response);
        this.setState({
          address: response.data,
          isAddressLoaded: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  loadWallet = () => {
    ProfileDataService.getWalletByUserIdWalletId(
      localStorage.getItem("userId"),
      this.props.location.state.paymentCardId
    )
      .then((response) => {
        console.log(response);
        this.setState({
          wallet: response.data,
          isCardLoaded: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { classes } = this.props;
    if (!(this.state.isAddressLoaded && this.state.isCardLoaded))
      return <div></div>;
    return (
      <div className={classes.confirmation}>
        <div>
          <p style={{ fontSize: "28px", textAlign: "center" }}>PAYMENT</p>

          <br />
          <div>
            <Grid
              container
              spacing={40}
              direction="row"
              justify="space-evenly"
              alignItems="flex-start"
            >
              <Typography
                className={classes.title}
                variant="h5"
                component="h2"
                width="auto"
                gutterBottom
              >
                <LocationOnIcon fontSize="inherit" />
                &nbsp; Delivery Address
                <DeliveryAddressCard
                  address={this.state.address}
                  handleChangeAddress={this.handleChangeAddress}
                  selectedAddressId={this.state.selectedAddressId}
                />
              </Typography>

              <Typography
                className={classes.title}
                variant="h5"
                component="h2"
                width="auto"
                gutterBottom
              >
                <CreditCardIcon fontSize="inherit" />
                &nbsp; Selected Card
                <WalletCard
                  index="card"
                  wallet={this.state.wallet}
                  handleChangeCard={this.handleChangeCard}
                  selectedCardId={this.state.selectedCardId}
                />
              </Typography>
            </Grid>
          </div>

          <br />
          <h2>
            Total Price:{this.state.total_price}
            <br />
            Total Items:{this.state.total_quantity}
          </h2>
          <PayPalBtn
            total={this.state.total_price}
            // total={32}
            currency={"INR"}
            onSuccess={this.paymentHandler}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Confirmation);

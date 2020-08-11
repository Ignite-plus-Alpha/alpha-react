import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PayPalBtn from "./PayWithPayPal";
import ProfileDataService from "../../services/profile-service";
import DeliveryAddressCard from "./DeliveryAddressCard";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import WalletCard from "./WalletCard.card";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import { width, height } from "@material-ui/system";

const styles = (theme) => ({
  confirmation: { width: "100%", textAlign: "center" },
  root: { width: "100%", height: "700px", textTransform: "capitalize" },
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
      addresses: [],
      selectedAddressId: "",
      userEmail: "",
      userId: "",
      selectedCardId: "",
      wallets: [],
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
    });
    this.loadProfileData();
    this.loadAddresses();
    this.loadWallets();
  };

  loadProfileData = () => {
    ProfileDataService.getProfileByEmailId("arpitha6556@gmail.com")
      .then((response) => {
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

  loadAddresses = () => {
    ProfileDataService.getAddressesByUserId(this.state.userId)
      .then((response) => {
        this.setState({
          addresses: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  loadWallets = () => {
    ProfileDataService.getWalletsByUserId(this.state.userId)
      .then((response) => {
        this.setState({
          wallets: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  handleChangeAddress = (event) => {
    this.setState({ selectedAddressId: event.target.value });
  };

  handleChangeCard = (event) => {
    this.setState({ selectedCardId: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.confirmation}>
        <div>
          <p style={{ fontSize: "28px", textAlign: "center" }}>CONFIRMATION</p>

          <br />
          <div>
            <Grid
              container
              spacing={3}
              className={classes.root}
              alignItems="flex-start"
              direction="row"
              justify="space-evenly"
            >
              <Grid
                item
                xs={6}
                sm={2}
                container
                direction="column"
                justify="space-around"
                alignItems="center"
              >
                {this.state.addresses.map((address, index) => {
                  if (this.state.selectedAddressId === address.address_id) {
                    return (
                      <div>
                        <Paper className={classes.paper}>
                          <Typography
                            className={classes.title}
                            variant="h5"
                            component="h2"
                            width="auto"
                            gutterBottom
                          >
                            <LocationOnIcon fontSize="inherit" />
                            &nbsp; Delivery Address
                          </Typography>
                          <Typography>
                            {address.address_line1}
                            <br />
                            {address.address_line2}
                            <br />
                            {address.city}
                            <br />
                            {address.state}
                            <br />
                            {address.country}
                            <br />
                            zipcode : {address.zipcode}
                          </Typography>
                        </Paper>
                        <Button>Add</Button>
                      </div>
                    );
                  }
                })}
                {this.state.value}
                {this.state.addresses.map((address, index) => (
                  <DeliveryAddressCard
                    key={index}
                    address={address}
                    handleChangeAddress={this.handleChangeAddress}
                    selectedAddressId={this.state.selectedAddressId}
                  />
                ))}
              </Grid>
              <Grid
                item
                xs={6}
                sm={2}
                container
                direction="column"
                justify="space-around"
                alignItems="center"
              >
                {this.state.wallets.map((wallet, index) => {
                  if (this.state.selectedCardId === wallet.wallet_id) {
                    return (
                      <div>
                        <Paper className={classes.paper}>
                          <Typography
                            className={classes.title}
                            variant="h5"
                            component="h2"
                            width="auto"
                            gutterBottom
                          >
                            <CreditCardIcon fontSize="inherit" />
                            &nbsp; Selected Card
                          </Typography>
                          <Typography>
                            {wallet.cardholder_name}
                            <br />
                            {wallet.card_number}
                            <br />
                            {wallet.expiry_date}
                            <br />
                            {wallet.upi_id}
                            <br />
                            <br />
                          </Typography>
                        </Paper>
                        <Button>Add</Button>
                      </div>
                    );
                  }
                })}
                {this.state.value}
                {this.state.wallets.map((wallet, index) => (
                  <WalletCard
                    key={index}
                    wallet={wallet}
                    handleChangeCard={this.handleChangeCard}
                    selectedCardId={this.state.selectedCardId}
                  />
                ))}
              </Grid>
            </Grid>
          </div>
          <br />
          <h3>
            Total Price:{this.state.total_price}
            <br />
            Total Items:{this.state.total_quantity}
          </h3>
          <PayPalBtn
            amount={this.state.total_price}
            currency={"INR"}
            onSuccess={this.paymentHandler}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Confirmation);

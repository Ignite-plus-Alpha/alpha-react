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
import AddAddressModal from "../../components/Modal/add-address-form.component";
import AddCardModal from "../../components/Modal/add-card-form.component";

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
      addresses: [],
      selectedAddressId: "",
      userEmail: "",
      userId: "",
      selectedCardId: "",
      wallets: [],
      isLoaded: false,
      addressCounter: "",
      walletCounter: "",
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
    this.loadAddresses();
    this.loadWallets();
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

  loadAddresses = () => {
    ProfileDataService.getAddressesByUserId(localStorage.getItem("userId"))
      .then((response) => {
        this.setState({
          addresses: response.data,
          addressCounter: response.data.length,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  loadWallets = () => {
    ProfileDataService.getWalletsByUserId(localStorage.getItem("userId"))
      .then((response) => {
        this.setState({
          wallets: response.data,
          walletCounter: response.data.length,
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
    if (!this.state.isLoaded) return <div></div>;
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
                        <DeliveryAddressCard
                          key={index}
                          address={address}
                          handleChangeAddress={this.handleChangeAddress}
                          selectedAddressId={this.state.selectedAddressId}
                        />
                        <AddAddressModal
                          userId={localStorage.getItem("userId")}
                          email="pragathiindran@gmail.com"
                          loadAddresses={this.loadAddresses}
                          loadProfileData={this.loadProfileData}
                          addressCounter={this.state.addressCounter}
                        />
                      </div>
                    );
                  }
                })}
                {this.state.value}
                {this.state.addresses.map((address, index) => {
                  if (this.state.selectedAddressId !== address.address_id) {
                    return (
                      <DeliveryAddressCard
                        key={index}
                        address={address}
                        handleChangeAddress={this.handleChangeAddress}
                        selectedAddressId={this.state.selectedAddressId}
                      />
                    );
                  }
                })}
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
                        {/* <Paper className={classes.paper}> */}
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
                        <WalletCard
                          key={index}
                          wallet={wallet}
                          handleChangeCard={this.handleChangeCard}
                          selectedCardId={this.state.selectedCardId}
                        />
                        <AddCardModal
                          UserId={localStorage.getItem("userId")}
                          email="pragathiindran@gmail.com"
                          loadWallets={this.loadWallets}
                          loadProfileData={this.loadProfileData}
                          walletCounter={this.state.walletCounter}
                        />
                      </div>
                    );
                  }
                })}
                {this.state.value}
                {this.state.wallets.map((wallet, index) => {
                  if (this.state.selectedCardId !== wallet.wallet_id) {
                    return (
                      <WalletCard
                        key={index}
                        wallet={wallet}
                        handleChangeCard={this.handleChangeCard}
                        selectedCardId={this.state.selectedCardId}
                      />
                    );
                  }
                })}
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

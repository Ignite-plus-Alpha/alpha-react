import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ProfileDataService from "../../services/profile-service";
import DeliveryAddressCard from "./DeliveryAddressCard";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import WalletCard from "./WalletCard.card";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import { width, height } from "@material-ui/system";
import AddAddressModal from "../../components/Modal/add-address-form.component";
import AddCardModal from "../../components/Modal/add-card-form.component";
import { Redirect } from "react-router-dom";
import Card from "../cart/cart.card";
import AddressList from "./addressList";
import CardList from "./cardList";

const styles = (theme) => ({
  confirmation: {
    marginLeft: "2%",
    marginRight: "2%",
  },
  root: { textTransform: "capitalize" },
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
      isProccedToPayClicked: false,
      items: [],
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
      items: this.props.location.state.items,
      //isLoaded: true,
    });
    this.loadProfileData();
    this.loadAddresses();
    this.loadWallets();
    this.setState({ isLoaded: true });
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

  proceedToPayClicked = () => {
    this.setState({ isProccedToPayClicked: true });
  };

  render() {
    const { classes } = this.props;
    if (this.state.isProccedToPayClicked)
      return (
        <Redirect
          push
          to={{
            pathname: "/payment",
            state: {
              deliveryAddressId: this.state.selectedAddressId,
              paymentCardId: this.state.selectedCardId,
              total_price: this.state.total_price,
              total_quantity: this.state.total_quantity,
            },
          }}
        />
      );
    if (!this.state.isLoaded) return <div></div>;
    return (
      <div className={classes.confirmation}>
        <div className={classes.root}>
          <p style={{ fontSize: "28px", textAlign: "center" }}>CONFIRMATION</p>

          <div>
            <Grid
              container
              direction="row"
              // justify="space-evenly"
              alignItems="flex-start"
            >
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >
                <Grid
                  container
                  direction="row"
                  justify="space-evenly"
                  alignItems="flex-start"
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
                        </div>
                      );
                    }
                  })}

                  {this.state.wallets.map((wallet, index) => {
                    if (this.state.selectedCardId === wallet.wallet_id) {
                      return (
                        <div>
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
                        </div>
                      );
                    }
                  })}
                </Grid>
                <Grid container direction="row">
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                  >
                    <Typography
                      className={classes.title}
                      variant="h5"
                      component="h2"
                      width="auto"
                      gutterBottom
                    >
                      Other Address:
                    </Typography>

                    <AddAddressModal
                      userId={localStorage.getItem("userId")}
                      email="pragathiindran@gmail.com"
                      loadAddresses={this.loadAddresses}
                      loadProfileData={this.loadProfileData}
                      addressCounter={this.state.addressCounter}
                    />
                  </Grid>
                  {this.state.addresses.map((address, index) => {
                    if (this.state.selectedAddressId !== address.address_id) {
                      return (
                        <AddressList
                          key={index}
                          address={address}
                          handleChangeAddress={this.handleChangeAddress}
                          selectedAddressId={this.state.selectedAddressId}
                        />
                      );
                    }
                  })}
                </Grid>
                <Grid container direction="row">
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="flex-start"
                  >
                    <Typography
                      className={classes.title}
                      variant="h5"
                      component="h2"
                      width="auto"
                      gutterBottom
                    >
                      Other Card:
                    </Typography>
                    <AddCardModal
                      UserId={localStorage.getItem("userId")}
                      email="pragathiindran@gmail.com"
                      loadWallets={this.loadWallets}
                      loadProfileData={this.loadProfileData}
                      walletCounter={this.state.walletCounter}
                    />
                  </Grid>
                  {this.state.wallets.map((wallet, index) => {
                    if (this.state.selectedCardId !== wallet.wallet_id) {
                      return (
                        <CardList
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
            </Grid>
            <div style={{ textAlign: "center" }}>
              <h2>Total Price:{this.state.total_price}</h2>
              <Button
                variant="contained"
                color="primary"
                onClick={this.proceedToPayClicked}
                style={{ minWidth: 200 }}
              >
                Proceed To Pay
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Confirmation);

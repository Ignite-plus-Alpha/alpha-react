import React from "react";
import "./profile.styles.scss";
import { Divider } from "@material-ui/core";
import ProfileDataService from "../../services/profile-service";
import { WalletCard } from "../../components/card/WalletCard.component";
import AddCardModal from "../../components/Modal/add-card-form.component";
import WalletImage from "../../assets/wallet.webp";
import Grid from "@material-ui/core/Grid";

class Wallets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wallets: [],
      cardHolderName: "",
      cardNumber: "",
      expiryDate: "",
      defaultCard: "",
      user: null,
      walletCounter: "",
    };
  }

  componentDidMount() {
    this.loadProfileData();
    this.loadWallets();
  }

  loadWallets = () => {
    ProfileDataService.getWalletsByUserId(this.props.userId)
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

  loadProfileData = () => {
    ProfileDataService.getProfileByEmailId(this.props.userEmail)
      .then((response) => {
        this.setState({
          user: response.data,
          defaultCard: response.data.default_card,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    if (this.state.wallets.length === 0)
      return (
        <div className="no-address">
          <AddCardModal
            UserId={this.props.userId}
            email={this.props.userEmail}
            loadWallets={this.loadWallets}
            loadProfileData={this.loadProfileData}
            walletCounter={this.state.walletCounter}
          />
          <div className="No-wallet-placeholder">
            <img
              src={WalletImage}
              style={{ width: "auto", height: "15vw", marginTop: "15%" }}
            />
          </div>
        </div>
      );
    else
      return (
        <div className="profile-addresses-page">
          <div
            className="heading"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "3%",
            }}
          >
            <span>
              <h2>SAVED CARDS</h2>
            </span>
            <AddCardModal
              UserId={this.props.userId}
              email={this.props.userEmail}
              loadWallets={this.loadWallets}
              loadProfileData={this.loadProfileData}
              walletCounter={this.state.walletCounter}
            />
          </div>
          <h5>PREFERRED CARD</h5>
          {this.state.wallets.map((wallet) => {
            var first4 = wallet.card_number.toString().slice(0, 4);
            var last5 = wallet.card_number.toString().slice(-5);

            var mask = wallet.card_number
              .toString()
              .slice(4, -5)
              .replace(/\d/g, "*");

            if (wallet.wallet_id === this.state.defaultCard)
              return (
                <WalletCard
                  loadWallets={this.loadWallets}
                  loadProfileData={this.loadProfileData}
                  email={this.props.userEmail}
                  walletId={wallet.wallet_id}
                  currentUserUserId={this.props.userId}
                  cardHolderName={wallet.cardholder_name}
                  cardNumber={first4 + mask + last5}
                  expiryDate={wallet.expiry_date}
                  defaultCard={this.state.defaultCard}
                />
              );
          })}
          <h5>OTHER CARDS</h5>

          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
            style={{ maxWidth: "80%" }}
          >
            {this.state.wallets.map((wallet) => {
              var first4 = wallet.card_number.toString().slice(0, 4);
              var last5 = wallet.card_number.toString().slice(-5);

              var mask = wallet.card_number
                .toString()
                .slice(4, -5)
                .replace(/\d/g, "*");

              if (wallet.wallet_id !== this.state.defaultCard)
                return (
                  <WalletCard
                    loadWallets={this.loadWallets}
                    loadProfileData={this.loadProfileData}
                    email={this.props.userEmail}
                    walletId={wallet.wallet_id}
                    currentUserUserId={this.props.userId}
                    cardHolderName={wallet.cardholder_name}
                    cardNumber={first4 + mask + last5}
                    expiryDate={wallet.expiry_date}
                    defaultCard={this.state.defaultCard}
                  />
                );
            })}
          </Grid>
        </div>
      );
  }
}
export default Wallets;

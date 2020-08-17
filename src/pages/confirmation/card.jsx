import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ProfileDataService from "../../services/profile-service";
import AddCardModal from "../../components/Modal/add-card-form.component";

import CardList from "./cardList";

const styles = (theme) => ({
  confirmation: {
    marginLeft: "2%",
    marginRight: "2%",
  },
  add: { alignItems: "right", textAlign: "right" },
});

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "",
      userId: "",
      selectedCardId: "",
      wallets: [],
      isLoaded: false,

      walletCounter: "",
    };
  }

  componentDidMount = () => {
    this.loadProfileData();
    this.loadWallets();
    this.setState({ isLoaded: true });
  };

  loadProfileData = () => {
    ProfileDataService.getProfileByEmailId("pragathiindran@gmail.com")
      .then((response) => {
        console.log(response.data);
        this.setState({
          userId: response.data.userId,

          selectedCardId: response.data.default_card,
        });
        this.props.handleCardChange(response.data.default_card);
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

  handleChangeCard = (event) => {
    this.setState({ selectedCardId: event.target.value });
    this.props.handleCardChange(event.target.value);
  };

  render() {
    const { classes } = this.props;

    if (!this.state.isLoaded) return <div></div>;
    return (
      <div className={classes.confirmation}>
        <div className={classes.add}>
          <AddCardModal
            UserId={localStorage.getItem("userId")}
            email="pragathiindran@gmail.com"
            loadWallets={this.loadWallets}
            loadProfileData={this.loadProfileData}
            walletCounter={this.state.walletCounter}
          />
        </div>
        {this.state.wallets.map((wallet, index) => (
          <CardList
            key={index}
            wallet={wallet}
            handleChangeCard={this.handleChangeCard}
            selectedCardId={this.state.selectedCardId}
          />
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(Card);

import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ProfileDataService from "../../services/profile-service";
import AddressList from "./addressList";
import AddAddressModal from "../../components/Modal/add-address-form.component";

const styles = (theme) => ({
  confirmation: {
    marginLeft: "2%",
    marginRight: "2%",
  },
  add: { alignItems: "right", textAlign: "right" },
});

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
      selectedAddressId: "",
      userEmail: "",
      userId: "",
      isLoaded: false,
      addressCounter: "",
    };
  }

  componentDidMount = () => {
    this.loadProfileData();
    this.loadAddresses();
    this.setState({ isLoaded: true });
  };

  loadProfileData = () => {
    ProfileDataService.getProfileByEmailId("pragathiindran@gmail.com")
      .then((response) => {
        console.log(response.data);
        this.setState({
          userId: response.data.userId,
          selectedAddressId: response.data.default_address,
        });
        this.props.handleAddressChange(response.data.default_address);
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

  handleChangeAddress = (event) => {
    this.setState({ selectedAddressId: event.target.value });
    this.props.handleAddressChange(event.target.value);
  };

  render() {
    const { classes } = this.props;

    if (!this.state.isLoaded) return <div></div>;
    return (
      <div className={classes.confirmation}>
        <div className={classes.add}>
          <AddAddressModal
            userId={localStorage.getItem("userId")}
            email="pragathiindran@gmail.com"
            loadAddresses={this.loadAddresses}
            loadProfileData={this.loadProfileData}
            addressCounter={this.state.addressCounter}
          />
        </div>
        {this.state.addresses.map((address, index) => (
          <div>
            <AddressList
              key={index}
              address={address}
              handleChangeAddress={this.handleChangeAddress}
              selectedAddressId={this.state.selectedAddressId}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(Address);

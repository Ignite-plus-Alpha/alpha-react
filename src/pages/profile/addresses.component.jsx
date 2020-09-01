import React from "react";
import "./profile.styles.scss";
import ProfileDataService from "../../services/profile-service";
import { AddressCard } from "../../components/card/AddressCard.component";
import AddAddressModal from "../../components/Modal/add-address-form.component";
import LocationImage from "../../assets/map.webp";
import Grid from "@material-ui/core/Grid";

class Addresses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
      defaultAddress: "",
      default: "",
      otherAddresses: "",
      addressCounter: "",
    };
  }

  componentDidMount() {
    this.loadProfileData();
    this.loadAddresses();
  }

  loadProfileData = () => {
    ProfileDataService.getProfileByEmailId(this.props.userEmail)
      .then((response) => {
        this.setState({
          // user: response.data,
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          mobile: response.data.mobile,
          defaultAddress: response.data.default_address,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  loadAddresses = () => {
    ProfileDataService.getAddressesByUserId(this.props.userId)
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

  render() {
    console.log(this.state);
    if (this.state.addresses.length === 0)
      return (
        <div className="no-address">
          <AddAddressModal
            userId={this.props.userId}
            email={this.props.userEmail}
            loadAddresses={this.loadAddresses}
            loadProfileData={this.loadProfileData}
            addressCounter={this.state.addressCounter}
          />
          <div className="NoAddress">
            <img
              src={LocationImage}
              style={{ width: "auto", height: "25vw" }}
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
              <h2>SAVED ADDRESSES</h2>
            </span>

            <AddAddressModal
              userId={this.props.userId}
              email={this.props.userEmail}
              loadAddresses={this.loadAddresses}
              loadProfileData={this.loadProfileData}
              addressCounter={this.state.addressCounter}
            />
          </div>

          <div className="card-list">
            <h5>DEFAULT ADDRESS</h5>
            {this.state.addresses.map((address) => {
              if (address.address_id === this.state.defaultAddress)
                return (
                  <AddressCard
                    key={address.addressId}
                    loadAddresses={this.loadAddresses}
                    loadProfileData={this.loadProfileData}
                    emailId={this.props.userEmail}
                    userId={this.props.userId}
                    addressId={address.address_id}
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    mobile={this.state.mobile}
                    addressType={address.address_type}
                    addressLine1={address.address_line1}
                    addressLine2={address.address_line2}
                    city={address.city}
                    state={address.state}
                    country={address.country}
                    zipcode={address.zipcode}
                    defaultAddress={this.state.defaultAddress}
                  />
                );
            })}
            <h5>OTHER ADDRESSES</h5>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="flex-start"
              style={{ maxWidth: "80%" }}
            >
              {this.state.addresses.map((address) => {
                if (address.address_id !== this.state.defaultAddress)
                  return (
                    <AddressCard
                      key={address.addressId}
                      loadAddresses={this.loadAddresses}
                      loadProfileData={this.loadProfileData}
                      emailId={this.props.userEmail}
                      userId={this.props.userId}
                      userId={this.props.userId}
                      addressId={address.address_id}
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      mobile={this.state.mobile}
                      addressLine1={address.address_line1}
                      addressType={address.address_type}
                      addressLine2={address.address_line2}
                      city={address.city}
                      state={address.state}
                      country={address.country}
                      zipcode={address.zipcode}
                      defaultAddress={this.state.defaultAddress}
                    />
                  );
              })}
            </Grid>
          </div>
        </div>
      );
  }
}
export default Addresses;

import React from "react";
import "./profile.styles.scss";
import ProfileDataService from "../../services/profile-service";
import { AddressCard } from "../../components/card/AddressCard.component";
import AddAddressModal from "../../components/Modal/add-address-form.component";

class Addresses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "chinmay@gmail.com",
      currentUserUserId: "a46edc1a-db4a-40c4-8daf-fbbfed21d9d0",
      addresses: [],
      defaultAddress: "",
      default: "",
      otherAddresses: "",
    };
  }

  componentDidMount() {
    this.loadProfileData();
    this.loadAddresses();
  }

  loadProfileData = () => {
    ProfileDataService.getProfileByEmailId(this.state.userEmail)
      .then((response) => {
        this.setState(
          {
            // user: response.data,
            firstName: response.data.first_name,
            lastName: response.data.last_name,
            mobile: response.data.mobile,
            defaultAddress: response.data.default_address,
          },
          console.log(response.data)
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  loadAddresses = () => {
    ProfileDataService.getAddressesByUserId(this.state.currentUserUserId)
      .then((response) => {
        this.setState({
          addresses: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    console.log(this.state.addresses);
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
            <h2>Saved ADDRESSES</h2>
          </span>
          <AddAddressModal
            userId={this.state.currentUserUserId}
            email={this.state.userEmail}
            loadAddresses={this.loadAddresses}
          />
        </div>

        <div className="card-list">
          <h5>DEFAULT ADDRESS</h5>
          {this.state.addresses.map((address) => {
            if (address.address_id === this.state.defaultAddress)
              return (
                <AddressCard
                  loadAddresses={this.loadAddresses}
                  loadProfileData={this.loadProfileData}
                  emailId={this.state.userEmail}
                  currentUserUserId={this.state.currentUserUserId}
                  addressId={address.address_id}
                  firstName={this.state.firstName}
                  lastName={this.state.lastName}
                  mobile={this.state.mobile}
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
          <h5>Other ADDRESSES</h5>
          {this.state.addresses.map((address) => {
            if (address.address_id !== this.state.defaultAddress)
              return (
                <AddressCard
                  loadAddresses={this.loadAddresses}
                  loadProfileData={this.loadProfileData}
                  emailId={this.state.userEmail}
                  currentUserUserId={this.state.currentUserUserId}
                  addressId={address.address_id}
                  firstName={this.state.firstName}
                  lastName={this.state.lastName}
                  mobile={this.state.mobile}
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
        </div>
      </div>
    );
  }
}
export default Addresses;

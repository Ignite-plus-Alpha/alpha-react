import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import profileService from "../../services/profile-service";
import RadioButtonsGroup from "../../components/radio-button/radiobutton.component";
import axios from "axios";
class UpdateAddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      addressLine1: this.props.addressLine1,
      addressLine2: this.props.addressLine2,
      city: this.props.city,
      state: this.props.state,
      country: this.props.country,
      zipcode: this.props.zipcode,
      addressType: this.props.addressType,
      checkedB: "false",
    };
  }

  show = (dimmer) => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });
  //handle field change
  handleTypeChange = (type) => {
    this.setState({ addressType: type });
  };
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value.length === 6) {
      this.setState({
        error: "",
      });
      axios
        .get(`https://api.postalpincode.in/pincode/${e.target.value}`)
        .then((res) =>
          this.setState(
            {
              state: res.data[0].PostOffice[0].State,
              city: res.data[0].PostOffice[0].District,

              country: res.data[0].PostOffice[0].Country,
              // addressLine2: `${res.data[0].PostOffice[0].Name},${res.data[0].PostOffice[0].Division},${res.data[0].PostOffice[0].Block}`,
            },
            console.log(res)
          )
        )
        .then(() => {
          document.getElementById("zipcode").classList.remove("error");
        })
        .catch((err) => {
          document.getElementById("zipcode").className = "error";
          this.setState({
            error: `${this.props.invalidError || "Invalid PIN Code"}`,
          });
        });
    }
    if (e.target.value.length !== 6) {
      this.setState({
        city: "",
        state: "",
        district: "",
        error: `${this.props.lenghtError || "ZIP code must be of 6 digits"}`,
      });
    }
  }

  //handle field change
  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  //handleFormSubmit
  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      address_line1: this.state.addressLine1,
      address_line2: this.state.addressLine2,
      city: this.state.city,
      zipcode: this.state.zipcode,
      state: this.state.state,
      country: this.state.country,
      address_type: this.state.addressType,
    };

    profileService
      .updateAddress(this.props.userId, this.props.addressId, data)
      .then((response) => console.log(response.data))
      .then(() => {
        console.log(this.props.emailId, this.state.AddressId);
        if (this.state.checkedB === true) {
          profileService
            .setDefaultAddressByEmailId(
              this.props.emailId,
              this.props.addressId
            )
            .then(this.props.loadProfileData)
            .catch((e) => console.log(e));
        }
      })
      .then(this.props.loadAddresses)
      .catch((e) => console.log(e));
    this.setState({ open: false });
  };
  handleToggleChange = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
    console.log(event.target.checked);
  };

  render() {
    const {
      open,
      dimmer,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      zipcode,
    } = this.state;

    return (
      <div>
        <Button
          variant="outlined"
          sie="small"
          color="primary"
          startIcon={<EditIcon />}
          onClick={this.show("default")}
        >
          edit
        </Button>

        <Modal
          dimmer={dimmer}
          open={open}
          onClose={this.close}
          style={{ padding: "2%", width: "25%" }}
        >
          <form class="ui form" onSubmit={this.handleSubmit}>
            <h4>Shipping Address</h4>

            <div class="field">
              <label>Address line 1</label>
              <div class="fields">
                <div class="sixteen wide field">
                  <input
                    type="text"
                    name="addressLine1"
                    placeholder=" Address line 1"
                    onChange={this.handleChange}
                    value={addressLine1}
                    required
                  />
                </div>
              </div>
            </div>
            <div class="field">
              <label> Address line 2</label>
              <div class="fields">
                <div class="sixteen wide field">
                  <input
                    type="text"
                    name="addressLine2"
                    placeholder=" Address line 2"
                    onChange={this.handleChange}
                    value={addressLine2}
                    required
                  />
                </div>
              </div>
            </div>
            <div class="two fields">
              <div class="field">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  onChange={this.handleChange}
                  disabled
                  value={city}
                  required
                ></input>
              </div>
              <div class="field">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  onChange={this.handleChange}
                  value={state}
                  disabled
                  required
                ></input>
              </div>
            </div>
            <div class="two fields">
              <div class=" thirteen wide field">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  placeholder="country"
                  onChange={this.handleChange}
                  value={country}
                  disabled
                  required
                ></input>
              </div>
              <div class=" six wide field">
                {this.state.error ? (
                  <span style={{ color: "red" }} className="error-display">
                    {this.state.error}
                  </span>
                ) : null}
                <label>zipcode</label>
                <input
                  name="zipcode"
                  placeholder="Pin Code"
                  onChange={(e) => this.onChange(e)}
                  value={zipcode}
                  id="zipcode"
                  type="number"
                  maxLength={6}
                  minLength={6}
                  required
                />
              </div>
            </div>
            <RadioButtonsGroup
              handleTypeChange={this.handleTypeChange}
              addressType={this.props.addressType}
            />
            <div>Make default addresss</div>
            <Switch
              checked={state.checkedB}
              onChange={this.handleToggleChange}
              color="primary"
              name="checkedB"
              inputProps={{ "aria-label": "primary checkbox" }}
            />

            <div
              className="action-buttons"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <span style={{ minWidth: "200" }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  value="Submit Form"
                >
                  Update
                </Button>
              </span>
              <span>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.close}
                >
                  Cancel
                </Button>
              </span>
            </div>
          </form>{" "}
        </Modal>
      </div>
    );
  }
}

export default UpdateAddressForm;

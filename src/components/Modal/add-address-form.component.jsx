import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import profileService from "../../services/profile-service";
import Switch from "@material-ui/core/Switch";
import RadioButtonsGroup from "../../components/radio-button/radiobutton.component";
import axios from "axios";
import Alert from "../alert/alert.component";

class AddAddressModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: "",
      contact: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
      checkedB: false,
      AddressId: "",
      addressType: "home",
      ShowAlert: false,
    };
  }

  handleAlertClose = () => {
    this.setState({ showAlert: false });
  };
  handleToggleChange = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
    console.log(event.target.checked);
  };

  show = (dimmer) => () => {
    if (this.props.addressCounter < 5) this.setState({ dimmer, open: true });
    else this.setState({ showAlert: true });
  };
  close = () =>
    this.setState({
      open: false,
      name: "",
      contact: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
      checkedB: false,
      AddressId: "",
      addressType: "",
      error: "",
    });

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

  //handle field change
  handleTypeChange = (type) => {
    this.setState({ addressType: type });
  };

  //handleFormSubmit
  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      userid: this.props.userId,
      name: this.state.name,
      contact: this.state.contact,
      address_line1: this.state.addressLine1,
      address_line2: this.state.addressLine2,
      city: this.state.city,
      zipcode: this.state.zipcode,
      state: this.state.state,
      country: this.state.country,
      address_type: this.state.addressType,
    };
    if (this.state.checkedB === true)
      console.log("set as deafult", this.props.email);
    else console.log("no");
    // profileService.setDefaultAddressByEmailId()
    console.log(this.state);

    profileService
      .createAddress(data)
      .then((response) =>
        this.setState({ AddressId: response.data.address_id })
      )
      .then(() => {
        console.log(this.props.email, this.state.AddressId);
        if (this.state.checkedB === true) {
          profileService
            .setDefaultAddressByEmailId(this.props.email, this.state.AddressId)
            .then((response) => console.log(response))
            .then(this.props.loadProfileData)
            .catch((e) => console.log(e));
        }
      })
      .then(this.props.loadAddresses)
      .catch((e) => console.log(e));

    this.setState({
      name: "",
      contact: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
      open: false,
    });
  };

  render() {
    const {
      open,
      dimmer,
      name,
      contact,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      checkedB,
      zipcode,
    } = this.state;

    return (
      <div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button
          onClick={this.show("blurring")}
          class="ui teal button"
          style={{ position: "right", minWidth: "205px", marginRight: "15vw" }}
        >
          <i className="fa fa-home fa-lg"></i>&nbsp;&nbsp;&nbsp;
          <b>ADD NEW ADDRESS</b>
        </button>
        <Modal
          dimmer={dimmer}
          open={open}
          onClose={this.close}
          style={{ padding: "3%", width: "40%" }}
        >
          <form class="ui form" onSubmit={this.handleSubmit}>
            <h4>Shipping Address</h4>
            <div class="field">
              <label>
                Receiver Nmae<span style={{ color: "red" }}>&nbsp;*</span>
              </label>
              <div class="fields">
                <div class="sixteen wide field">
                  <input
                    type="text"
                    name="name"
                    placeholder="Reciever name "
                    onChange={this.handleChange}
                    value={name}
                    required
                  />
                </div>
              </div>
            </div>
            <div class="field">
              <label>
                Receiver Contact
                <span style={{ color: "red" }}>&nbsp;*</span>
              </label>
              <div class="fields">
                <div class="sixteen wide field">
                  <input
                    type="tel"
                    name="contact"
                    placeholder="Mobile"
                    onChange={this.handleChange}
                    value={contact}
                    required
                  />
                </div>
              </div>
            </div>

            <div class="field">
              <label>
                Address line 1<span style={{ color: "red" }}>&nbsp;*</span>
              </label>
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
              <label>
                {" "}
                Address line 2<span style={{ color: "red" }}>&nbsp;*</span>
              </label>
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
                <label>
                  City<span style={{ color: "red" }}>&nbsp;*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  onChange={this.handleChange}
                  value={city}
                  disabled
                  required
                ></input>
              </div>
              <div class="field">
                <label>
                  State<span style={{ color: "red" }}>&nbsp;*</span>
                </label>
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
                <label>
                  Country<span style={{ color: "red" }}>&nbsp;*</span>
                </label>
                <input
                  type="text"
                  name="country"
                  placeholder="country"
                  onChange={this.handleChange}
                  value={country}
                  required
                  disabled
                ></input>
              </div>

              <div class=" six wide field">
                {this.state.error ? (
                  <span style={{ color: "red" }} className="error-display">
                    {this.state.error}
                  </span>
                ) : null}
                <label>
                  zipcode<span style={{ color: "red" }}>&nbsp;*</span>
                </label>
                <input
                  onChange={(e) => this.onChange(e)}
                  name="zipcode"
                  placeholder="Pin Code"
                  value={this.state.zipcode}
                  id="zipcode"
                  type="number"
                  maxLength={6}
                  minLength={6}
                  required
                />
              </div>
            </div>
            <RadioButtonsGroup handleTypeChange={this.handleTypeChange} />
            <div>Make default addresss</div>
            <Switch
              checked={checkedB}
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
                marginTop: "3%",
              }}
            >
              <span style={{ minWidth: "200" }}>
                {/* <Button positive type='submit' value='Submit Form'>
                  Update
                </Button> */}
                <Button
                  variant="contained"
                  type="submit"
                  value="Submit Form"
                  style={{ backgroundColor: "#F50057", color: "white" }}
                >
                  ADD
                </Button>
              </span>
              <span>
                {" "}
                {/* <Button negative onClick={this.close}>                  
                  Cancel
                </Button> */}
                <Button
                  variant="contained"
                  onClick={this.close}
                  style={{ backgroundColor: "#3F51B5", color: "white" }}
                >
                  CANCEL
                </Button>
              </span>
            </div>
          </form>
        </Modal>
        {this.state.showAlert && (
          <Alert
            handleAlertClose={this.handleAlertClose}
            message={
              "you have reached your max address storage limit to add a new address delete an existing one"
            }
            showAlert={this.state.showAlert}
          />
        )}
      </div>
    );
  }
}

export default AddAddressModal;

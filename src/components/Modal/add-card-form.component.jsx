import React, { Component } from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import profileService from "../../services/profile-service";
import Switch from "@material-ui/core/Switch";
import Alert from "../alert/alert.component";
import Cards from "react-credit-cards";

import "react-credit-cards/es/styles-compiled.css";

class AddCardModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      cardHolderName: "",
      cardNumber: "",
      expirydate: "",
      upiid: "",
      checkedA: false,
      cardId: "",
      ShowAlert: false,
      currMonth: "",
    };
  }
  handleAlertClose = () => {
    this.setState({ showAlert: false });
  };

  show = (dimmer) => () => {
    if (this.props.walletCounter < 5) this.setState({ dimmer, open: true });
    else this.setState({ showAlert: true });
  };

  close = () =>
    this.setState({
      open: false,
      cardHolderName: "",
      cardNumber: "",
      expirydate: "",
      upiid: "",
      checkedA: false,
    });
  handleToggleChange = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  //handle field change
  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };
  //handleFormSubmit
  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      cardholder_name: this.state.cardHolderName,
      card_number: this.state.cardNumber,
      expiry_date: this.state.expirydate,
      userid: this.props.UserId,
      upi_id: this.state.upiid,
    };
    console.log(this.props);

    profileService
      .createWallet(data)
      .then((response) => this.setState({ cardId: response.data.wallet_id }))
      .then(() => {
        console.log(this.props.email, this.state.cardId);
        if (this.state.checkedA === true) {
          profileService
            .setDefaultWalletByEmailId(this.props.email, this.state.cardId)
            .then((response) => console.log(response))
            .then(this.props.loadProfileData)
            .catch((e) => console.log(e));
        }
      })
      .then(this.props.loadWallets)
      .catch((e) => console.log(e));
    this.setState({
      cardHolderName: "",
      cardNumber: "",
      upiid: "",
      expirydate: "",
      open: false,
    });
  };

  getCurrentMonth = () => {
    var d = new Date();
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    if (m <= 9) m = `0${m}`;
    var final = `${y}-${m}`;
    return final;
    // this.setState({ currMonth: `${y}-${m}` });
    // console.log(`${y}-${m}`);
  };
  render() {
    const {
      open,
      dimmer,
      cardHolderName,
      cardNumber,
      checkedA,
      upiid,
      expirydate,
    } = this.state;

    return (
      <div>
        <button
          onClick={this.show("blurring")}
          class="ui teal button"
          style={{ position: "right", minWidth: "205px", marginRight: "15vw" }}
        >
          <i className="fa  fa-credit-card"></i>
          &nbsp;&nbsp;&nbsp;
          <b>ADD NEW CARD</b>
        </button>

        <Modal
          dimmer={dimmer}
          open={open}
          onClose={this.close}
          style={{ padding: "3%", width: "40%", minWidth: "800px" }}
        >
          <div
            className="card-form"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "3%",
            }}
          >
            <Cards
              number={cardNumber}
              name={cardHolderName}
              expiry={expirydate}
              cvc={expirydate}
            />
            <form
              class="ui form"
              onSubmit={this.handleSubmit}
              style={{ marginLeft: "50px" }}
            >
              <h4>Card details</h4>
              <div class="field">
                <label>Card Holder Name</label>
                <div class="fields">
                  <div class="sixteen wide field">
                    <input
                      type="text"
                      name="cardHolderName"
                      placeholder="Name On Card"
                      onChange={this.handleChange}
                      value={cardHolderName}
                      maxLength="25"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="field">
                <label> Card Number</label>
                <div class="fields">
                  <div class="sixteen wide field">
                    <input
                      type="tel"
                      name="cardNumber"
                      placeholder="Card Number"
                      onChange={this.handleChange}
                      value={cardNumber}
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="two fields">
                <div class=" six wide field">
                  <label>upi id</label>
                  <input
                    type="text"
                    name="upiid"
                    placeholder="Upi Id"
                    onChange={this.handleChange}
                    value={upiid}
                  ></input>
                </div>
                <div class=" six wide field">
                  <label>expiry date</label>
                  <input
                    type="month"
                    name="expirydate"
                    placeholder="Expiry Date"
                    onChange={this.handleChange}
                    value={expirydate}
                    min="2020-09"
                    required
                  ></input>
                </div>
              </div>
              <div>Make default Wallet</div>
              <Switch
                checked={checkedA}
                onChange={this.handleToggleChange}
                color="primary"
                name="checkedA"
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
                {/* <span style={{ minWidth: "150px" }}>
                  <Button positive type="submit" value="Submit Form">
                    Add
                  </Button>
                </span>
                <span>
                  {" "}
                  <button
                    
                    style={{ minWidth: "120px" }}
                    onClick={this.close}
                  >
                    Cancel
                  </button>
                </span> */}
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
          </div>
        </Modal>
        {this.state.showAlert && (
          <Alert
            handleAlertClose={this.handleAlertClose}
            message={
              "sorry!! you have reached your max wallet limit.to add a new wallet delete an existing one"
            }
            showAlert={this.state.showAlert}
          />
        )}
      </div>
    );
  }
}

export default AddCardModal;

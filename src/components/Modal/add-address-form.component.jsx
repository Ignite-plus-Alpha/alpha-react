import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import profileService from "../../services/profile-service";
import Switch from '@material-ui/core/Switch';
import   RadioButtonsGroup from "../../components/radio-button/radiobutton.component";

import Alert from "../alert/alert.component"

class AddAddressModal extends Component {

    constructor(props) {
        super(props);
       this.state = {
            open: false,        
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            country: "",
            zipcode:"",
            checkedB:"false",
            AddressId:"",
            addressType:"home",
            ShowAlert:false
           
          };        
    }

  

     handleAlertClose = () => {
      this.setState({showAlert:false});
    };
     handleToggleChange = (event) => {
      this.setState({ [event.target.name]: event.target.checked });
      console.log( event.target.checked)

    
    };


  show = (dimmer) => () => {
    console.log(this.props.addressCounter,"^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
    if(this.props.addressCounter<5)
    this.setState({ dimmer, open: true });
    else this.setState({showAlert:true})
  }
  close = () => this.setState({ open: false,  
    addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  country: "",
  zipcode:"",
  checkedB:"false",
  AddressId:"",
  addressType:"" });

    //handle field change
   handleChange = event  => {
        const {value,name } = event.target;
        this.setState({[name]:value})
      };

          //handle field change
   handleTypeChange = (type) => {
    this.setState({addressType:type})
  };

      //handleFormSubmit
    handleSubmit= event => {
        event.preventDefault();
        const data={
          userid:this.props.userId,
          address_line1:this.state.addressLine1,
          address_line2:this.state.addressLine2,
          city:this.state.city,
          zipcode:this.state.zipcode,
          state:this.state.state,
          country:this.state.country,
          address_type:this.state.addressType  
        }
        if(this.state.checkedB===true)
        console.log("set as deafult",this.props.email)
        else console.log("no")
        // profileService.setDefaultAddressByEmailId()
        console.log(this.state)

        profileService.createAddress(data)
        .then(response=>this.setState({ AddressId: response.data.address_id }))
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
        .catch(e=>console.log(e))

        this.setState({ addressLine1:'',addressLine2:'',city:'',state:'',country:'',zipcode:'',open:false})    

    }

  render() {
    const { open, dimmer,addressLine1,addressLine2,city,state,country,zipcode } = this.state;

    return (
      <div>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button
          onClick={this.show("blurring")}
          class="ui teal button"
          style={{ position: "right", minWidth: "230px" }}
        >
          <i  className="fa fa-home fa-lg"></i>&nbsp;&nbsp;&nbsp;
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
                    value={city}
                    required
                    >
                </input>
              </div>
              <div class="field">
                <label>State</label>
                <input
                type="text"
                    name="state"
                    placeholder="State"
                    onChange={this.handleChange}
                    value={state}
                    required
                    >
                </input>
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
                    required
                    >
                </input>
              </div>
              <div class=" six wide field">
                <label>zipcode</label>
                <input
                  type="text"
                  name="zipcode"
                  placeholder="zip code"
                  onChange={this.handleChange}
                  value={zipcode}
                  required
                />
              </div>
            </div>
            <RadioButtonsGroup handleTypeChange={this.handleTypeChange}/>
            <div>Make default addresss</div>
            <Switch
        checked={state.checkedB}
        onChange={this.handleToggleChange}
        color="primary"
        name="checkedB"
        inputProps={{ 'aria-label': 'primary checkbox' }}
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
              <span style={{ minWidth: "150px" }}>
                <Button positive type='submit' value='Submit Form'>
                  <i class="add  icon"></i>
                  Add
                </Button>
              </span>
              <span>
                {" "}
                <button
                  class="ui google plus button"
                  style={{ minWidth: "120px" }}
                  onClick={this.close}
                >
                  <i class="delete  icon"></i>
                  Cancel
                </button>
                
              </span>
            </div>
          </form>
        </Modal>
        {this.state.showAlert && (
          <Alert
            handleAlertClose={this.handleAlertClose}
            message={"you have reached your max address storage limit to add a new address delete an existing one"}
            showAlert={this.state.showAlert}
          />
        )}
      </div>
    );
  }
}

export default AddAddressModal;

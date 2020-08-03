import React, { Component } from "react";
import { Button, Modal } from "semantic-ui-react";
import profileService from "../../services/profile-service";
import Switch from '@material-ui/core/Switch';


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
            checkedB:"false"
          };        
    }
     handleToggleChange = (event) => {
      this.setState({ [event.target.name]: event.target.checked });
      console.log( event.target.checked)

    
    };


  show = (dimmer) => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

    //handle field change
   handleChange = event  => {
        const {value,name } = event.target;
        this.setState({[name]:value})
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
          country:this.state.country  
        }
        if(this.state.checkedB===true)
        console.log("set as deafult",this.props.email)
        else console.log("no")
        // profileService.setDefaultAddressByEmailId()

        profileService.createAddress(data)
        .then(response=>console.log(response))
        .then(this.props.loadAddresses)
        .catch(e=>console.log(e))

        this.setState({ addressLine1:'',addressLine2:'',city:'',state:'',country:'',zipcode:'',open:false})    

    }

  render() {
    const { open, dimmer,addressLine1,addressLine2,city,state,country,zipcode } = this.state;

    return (
      <div>
        <button
          onClick={this.show("blurring")}
          class="ui teal button"
          style={{ position: "right", minWidth: "250px" }}
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
      </div>
    );
  }
}

export default AddAddressModal;

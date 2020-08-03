import React, { Component } from 'react'
import {  Modal } from "semantic-ui-react";
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import profileService from "../../services/profile-service";


class UpdateAddressForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      open: false,
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      zipcode:"",
   
      }
  }

show = (dimmer) => () => this.setState({ dimmer, open: true })
close = () => this.setState({ open: false })

    //handle field change
    handleChange = event  => {
      const {value,name } = event.target;
      this.setState({[name]:value})
    };

    //handleFormSubmit
  handleSubmit= event => {
   
      event.preventDefault();
      const data={
       
        address_line1:this.state.addressLine1,
        address_line2:this.state.addressLine2,
        city:this.state.city,
        zipcode:this.state.zipcode,
        state:this.state.state,
        country:this.state.country            
      }   
  
      console.log(this.props.userId,"******",this.props.addressId,"************",data )
      profileService.updateAddress(this.props.userId,this.props.addressId,data)
      .then(response=>console.log(response.data))
      .then(this.props.loadAddresses)
      .catch(e=>console.log(e))
      this.setState({ open:false})    
   

  }


render() {
    const { open, dimmer,addressLine1,addressLine2,city,state,country,zipcode } = this.state;

  return (
    <div>
      <Button variant="outlined" sie="small" color="primary"
      startIcon={<EditIcon />} onClick={this.show('default')} >
        edit
      </Button>


      <Modal dimmer={dimmer} open={open} onClose={this.close} style={{padding:"2%", width:"25%"}}>      
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
              }}
            >
              <span style={{ minWidth: "200" }}>
                <Button variant="contained" color="primary" type='submit' value='Submit Form' >
                  Update
                </Button>
              </span>
              <span>
                <Button variant="contained" color="secondary" onClick={this.close}>
                  Cancel
                </Button>
              </span>
            </div>
          </form>      </Modal>
    </div>
  )
}
}

export default UpdateAddressForm

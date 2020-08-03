import React, { Component } from 'react'
import {  Modal } from "semantic-ui-react";
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';

import profileService from "../../services/profile-service";


class UpdateProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      open: false,
      firstName:this.props.firstName,
      lastName:'',
      mobile:'',
    
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
        first_name:this.state.firstName,
        last_name:this.state.lastName,
        mobile:this.state.mobile,
        password:this.state.password,
            
      }   
  
      profileService.updateProfile(this.props.email,data)
      .then(response=>console.log(response.data))
      .then(this.props.loadData)
      .catch(e=>console.log(e))
      this.setState({ open:false})    

  }


render() {
  const { open, dimmer,firstName,lastName,mobile,password } = this.state;
  return (
    <div>
 

      <Button variant="outlined" sie="small" color="primary"
      startIcon={<EditIcon />} onClick={this.show('default')}  style={{margin:"10%" }}>
        edit
      </Button>


      <Modal dimmer={dimmer} open={open} onClose={this.close} style={{padding:"3%", width:"35%"}}>      
      <form class="ui form" onSubmit={this.handleSubmit}>
            <h4>Edit Personal details</h4>
            <div class="two fields">
            <div class="field">
              <label>First Name</label>
              <div class="fields">
                <div class="sixteen wide field">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={this.handleChange}
                    value={firstName}
                    required
                  />
                </div>
              </div>
            </div>
            <div class="field">
              <label>Last Name</label>
              <div class="fields">
                <div class="sixteen wide field">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={this.handleChange}
                    value={lastName}
                    required
                  />
                </div>
              </div>
            </div>
            </div>
            <div class="field">
              <label> Mobile Number</label>
              <div class="fields">
                <div class="sixteen wide field">
                  <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile Number"
                    onChange={this.handleChange}
                    value={mobile}
                    required
                  />
                </div>
              </div>
            </div>
         
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
                <Button variant="contained" color="primary" type='submit' value='Submit Form' >
                  Update
                </Button>
              </span>
              <span>
                {" "}
                {/* <Button negative onClick={this.close}>                  
                  Cancel
                </Button> */}
                <Button variant="contained" color="secondary" onClick={this.close}>
                  Cancel
                </Button>
              </span>
            </div>
          </form>
      </Modal>
    </div>
  )
}
}

export default UpdateProfileForm

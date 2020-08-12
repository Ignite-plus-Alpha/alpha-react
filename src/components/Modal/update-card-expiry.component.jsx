import React, { Component } from 'react'
import {  Modal } from "semantic-ui-react";
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';

import Switch from '@material-ui/core/Switch';
import profileService from "../../services/profile-service";


class UpdateCardExpiry extends Component {
  constructor(props) {
    super(props);
    this.state={
      open: false,
      expirydate:this.props.expiryDate,
      checkedA: false,
      
   
      }
  }

show = (dimmer) => () => this.setState({ dimmer, open: true })
close = () => this.setState({ open: false })

handleToggleChange = (event) => {
  this.setState({ [event.target.name]: event.target.checked });
  console.log( event.target.checked)

};

    //handle field change
    handleChange = event  => {
      const {value,name } = event.target;
      this.setState({[name]:value})
    };

    //handleFormSubmit
  handleSubmit= event => {
   
      event.preventDefault();
      const data={
        expiry_date:this.state.expirydate,            
      }   
  
      console.log(this.props.userId,"******",this.props.addressId,"************",data )
      profileService.updateWalletExpiry(this.props.userId,this.props.walletId,data)
      .then(response=>console.log(response.data))
      .then(() => {
        console.log(this.props.email, this.state.walletId);
        if (this.state.checkedA === true) {
          profileService
            .setDefaultWalletByEmailId(this.props.email, this.props.walletId)
            .then((response) => console.log(response,"^^^^^^^^^^^"))
             .then(this.props.loadProfileData)
            .catch((e) => console.log(e));
        }
      })
      .then(this.props.loadWallets)
      .catch(e=>console.log(e))
      this.setState({ open:false})    
   

  }


render() {
  const { checkedA,open, dimmer,expirydate } = this.state;
  return (
    <div>
      <Button variant="outlined" sie="small" color="primary"
      startIcon={<EditIcon />} onClick={this.show('default')} >
        edit
      </Button>


      <Modal dimmer={dimmer} open={open} onClose={this.close} style={{padding:"2%", width:"25%"}}>      
      <form class="ui form" onSubmit={this.handleSubmit}>
            <h4>Edit Personal details</h4>
            <br/>        
            <div class="field">
                <label>expiry date</label>
                <input
                type="month"
                    name="expirydate"
                    placeholder="Expiry Date"
                    onChange={this.handleChange}
                    value={expirydate}
                    required
                    >
                </input>
              </div>
              <label>set card as default</label> 
              <div className="set-default">
              <Switch
            checked={checkedA}
            onChange={this.handleToggleChange}
            color="primary"
            name="checkedA"
            inputProps={{ 'aria-label': 'primary checkbox' }}
        /> </div>

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
          </form>
      </Modal>
    </div>
  )
}
}

export default UpdateCardExpiry

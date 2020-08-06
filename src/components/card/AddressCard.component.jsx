import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from '@material-ui/core/Chip';
import ProfileService from '../../services/profile-service'
import UpdateAddressForm from '../Modal/update-address-form.component';


const useStyles = makeStyles({
  root: {
    minWidth: 10,
    margin:5
  },
  pos: {
    marginBottom: 2,
  },
});

export function AddressCard({ loadAddresses,emailId,userId,addressId,firstName,lastName,mobile,addressLine1,addressLine2,city,state,country,zipcode,defaultAddress}){
  const classes = useStyles();

const handleDelete=(userId,addressId)=>{
 

  const st="."
  if(addressId===defaultAddress)
  ProfileService.setDefaultAddressByEmailId(emailId,st)
  .then(response=>console.log(response))
  .catch(e=>console.log(e))

  ProfileService.
  deleteAddressByUserIdAddressId(userId,addressId)
  .then(response=>console.log(response))
  .then(loadAddresses)
  .catch(e=>{
    console.log(e)
  })
}







  return (
      <div>
        { console.log("edited for" ,userId,"*****",addressId,"*******",defaultAddress,"*****",emailId)}
    
    <Card className={classes.root}>            
      <CardContent>
      <Typography variant="h5"  style={{marginBottom:"2%"}}>
     {defaultAddress===addressId?  <Chip  size="small" label="Default"  float="right" />:null} Address Details     
        </Typography>
       <Divider style={{marginBottom:"1%"}}/>         
      <Typography className={classes.pos} color="bold">
       {firstName}&nbsp;{lastName} 
       </Typography>
       <Typography className={classes.pos} color="bold">
       {addressLine1}&nbsp;{addressLine2}<br/>{city},&nbsp;{state},&nbsp;{country}<br/>zipcode : {zipcode}
       </Typography>
       <Typography className={classes.pos} color="bold">
       mobile : {mobile}
       </Typography>
        </CardContent>
      <CardActions>
      <div className= "optionButtons" style={{display:"flex",flexDirection:"row",justifyContent:"space-between"  ,minWidth:"100%",padding:"1%" }}>
        <Button variant="outlined" color="secondary"
       startIcon={<DeleteIcon />}  onClick={()=>handleDelete(userId,addressId)}>        
        Delete
      </Button>
    
      <UpdateAddressForm loadAddresses={loadAddresses} userId={userId} addressId={addressId} emailId={emailId} addressLine1={addressLine1} addressLine2={addressLine2} city={city} state={state} country={country} zipcode={zipcode}  />
       
  
      </div>
    
      </CardActions>
    </Card>
    </div>
  );
}

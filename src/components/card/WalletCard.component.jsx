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
import {ActionConformationModal} from '../../components/Modal/action-conformation-modal.component'
import UpdateCardExpiry from '../../components/Modal/update-card-expiry.component'

const useStyles = makeStyles({
  root: {
    minWidth: 10,
    margin:5
  },
  pos: {
    marginBottom: 2,
  },
});

export function WalletCard({loadWallets,emailId,currentUserUserId,walletId,cardHolderName,cardNumber,expiryDate,defaultCard}) {
  const classes = useStyles();


const handleDelete=(currentUserUserId,walletId)=>{
  console.log("deleted for" ,currentUserUserId,"*****",walletId)

  const st=".";
  if(walletId===defaultCard)
  ProfileService.setDefaultWalletByEmailId(emailId,st)
  .then(response=>console.log(response))
  .catch(e=>console.log(e))
  
  ProfileService.
  deleteCardByUserIdWalletId(currentUserUserId,walletId)
  .then(response=>console.log(response))
  .then(loadWallets)
  .catch(e=>{
    console.log(e)
  })
}

  return (
    <div>    
    <Card className={classes.root}>              
       
      <CardContent>         
      <Typography variant="h5"  style={{marginBottom:"2%"}}>
      {defaultCard===walletId?  <Chip  size="small" label="Default"  float="right" />:null} Card Details     
             </Typography>
        <Divider style={{marginBottom:"1%"}}/>
        <Typography className={classes.pos} color="textSecondary">
        Card Holder Name&nbsp;:&nbsp;{cardHolderName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        Card Number &nbsp;:&nbsp;{cardNumber=cardNumber.toString().replace(/\d(?=\d{4})/g, "*")}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        Expiry&nbsp;Date&nbsp;:&nbsp;{expiryDate}
        </Typography>
 
      </CardContent>
      <CardActions>
      <div className= "optionButtons" style={{display:"flex",flexDirection:"row",justifyContent:"space-between" ,position:"center" ,minWidth:"100%",padding:"2%" }}>
        <span>
        <Button variant="outlined" color="secondary"
       startIcon={<DeleteIcon />}  onClick={()=>   handleDelete(currentUserUserId,walletId)}>        
        Delete
      </Button>
      </span>
      <span>  
        <UpdateCardExpiry loadWallets={loadWallets} userId={currentUserUserId} walletId={walletId} loadData={loadWallets} firstName={cardHolderName}/>
        </span>
      </div>    
      </CardActions>
    </Card>
    </div>
  );
}

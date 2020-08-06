import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';

const CustomAlert = (props) =>{
    const DialogContent = withStyles(theme => ({
        root: {
          width:300
        },
      }))(MuiDialogContent);
return (
  <div >
      <Dialog 
          open={props.showAlert}
        >
          <DialogContent>
            <DialogContentText>  
             Select a size
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleAlertClose}>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
    
  </div>
);
}
export default CustomAlert;
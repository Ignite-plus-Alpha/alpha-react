import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';

const Alert = (props) =>{
    const DialogContent = withStyles(theme => ({
        root: {
          width:350
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
          
          {props.sizes.map((s) => {
                    if (s !== props.chosenSize) {
                      return (
                        <a
                          class="ui teal circular label"
                          style={{ margin: "10px" }}
                          onClick={() => props.handleSelectedSize(s)}
                        >
                          {s.toUpperCase()}
                        </a>
                      );
                    } else {
                      return (
                        <a
                          class="ui black circular label"
                          style={{ margin: "10px" }}
                        >
                          {s.toUpperCase()}
                        </a>
                      );
                    }
                  })}
                  </DialogContent>
          <DialogActions>
            <Button onClick={props.handleAlertClose}>
              Cancel
            </Button>
            <Button onClick={props.handleAlertOk}>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
    
  </div>
);
}
export default Alert;
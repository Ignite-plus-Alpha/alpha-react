import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import './icon-label-button.styles.css'



const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function IconLabelButtons(props) {
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="contained"
        className={classes.button}
        startIcon={props.icon}
        onClick={props.show}
      >
        {props.label}
      </Button>
      {/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
      
    </div>
  );
}

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";

const styles = (theme) => ({
  root: {
    flexWrap: "wrap",
  },
});

function OutlinedChips(props) {
  function handleClick() {
    props.makeDefault(); // eslint-disable-line no-alert
  }
  const { classes } = props;
  return (
    <span className={classes.root}>
      <Chip
        avatar={<Avatar>P</Avatar>}
        label="Make Preferred"
        onClick={handleClick}
        className={classes.chip}
        variant="outlined"
      />
    </span>
  );
}

OutlinedChips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedChips);

import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const styles = (theme) => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

class RadioButtonsGroup extends React.Component {
  state = {
    value: this.props.addressType
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
    this.props.handleTypeChange(event.target.value)
   
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
      
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Address Type</FormLabel>
            <RadioGroup
              aria-label="addressType"
              name="location type"
              className={classes.group}
              value={this.state.value}
              onChange={this.handleChange}
              row
            >
              <FormControlLabel
                value="home"
                control={<Radio color="primary" />}
                label="home"
                labelPlacement="end"
              />
              <FormControlLabel
                value="office"
                control={<Radio color="primary" />}
                label="office"
                labelPlacement="end"
              />
            </RadioGroup>
          </FormControl>
       
      </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RadioButtonsGroup);

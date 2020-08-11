import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import CardActions from "@material-ui/core/CardActions";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "1%",
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: `${theme.spacing(1)}px auto`,
    minWidth: 300,
    alignText: "center",
    alignItems: "center",
  },
});

class DeliveryAddressCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, address, handleChangeAddress } = this.props;
    return (
      <div>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container wrap="nowrap">
              <Grid item>
                <CardActions>
                  <Radio
                    checked={
                      this.props.selectedAddressId === address.address_id
                    }
                    onChange={handleChangeAddress}
                    value={address.address_id}
                    color="default"
                    name="radio-button-demo"
                  />
                </CardActions>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography className={classes.pos} color="bold" noWrap>
                  {address.address_line1}
                  <br />
                  {address.address_line2}
                  <br />
                  {address.city}
                  <br />
                  {address.state}
                  <br />
                  {address.country}
                  <br />
                  zipcode : {address.zipcode}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DeliveryAddressCard);

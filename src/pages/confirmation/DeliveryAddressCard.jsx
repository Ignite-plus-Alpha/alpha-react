import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import CardActions from "@material-ui/core/CardActions";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import LocationOn from "@material-ui/icons/LocationOn";
import Card from "@material-ui/core/Card";
import { Divider } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";

const styles = (theme) => ({
  root: {
    width: "300px",
    margin: 5,
  },
  pos: {
    marginBottom: 2,
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
        <b>
          <h5>
            <Card className={classes.root}>
              <CardContent>
                <div className="card header">
                  <Typography variant="h6" style={{ marginBottom: "2%" }}>
                    Address Details
                    <Chip
                      icon={<LocationOn />}
                      label={address.address_type}
                      className={classes.chip}
                      color="primary"
                      position="relative"
                      left="20px"
                      size="small"
                    />
                  </Typography>
                </div>

                <Divider style={{ marginBottom: "1%" }} />
                {/* <Typography className={classes.pos} color="bold">
                  {address.first_Name}&nbsp;{address.last_name}
                </Typography> */}
                <Typography className={classes.pos} color="bold" variant="h7">
                  {address.address_line1}&nbsp;{address.address_line2}
                  <br />
                  {address.city},&nbsp;
                  <br />
                  {address.state},&nbsp;{address.country}
                  <br />
                  zipcode : {address.zipcode}
                </Typography>
                {/* <Typography className={classes.pos} color="bold">
              mobile : {mobile}
            </Typography> */}
              </CardContent>
            </Card>
          </h5>
        </b>
      </div>
    );
  }
}

export default withStyles(styles)(DeliveryAddressCard);

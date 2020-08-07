import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import "./confirmation.styles.scss";
import PayPalBtn from "./PayWithPayPal";

const styles = {
  card: {
    maxWidth: 500,
    alignItems:"center"
  },
  title: {
    fontSize: 16,
  },
  pos: {
    marginBottom: 12,
  },
};

class Confirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total_price: 0,
      total_quantity: 0,
    };
  }

  paymentHandler = (details, data) => {
    /** Here you can call your backend API
      endpoint and update the database */
    console.log(details, data);
  }

  componentDidMount = () => {
    this.setState({
      total_price: this.props.location.state.total_price,
      total_quantity: this.props.location.state.total_quantity,
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className="confirmation" style={{alignItems:"center"}}>
        <div >
          <center>
        CONFIRMATION
        <br />
        <br />
          <Card className={classes.card}  >
            <CardContent>
              <Typography
                className={classes.title}
                variant="h5"
                component="h2"
                width="auto"
                gutterBottom
              >
                <LocationOnIcon fontSize="inherit" />
                &nbsp; Delivery Address
              </Typography>
              <Typography>Sirmvit Hostel</Typography>
              <Typography>Yelahanka,Bengaluru</Typography>
              <Typography variant="h10" component="h4">
                Pincode:560064
              </Typography>
            </CardContent>
          </Card>
          <br />
          {/* <Card className={classes.card}>
            <CardContent>
              <Typography
                className={classes.title}
                variant="h5"
                component="h2"
                gutterBottom
              >
                <PaymentIcon fontSize="inherit" />
                &nbsp; Payment Card
              </Typography>
              <Typography></Typography>
              <Typography>1111 2222 3333 4444</Typography>
              <Typography>CVV:*</Typography>
            </CardContent>
          </Card> */}
          <h3>
            Total Price:{this.state.total_price}
            <br />
            Total Items:{this.state.total_quantity}
          </h3>
          <PayPalBtn
                    amount = {this.state.total_price}
                    currency = {'INR'}
                    onSuccess={this.paymentHandler}/>
        </center>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Confirmation);
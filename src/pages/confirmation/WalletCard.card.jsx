import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import CardActions from "@material-ui/core/CardActions";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { width, height } from "@material-ui/system";
import { Divider } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";

const styles = (theme) => ({
  root: {
    width: "300px",
    margin: 5,
  },
  pos: {
    marginBottom: 2,
  },
});

class WalletCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, wallet, handleChangeCard } = this.props;
    return (
      <div>
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" style={{ marginBottom: "2%" }}>
              {/* <CardActions> */}
              <Radio
                checked={this.props.selectedCardId === wallet.wallet_id}
                onChange={handleChangeCard}
                value={wallet.wallet_id}
                color="default"
                name="radio-button-demo"
              />
              {/* </CardActions> */}
              Card Details
            </Typography>
            <Divider style={{ marginBottom: "1%" }} />
            <Typography className={classes.pos} color="bold">
              Name&nbsp;:&nbsp;{wallet.cardholder_name}
            </Typography>
            <Typography className={classes.pos} color="bold">
              Card Number &nbsp;:&nbsp;
              {
                (wallet.card_number = wallet.card_number
                  .toString()
                  .replace(/\d(?=\d{4})/g, "*"))
              }
            </Typography>
            <Typography className={classes.pos} color="bold">
              Expiry&nbsp;Date&nbsp;:&nbsp;{wallet.expiry_date}
            </Typography>
            <Typography className={classes.pos} color="bold">
              UPI&nbsp;Id&nbsp;:&nbsp;{wallet.upi_id}
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(WalletCard);

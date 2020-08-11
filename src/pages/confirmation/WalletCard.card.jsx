import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import CardActions from "@material-ui/core/CardActions";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { width, height } from "@material-ui/system";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "1%",
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: `${theme.spacing(1)}px auto`,
    width: "300px",
    height: "25%",
    alignText: "center",
    alignItems: "center",
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
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container wrap="nowrap">
              <Grid item>
                <CardActions>
                  <Radio
                    checked={this.props.selectedCardId === wallet.wallet_id}
                    onChange={handleChangeCard}
                    value={wallet.wallet_id}
                    color="default"
                    name="radio-button-demo"
                  />
                </CardActions>
              </Grid>
              <Grid item xs zeroMinWidth>
                <Typography className={classes.pos} color="bold" noWrap>
                  {wallet.cardholder_name}
                  <br />
                  {wallet.card_number}
                  <br />
                  {wallet.expiry_date}
                  <br />
                  {wallet.upi_id}
                  <br />
                  <br />
                  <br />
                  <br />
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(WalletCard);

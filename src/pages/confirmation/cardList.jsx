import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Radio from "@material-ui/core/Radio";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    // display: "flex",
  },
}));

export default function FolderList(props) {
  const classes = useStyles();
  const { wallet, handleChangeCard } = props;
  return (
    <List className={classes.root}>
      <b>
        <h5>
          <ListItem>
            <ListItemAvatar>
              <Radio
                checked={props.selectedCardId === wallet.wallet_id}
                onChange={handleChangeCard}
                value={wallet.wallet_id}
                color="default"
                name="radio-button-demo"
              />
            </ListItemAvatar>
            Name&nbsp;:&nbsp;{wallet.cardholder_name}
            <br />
            Card Number &nbsp;:&nbsp;
            {
              (wallet.card_number = wallet.card_number
                .toString()
                .replace(/\d(?=\d{4})/g, "*"))
            }
            <br />
            Expiry&nbsp;Date&nbsp;:&nbsp;{wallet.expiry_date}
            <br />
            UPI&nbsp;Id&nbsp;:&nbsp;{wallet.upi_id}
          </ListItem>
        </h5>
      </b>
    </List>
  );
}

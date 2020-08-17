import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Radio from "@material-ui/core/Radio";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    textTransform: "capitalize",
    //display: "flex",
  },
}));

export default function FolderList(props) {
  const classes = useStyles();
  const { address, handleChangeAddress } = props;
  return (
    <List className={classes.root}>
      <b>
        <h5>
          <ListItem>
            <ListItemAvatar>
              <Radio
                checked={props.selectedAddressId === address.address_id}
                onChange={handleChangeAddress}
                value={address.address_id}
                color="default"
                name="radio-button-demo"
              />
            </ListItemAvatar>
            {/* {address.first_Name}&nbsp;{address.last_name} */}
            <br />
            {address.address_line1}&nbsp;{address.address_line2}
            <br />
            {address.city},&nbsp;{address.state},&nbsp;{address.country}
            <br />
            Zipcode : {address.zipcode}
          </ListItem>
        </h5>
      </b>
    </List>
  );
}

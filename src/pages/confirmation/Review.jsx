import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import ProfileDataService from "../../services/profile-service";

const useStyles = makeStyles((theme) => ({
  root: {
    textTransform: "capitalize",
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props) {
  const classes = useStyles();

  const [address, setAddress] = React.useState([]);
  const [wallet, setWallet] = React.useState([]);
  const [isAddressLoaded, setIsAddressLoaded] = React.useState(false);
  const [isCardLoaded, setIsCardLoaded] = React.useState(false);

  React.useEffect(() => {
    loadAddress();
    loadWallet();
  });

  const loadAddress = () => {
    ProfileDataService.getAddressByUserIdAddressId(
      localStorage.getItem("userId"),
      props.selectedAddressId
    )
      .then((response) => {
        console.log(response);
        setAddress(response.data);
        setIsAddressLoaded(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const loadWallet = () => {
    ProfileDataService.getWalletByUserIdWalletId(
      localStorage.getItem("userId"),
      props.selectedCardId
    )
      .then((response) => {
        console.log(response);
        setWallet(response.data);
        setIsCardLoaded(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (isAddressLoaded && isCardLoaded) {
    return (
      <div className={classes.root}>
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Order summary
          </Typography>
          <List disablePadding>
            {props.products.map((product) => (
              <ListItem className={classes.listItem} key={product.name}>
                <ListItemText
                  primary={product.itemTitle}
                  secondary={product.itemGroup + " " + product.itemCategory}
                />
                <Typography variant="body2">
                  Qty:{product.itemQuantity}
                </Typography>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Typography variant="body2">₹{product.itemPrice}</Typography>
              </ListItem>
            ))}

            <ListItem className={classes.listItem}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" className={classes.total}>
                ₹{props.totalPrice}
              </Typography>
            </ListItem>
          </List>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom className={classes.title}>
                Delivery Address
              </Typography>
              <Typography gutterBottom> {address.address_line1}</Typography>
              <Typography gutterBottom> {address.address_line2}</Typography>
              <Typography gutterBottom> {address.city}</Typography>
              <Typography gutterBottom> {address.state}</Typography>
              <Typography gutterBottom> {address.country}</Typography>
              <Typography gutterBottom> {address.zipcode}</Typography>
            </Grid>
            <Grid item container direction="column" xs={12} sm={6}>
              <Typography variant="h6" gutterBottom className={classes.title}>
                Payment details
              </Typography>
              <Grid container>
                <Typography gutterBottom>
                  CARD HOLDER NAME: {wallet.cardholder_name}
                </Typography>
                <br />
                <Typography gutterBottom>
                  CARD NUMBER:
                  {
                    (wallet.card_number = wallet.card_number
                      .toString()
                      .replace(/\d(?=\d{4})/g, "*"))
                  }
                </Typography>
                <br />
                <Typography gutterBottom>
                  EXPIRY DATE: {wallet.expiry_date}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </React.Fragment>
      </div>
    );
  } else {
    return <div></div>;
  }
}

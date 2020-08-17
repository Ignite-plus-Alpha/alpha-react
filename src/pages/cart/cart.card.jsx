import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import RemoveIcon from "@material-ui/icons/Remove";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import "./cart.styles.scss";
import { withRouter } from "react-router-dom";
import Axios from "axios";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: "auto",
    maxWidth: 700,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartId: props.cartId,
    };
    this.deleteItem = this.deleteItem.bind(this);
  }

  updateQuantity(itemId, itemSize, itemQuantity, operation) {
    if (operation === 1) itemQuantity = itemQuantity + 1;
    else itemQuantity = itemQuantity - 1;
    console.log(localStorage.getItem("cartId"), itemId, itemSize, itemQuantity);
    Axios.put(
      `http://localhost:8081/cartItem/${this.state.cartId}/${itemId}/${itemSize}/${itemQuantity}`
    )
      .then((response) => {
        console.log(response.data);

        this.props.getCartItems();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteItem(itemId, itemSize) {
    Axios.delete(
      `http://localhost:8081/cartItem/${this.state.cartId}/${itemId}/${itemSize}`
    )
      .then((response) => {
        console.log(response.data);
        // this.props.delete(response.data.itemId, response.data.itemSize);
        this.props.getCartItems();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { classes, item } = this.props;
    return (
      <div>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container spacing={16}>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img
                    className={classes.img}
                    alt="complex"
                    src={item.itemImageURL}
                    onClick={() => {
                      this.props.history.push(
                        `/${item.itemGroup}/${item.itemCategory}/${item.itemId}`
                      );
                    }}
                  />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={16}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      {item.itemTitle}
                    </Typography>
                    <Typography gutterBottom>
                      {item.itemGroup} {item.itemCategory}
                    </Typography>
                    <Typography>Size:{item.itemSize.toUpperCase()}</Typography>
                    <Typography>
                      <IconButton
                        aria-label="increase quantity"
                        onClick={() => {
                          if (item.itemQuantity < 10)
                            this.updateQuantity(
                              item.itemId,
                              item.itemSize,
                              item.itemQuantity,
                              1
                            );
                          else
                            alert("Item Quantity has already reached maximum");
                        }}
                      >
                        <AddIcon />
                      </IconButton>

                      {item.itemQuantity}
                      <IconButton
                        aria-label="decrease quantity"
                        onClick={() => {
                          if (item.itemQuantity === 1)
                            this.deleteItem(item.itemId, item.itemSize);
                          else
                            this.updateQuantity(
                              item.itemId,
                              item.itemSize,
                              item.itemQuantity,
                              0
                            );
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Typography
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        this.deleteItem(item.itemId, item.itemSize);
                      }}
                    >
                      Remove
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    ₹{item.itemPrice * item.itemQuantity}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <br />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(Card));

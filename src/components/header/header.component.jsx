import { Link } from "react-router-dom";
import image from "../../assets/alpha.png";
import Search from "../search/search.component";
import React from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Axios from "axios";
import { GoogleLogout } from "react-google-login";
import "./logout-button.styles.css";

const styles = (theme) => ({
  root: {
    width: "100%",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    border: "black",
    backgroundColor: (theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 100,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 5,
      width: 400,
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
});
const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

class Header extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    cartId: "",
    total_quantity: 0,
    isLoaded: false,
    isCartIdLoaded: false,
  };

  getCartItems = () => {
    if (this.state.isCartIdLoaded) {
      Axios.get(`http://localhost:8081/cartItem/${this.state.cartId}`)
        .then((response) => {
          console.log(response.data);
          this.setState({
            total_quantity: response.data.total_quantity,
            isLoaded: true,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  getUserCartId = () => {
    Axios.get(`http://localhost:8081/cart/${localStorage.getItem("userId")}`)
      .then((response) => {
        // localStorage.setItem("cartId", response.data.cartId);
        console.log(response.data);
        this.setState({ cartId: response.data, isCartIdLoaded: true });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  handleProfileMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = (event) => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      />
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem>
          <IconButton aria-label="cart">
            <Link to="/cart" className="option">
              {/* <StyledBadge
                // badgeContent={this.state.total_quantity}
                badgeContent={4}
                color="secondary"
              > */}
              <Badge
                badgeContent={localStorage.getItem("total_quantity")}
                color="primary"
              >
                <ShoppingCartIcon />
              </Badge>
            </Link>
          </IconButton>
          <IconButton color="inherit">
            <Link to="/wishlist" className="option">
              <FavoriteIcon />
            </Link>
          </IconButton>
          <IconButton color="inherit">
            <Link to="/profile" className="option">
              <AccountCircle />
            </Link>
          </IconButton>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Link to="/" className="logo-conainer">
              <img
                src={image}
                alt="logo"
                style={{ height: "70px", marginLeft: "70px" }}
              />
            </Link>
            <Search />
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-owns={isMenuOpen ? "material-appbar" : undefined}
                aria-haspopup="true"
                // onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <Link to="/wishlist" className="option">
                  <FavoriteIcon />
                </Link>
              </IconButton>
              <IconButton
                aria-owns={isMenuOpen ? "material-appbar" : undefined}
                aria-haspopup="true"
                //onClick={this.handleProfileMenuOpen}
                color="inherit"
                aria-label="cart"
              >
                <Link to="/cart" className="option">
                  <Badge
                    badgeContent={localStorage.getItem("total_quantity")}
                    color="primary"
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </Link>
              </IconButton>
              <IconButton
                aria-owns={isMenuOpen ? "material-appbar" : undefined}
                aria-haspopup="true"
                //onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <Link to="/profile" className="option">
                  <AccountCircle />
                </Link>
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
            {this.props.email ? (
              <span>
                <GoogleLogout
                  className="Google-logout"
                  clientId="918811353367-moe53k16o58tmme27s8adujm3uqrdffc.apps.googleusercontent.com"
                  buttonText="Logout"
                  onLogoutSuccess={this.props.logout}
                ></GoogleLogout>
              </span>
            ) : null}
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);

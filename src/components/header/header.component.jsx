// import React from "react";
// import "./header.styles.scss";
 import { Link } from "react-router-dom";
 import image from "../../assets/alpha.png";
 import Search from "../search/search.component";

// export const Header = () => (
//   <div className="header">
//     <Link to="/" className="logo-conainer">
//       <img
//         src={image}
//         alt="logo"
//         style={{ height: "70px", marginLeft: "70px" }}
//       />
//     </Link>
//     <Search />
    // <div className="options">
    //   <Link to="/cart" className="option icon">
    //     <i className="fa fa-shopping-cart"></i>
    //   </Link>
//       <Link to="/profile" className="option">
//         <i className="fa fa-user"></i>
//       </Link>
//       <Link to="/wishlist" className="option">
//         <i className="fa fa-heart"></i>
//       </Link>
//     </div>
//   </div>
// );
import React from 'react';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    border:"black" ,
    backgroundColor: (theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 100,
    width:'100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 5,
      width: 400,
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class Header extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
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
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      />
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        
        <MenuItem >
        <IconButton color="inherit">
          <Link to="/cart" className="option">
            <ShoppingCartIcon />
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
            {/* <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            </Typography> */}
            {/* <div className={classes.search}>
              <div className={classes.searchIcon}>
              <Search/>
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }} */}
              {/* />
            </div> */}
            <Search/>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
            <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                // onClick={this.handleProfileMenuOpen}
                color="inherit"
              > 
              <Link to="/wishlist" className="option">
                <FavoriteIcon />
                </Link>
              </IconButton> 
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                //onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
              <Link to="/cart" className="option icon">
              <ShoppingCartIcon/>
              </Link>
              </IconButton>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
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
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
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

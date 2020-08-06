import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Addresses from "./addresses.component";
import ProfileDetailPage from "./profile-detail.component";
import Wallets from "./wallets.components";
import "./profile.styles.scss";
import Login from "../../components/login/login.component";
import {  Redirect } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 224,
  },
  tabs: {
    borderRight: `0px solid ${theme.palette.divider}`,
    width:200
  },
}));

export default function Profile(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if (props.email==null) return <Redirect to="/login"/>;
   return (
    
    <div className={classes.root}>
      {console.log(props)}
      <Tabs
        orientation="vertical"
        // variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Profile" {...a11yProps(0)} />
        <Tab label="Addresses" {...a11yProps(1)} />
        <Tab label="SaveCards" {...a11yProps(2)} />
      </Tabs>
      <div className="tabs" style={{ marginLeft: "10%", minWidth: "30%" ,fontStyle:"bold"}}>
        <TabPanel value={value} index={0}>
          <ProfileDetailPage userEmail={props.email} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Addresses userEmail={props.email} userId={props.userId}/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Wallets userEmail={props.email} userId={props.userId} />
        </TabPanel>
      </div>
    </div>
  );

}

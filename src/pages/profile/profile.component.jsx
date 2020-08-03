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
  },
}));

export default function Profile() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
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
      <div className="tabs" style={{ marginLeft: "5%", minWidth: "40%" }}>
        <TabPanel value={value} index={0}>
          <ProfileDetailPage />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Addresses />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Wallets />
        </TabPanel>
      </div>
    </div>
  );
}

/* eslint-disable react/prop-types, react/jsx-handler-names */
import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { capitalize } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    height: 250,
    marginTop: 25,
    marginLeft: 100,
    textTransform: "capitalize",
  },
  input: {
    display: "flex",
    padding: 0,
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
  },

  noOptionsMessage: {
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};

class Search extends React.Component {
  state = {
    suggestions: [],
  };

  componentDidMount = () => {
    if (!localStorage.getItem("categories")) {
      console.log("Making API call");
      this.apicall();
    } else {
      console.log("Using local Storage");
      localStorage.getItem("categories") &&
        this.setState({
          suggestions: JSON.parse(localStorage.getItem("categories")),
        });
    }
  };

  apicall = () => {
    axios
      .get("http://localhost:8082/categories")
      .then((response) => {
        this.setState({
          suggestions: response.data,
        });
        localStorage.setItem(
          "categories",
          JSON.stringify(this.state.suggestions)
        );
        localStorage.setItem("categoryDate", Date.now());
      })
      .catch((e) => {
        console.log(e);
      });
  };

  handleChange = () => (value) => {
    if (value) {
      const { history } = this.props;
      history.push(`/${value.value.groupId}/${value.value.categoryId}`);
    }
  };

  render() {
    const { classes, theme } = this.props;

    const selectStyles = {
      input: (base) => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": {
          font: "inherit",
        },
      }),
    };

    return (
      <div className={classes.root}>
        <Select
          classes={classes}
          styles={selectStyles}
          fullWidth
          options={this.state.suggestions.map((suggestion) => ({
            label: `${suggestion.categoryId} from ${suggestion.groupId}`,
            value: suggestion,
          }))}
          components={components}
          onChange={this.handleChange()}
          placeholder="Search category here..."
          isClearable
        />
      </div>
    );
  }
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(withRouter(Search));

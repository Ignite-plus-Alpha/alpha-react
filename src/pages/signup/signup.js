import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import "./signup.css";
import Button from "@material-ui/core/Button";
import Axios from "axios";
// import Login from "../login/login.component";
const styles = (theme) => ({
  button: {
    display: "flex",
    margin: theme.spacing.unit,
    justifyContent: "flex-end",
  },
  input: {
    display: "none",
    width: "400px",
  },
});

export default class SignUp extends Component {
  //   constructor(props) {
  //     super(props)

  //     this.state = {

  //       user: []

  //     }

  // }

  state = {
    users: "",
  };

  handleChange = (event) => {
    this.setState({ users: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const user = {
      users: this.state.users,
    };

    Axios.post(`http://localhost:8080/api/user`, { user }).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };

  signinGoogle = () => {
    Axios.get(`http://localhost:8080/user`).then((response) => {
      console.log(response.data);
      // this.setState({User: response.data});
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <form>
        <h3>Sign Up</h3>

        <div className="form-group">
          <TextField
            id="fName"
            label="First Name"
            style={{ margin: 8 }}
            placeholder="Enter first name"
            inputtype="password"
            helperText="Mandotary"
            // fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="lName"
            label="Lastname"
            style={{ margin: 8 }}
            placeholder="Enter your lastname"
            helperText="Mandotary"
            // fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br></br>
          <TextField
            id="email"
            label="Email"
            style={{ margin: 8 }}
            placeholder="Enter email address"
            helperText="Mandotary"
            // fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br></br>
          <TextField
            id="mobile"
            label="Phone number"
            style={{ margin: 8 }}
            placeholder="Enter phone number"
            helperText="Mandotary"
            // fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br></br>
          <TextField
            id="standard-password-input"
            label="Password"
            style={{ margin: 8 }}
            // fullWidth
            type="password"
            helperText="Mandatory"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
          />
          <br></br>
          <Button
            variant="contained"
            color="primary"
            onClick={
              (this.handleSubmit, (event) => (window.location = "./login"))
            }
          >
            Submit
          </Button>
          <div />
          <br></br>
          <Button
            variant="contained"
            color="primary"
            onClick={this.signinGoogle}
          >
            Sign in with Google
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <a href="/login">Already registered?</a>
        </div>
      </form>
    );
  }
}

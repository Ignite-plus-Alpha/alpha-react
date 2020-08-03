import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import HomePage from "../../pages/homepage/homepage.component";
import GoogleLogin from "react-google-login";
const styles = (theme) => ({
  button: {
    display: "flex",
    marginLeft: "auto",
  },
  input: {
    display: "none",
  },
});

export default class Login extends Component {
  responseGoogle = (response) => {
    console.log(response);
  };

  render() {
    return (
      <form align="center">
        <div style={{ fontSize: 28 }}>Sign In</div>
        <br />

        <TextField
          id="email"
          label="Email"
          style={{ margin: 8 }}
          placeholder="enter email address"
          helperText="Mandotary"
          //fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <TextField
          id="standard-password-input"
          label="Password"
          style={{ margin: 8 }}
          //fullWidth
          type="password"
          helperText="Mandotary"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
        />
        <br />
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => (window.location.href = "/")}
        >
          Submit
        </Button>
        <br />
        <div
          className="sign-in-options"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "3%",
          }}
        >
          <GoogleLogin
            clientId="918811353367-moe53k16o58tmme27s8adujm3uqrdffc.apps.googleusercontent.com"
            buttonText="Google Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>
      </form>
    );
  }
}

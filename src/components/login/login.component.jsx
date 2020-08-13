import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import HomePage from "../../pages/homepage/homepage.component";
import GoogleLogin from "react-google-login";
import profileService from "../../services/profile-service";
import Axios from "axios";
import { Divider } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { withRouter, useHistory } from "react-router-dom";
import "./login-form.styles.css";

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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  responseGoogle = (response) => {
    console.log(response);
    this.props.setEmail(response.profileObj.email);

    //localStorage.setItem("userId", response.profileObj);
    localStorage.setItem("imageUrl", response.profileObj.imageUrl);
    localStorage.setItem("firstName", response.Ot.sW);
    localStorage.setItem("lastName", response.Ot.sU);
    profileService
      .userRegistration(response.profileObj.email)
      .then(
        (response) => (
          console.log(response.data),
          this.props.setUserId(response.data),
          localStorage.setItem("userId", response.data),
          Axios.post(`http://localhost:8081/cart/${response.data}`),
          this.setState({ redirect: true })
        )
      );
  };

  // responseGoogle = (response) => {
  //   console.log(response);
  //   this.props.setEmail(response.profileObj.email)

  //   sessionStorage.setItem('userId',response.profileObj)
  //   localStorage.setItem('imageUrl',response.profileObj.imageUrl)
  //   localStorage.setItem('firstName',response.Ot.sW)
  //   localStorage.setItem('lastName',response.Ot.sU)
  //   profileService.userRegistration(response.profileObj.email)
  //   .then(response=>(
  //     this.props.setUserId(response.data),
  //     this.setState({redirect:true})
  //   ))

  // };

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/"} />;
    }

    console.log(this.props, "!!!");
    return (
      <div
        className="sign-in-form"
        style={{ maxWidth: "400px", float: "center" }}
      >
        <form>
          <div style={{ fontSize: 28, alignContent: "center" }}>Sign In</div>
          <br />

          <TextField
            id="email"
            label="Email"
            type="email"
            style={{ margin: 8 }}
            placeholder="Enter email address"
            helperText="Mandotary"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <br />
          <TextField
            id="standard-password-input"
            label="Password"
            style={{ margin: 8, minWidth: "400px" }}
            //fullWidth
            type="password"
            helperText="Mandotary"
            autoComplete="current-password"
            margin="normal"
            variant="outlined"
          />
          <br />
          <br />

          <br />
          <div
            className="sign-in-options"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              marginTop: "1%",
            }}
          >
            <span>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={(event) => (window.location.href = "/")}
              >
                Sign In
              </Button>
            </span>
            <br />
            <Divider />
            <div style={{ fontSize: 16 }}>
              <br />
              <GoogleLogin
                className="google-signin-button"
                clientId="918811353367-moe53k16o58tmme27s8adujm3uqrdffc.apps.googleusercontent.com"
                //isSignedIn={true}
                buttonText="SIGN IN"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={"single_host_origin"}
                style={({ marginLeft: 0 }, { padding: "50px" })}
              />
            </div>
            <br />
          </div>
          <a href="/signup">Don't have an account?</a>
        </form>
      </div>
    );
  }
}
export default withRouter(Login);

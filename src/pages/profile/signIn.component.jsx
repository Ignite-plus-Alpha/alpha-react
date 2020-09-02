import React from "react";
import Button from "@material-ui/core/Button";
import GoogleLogin from "react-google-login";

class SignInForm extends React.Component {
  responseGoogle = (response) => {
    console.log(response);
  };

  render() {
    return (
      <div className="sign-in-form">
        <form class="ui form">
          <div class="field">
            <label>Email</label>
            <input type="email" name="email" placeholder="email" />
          </div>
          <div class="field">
            <label>Password</label>
            <input type="password" name="password" placeholder="password" />
          </div>

          <div
            className="sign-in-options"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "3%",
            }}
          >
            <span>
              <Button variant="contained" color="primary">
                Sign In
              </Button>
            </span>
            <span>
              <GoogleLogin
                clientId="918811353367-moe53k16o58tmme27s8adujm3uqrdffc.apps.googleusercontent.com"
                buttonText="Google Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </span>
          </div>
        </form>
      </div>
    );
  }
}
export default SignInForm;

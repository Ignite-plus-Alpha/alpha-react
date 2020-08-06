import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import HomePage from "../../pages/homepage/homepage.component";
import GoogleLogin from "react-google-login";
import profileService from "../../services/profile-service";
import Axios from "axios";
import { Divider } from "@material-ui/core";
import { withRouter, useHistory } from "react-router-dom";


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
    this.state={
      isUserId:false
    }
 
  }
  

  responseGoogle = (response) => {
    console.log(response);
    this.props.setEmail(response.profileObj.email)
    profileService.userRegistration(response.profileObj.email)
    .then(response=>(
      this.props.setUserId(response.data) ,
      localStorage.setItem("userId",response.data),
      this.setState({isUserId:true})
    ))
    if(this.state.isUserId){
    const data={userId:localStorage.getItem("userId")}
    Axios.post(`http://localhost:8081/cart`,data).then(response=>{console.log(response.data)}).catch(e=>{console.log(e)});
    const { location,history } = this.props;
    const { state } = location;
    history.replace(state.from);
    }
  };

  render() {
    console.log(this.props,"!!!")
    return (
      <center>
      <div className="sign-in-form" style={{maxWidth:"400px",alignSelf:"center"}}>
      <form >
        <div style={{ fontSize: 28 }}>Sign In</div>
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
          style={{ margin: 8,minWidth:"400px" }}
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
        </span><br/>
        <Divider/>
        <div style={{fontSize:16}}>
        <br/>
        Sign in with Google
        <GoogleLogin
        className="google-signin-button"
            clientId="918811353367-moe53k16o58tmme27s8adujm3uqrdffc.apps.googleusercontent.com"
             //isSignedIn={true}
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={"single_host_origin"}   
            style={{marginLeft:0},{padding:"50px"}}       
          />       
        </div> 
        <br/>     
         </div>
        <a href="/signup">Don't have an account?</a>
      </form>
      </div>
      </center>
    );
  }
}
export default withRouter(Login);
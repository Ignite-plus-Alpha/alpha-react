import React from "react";
import "./profile.styles.scss";
import ProfileDataService from "../../services/profile-service";

import SignInForm from "./signIn.component";
import SignUp from "../../components/signUp/SignUp.component";
import ProfileDetailCard from "../../components/card/ProfileDetailCard.component";
import UpdateProfile from "../../components/Modal/update-profile-form.component";

class ProfileDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: "chinmay@gmail.com",
      // userEmail: null,
      user: null,
      firstName: "",
      lastName: "",
      mobile: "",
      showSignIn: true,
      showSignUp: false,
      show: false,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  hideComponent = () => {
    this.state.show
      ? this.setState({ show: false })
      : this.setState({ show: true });
  };

  loadData = () => {
    ProfileDataService.getProfileByEmailId(this.state.userEmail)
      .then((response) => {
        this.setState({
          user: response.data,
          firstName: response.data.first_name,
          lastName: response.data.last_name,
          mobile: response.data.mobile,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const {
      userEmail,
      firstName,
      lastName,
      mobile,
      showSignIn,
      showSignUp,
      show,
    } = this.state;
    // console.log(this.state.user)

    if (userEmail !== null) {
      return (
        <div className="profilePage">
          <ProfileDetailCard
            email={userEmail}
            firstName={firstName}
            lastName={lastName}
            mobile={mobile}
            loadData={this.loadData}
          />
        </div>
      );
    } else
      return (
        <div>
          {!show && (
            <div>
              <button
                style={{
                  border: "none",
                  backgroundColor: "inherit",
                  marginBottom: "10%",
                  minWidth: "340px",
                  fontSize: "25px",
                  cursor: "pointer",
                  display: "inline-block",
                }}
                onClick={this.hideComponent}
                class="default-button"
              >
                {" "}
                I do not have an account
              </button>
              <h3>Sign in with email and password</h3>
              {showSignIn && <SignInForm />}
            </div>
          )}
          {show && (
            <div style={{ padding: "2%", width: "50%" }}>
              <button
                style={{
                  border: "none",
                  backgroundColor: "inherit",
                  marginBottom: "10%",
                  minWidth: "400px",
                  fontSize: "25px",
                  cursor: "pointer",
                  display: "inline-block",
                }}
                onClick={this.hideComponent}
                class="default-button"
              >
                I already have an account
              </button>
              <h3>Sign Up with email and password</h3>
              <SignUp />
            </div>
          )}
        </div>
      );
  }
}
export default ProfileDetailPage;

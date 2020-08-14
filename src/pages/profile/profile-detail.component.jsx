import React from "react";
import "./profile.styles.scss";
import ProfileDataService from "../../services/profile-service";

import SignInForm from "./signIn.component";
import SignUp from "../../components/signUp/SignUp.component";
import ProfileDetailCard from "../../components/card/ProfileDetailCard.component";
import UpdateProfile from "../../components/Modal/update-profile-form.component";
import Login from "../../components/login/login.component";

class ProfileDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //userEmail: "chinmay@gmail.com",
      // userEmail: null,
      user: null,
      firstName: "",

      lastName: "",
      mobile: "",
      show: true,
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
    ProfileDataService.getProfileByEmailId(this.props.userEmail)
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
      firstName,
      lastName,
      mobile,
      showSignIn,
      showSignUp,
      show,
    } = this.state;
    const { userEmail } = this.props;

    return (
      <div className="profilePage">
        <h2 style={{ color: "teal" }}>PROFILE INFORMATION</h2>
        <br />
        <br />
        <ProfileDetailCard
          email={userEmail}
          firstName={firstName}
          lastName={lastName}
          mobile={mobile}
          loadData={this.loadData}
        />
      </div>
    );
  }
}
export default ProfileDetailPage;

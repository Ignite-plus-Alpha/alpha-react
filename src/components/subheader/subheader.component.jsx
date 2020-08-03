import React, { Component } from "react";
import axios from "axios";
import "./subheader.styles.scss";
import SubheaderList from "./grouplist";

export default class Subheader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groups: [],
    };
  }

  componentDidMount = () => {
    this.apicall();
  };

  apicall = () => {
    axios
      .get("http://localhost:8082/groups")
      .then((response) => {
        this.setState({
          groups: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    return (
      <div className="subheader">
        {this.state.groups.map((item) => (
          <SubheaderList key={item.groupId} groupId={item.groupId} />
        ))}
      </div>
    );
  }
}

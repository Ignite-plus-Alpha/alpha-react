import React from "react";
import { Link, withRouter } from "react-router-dom";
import "./subheader.styles.scss";

const GroupList = (props) => {
  return (
    <div className="options">
      <Link to={`${props.match.url}${props.groupId}`}>{props.groupId}</Link>
    </div>
  );
};

export default withRouter(GroupList);


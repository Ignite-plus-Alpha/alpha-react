import React, { Component } from "react";
import PropTypes from "prop-types";

class Book extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.description);
    return (
      <div style={{ width: "60%" }}>
        <table class="ui very basic table">
          <tbody>
            <tr>
              <td>Language</td>
              <td> {this.props.description.language}</td>
            </tr>
            <tr>
              <td>Paperback</td>
              <td> {this.props.description.paperBack}</td>
            </tr>
            <tr>
              <td>author</td>
              <td> {this.props.description.author}</td>
            </tr>
            <tr>
              <td>condition</td>
              <td> {this.props.description.condition}</td>
            </tr>
            <tr>
              <td>publisher</td>
              <td> {this.props.description.publisher}</td>
            </tr>
            {/* <div className="fit"> Product Dimensions: {this.props.description.Product Dimensions},</div> */}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Book;

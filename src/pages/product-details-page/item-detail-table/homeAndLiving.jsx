import React, { Component } from "react";

class HomeAndLiving extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.description);
    return (
      <div>
        <table class="ui very basic table">
          <tbody>
            <tr>
              <td>Assembly</td>
              <td> {this.props.description.assembly}</td>
            </tr>
            <tr>
              <td>Brand</td>
              <td> {this.props.description.brand}</td>
            </tr>
            <tr>
              <td>Color</td>
              <td> {this.props.description.color}</td>
            </tr>
            <tr>
              <td>Dimensions</td>
              <td> {this.props.description.dimensions}</td>
            </tr>
            <tr>
              <td>Warranty</td>
              <td> {this.props.description.warranty}</td>
            </tr>
            <tr>
              <td>Weight</td>
              <td> {this.props.description.weight}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default HomeAndLiving;

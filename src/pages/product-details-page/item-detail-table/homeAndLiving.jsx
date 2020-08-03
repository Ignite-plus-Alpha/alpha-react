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
              <td> {this.props.description.Assembly}</td>
            </tr>
            <tr>
              <td>Brand</td>
              <td> {this.props.description.Brand}</td>
            </tr>
            <tr>
              <td>Color</td>
              <td> {this.props.description.Color}</td>
            </tr>
            <tr>
              <td>Dimensions</td>
              <td> {this.props.description.Dimensions}</td>
            </tr>
            <tr>
              <td>Warranty</td>
              <td> {this.props.description.Warranty}</td>
            </tr>
            <tr>
              <td>Weight</td>
              <td> {this.props.description.Weight}</td>
            </tr>
          </tbody>
        </table>
        {/* <div className="Primary Material"> Primary Material: {this.props.description.Primary Material},</div> */}
        {/* <div className="Warranty"> Room Type: {this.props.description.Room Type},</div> */}
      </div>
    );
  }
}

export default HomeAndLiving;

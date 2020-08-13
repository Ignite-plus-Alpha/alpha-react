import React, { Component } from "react";

class Footwear extends Component {
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
              <td>Color</td>
              <td> {this.props.description.color}</td>
            </tr>
            <tr>
              <td>fit</td>
              <td> {this.props.description.fit}</td>
            </tr>
            <tr>
              <td>material</td>
              <td> {this.props.description.material}</td>
            </tr>
            <tr>
              <td>occasion</td>
              <td> {this.props.description.occasion}</td>
            </tr>
            <tr>
              <td>warranty</td>
              <td> {this.props.description.warranty}</td>
            </tr>
            <tr>
              <td>ankle-length</td>
              <td>regular</td>
              {/* <td> {this.props.description.ankleLength}</td> */}
            </tr>
            {/* <tr>
                <td>ankle-length</td>
                <td> {this.props.description.ankle length}</td>      //        ankle length: "Regular",
                </tr> */}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Footwear;

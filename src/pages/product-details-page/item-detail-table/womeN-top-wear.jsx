import React, { Component } from "react";
import PropTypes from "prop-types";

class WomenTopWear extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.description);
    return (
      <div>
        <div style={{ width: "60%" }}>
          <table class="ui very basic table">
            <tbody>
              <tr>
                <td>Brand</td>
                <td> {this.props.description.brand}</td>
              </tr>
              <tr>
                <td>Care</td>
                <td>{this.props.description.care}</td>
              </tr>
              <tr>
                <td>Color</td>
                <td>{this.props.description.color}</td>
              </tr>
              <tr>
                <td>Fit</td>
                <td>{this.props.description.fit}</td>
              </tr>
              <tr>
                <td>Length</td>
                <td>{this.props.description.length}</td>
              </tr>
              <tr>
                <td>Material</td>
                <td>{this.props.description.material}</td>
              </tr>
              <tr>
                <td>Neck type</td>
                <td>{this.props.description.neckType}</td>
              </tr>
              <tr>
                <td>Occasion</td>
                <td>{this.props.description.occasion}</td>
              </tr>
              <tr>
                <td>Sleeve type</td>
                <td>{this.props.description.sleeveType}</td>
              </tr>
              <tr>
                <td>Transparency</td>
                <td>{this.props.description.transparency}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* <div className="print and pattern"> length: {this.props.print and pattern},</div> */}
      </div>
    );
  }
}

export default WomenTopWear;

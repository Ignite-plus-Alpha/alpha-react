import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Grocery extends Component {

    constructor(props) {
        super(props);
        
    }
    
    render() {
        console.log(this.props.description)
        return (
            <div style={{width:"60%" ,marginLeft:"30px"}}>      
                <table class="ui very basic table">
                <tbody>
                    <tr>
                    <td>Quantity</td>
                    <td> {this.props.description.quantity}</td>      
                    </tr>
                </tbody>
                </table>                               
            </div>
        );
    }
}



export default Grocery;
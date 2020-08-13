import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import "./invoice.styles.scss";
import Button from "@material-ui/core/Button";
import ItemTable from "./itemTable.component";

class Invoice extends Component {
    render() {
        return (
        <div>
        <div className="outbox">
          <div className="box">
            <div className="checkMark">
              <div className="pic">
                <img src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Dark-512.png" alt="" />
              </div>
              <div className="text">
                Thank you for your purchase!
              </div>
            </div>
            <div className="content">
              <div className="info">
                <div className="order">
                  <div className="title">
                    Your order number is: </div>
                  <div className="num">
                    123456879
                  </div>
                </div>
                <div className="address">
                  <div className="title">
                    Billing & Shipping information:
                  </div>
                recipient_name: Pragathi indran<br/>
                line1: Flat no. 507 Wing A Raheja Residency<br/>
                line2: Film City Road<br/>
                city: Mumbai<br/>
                state: Maharashtra<br/>
                postal_code: 400097<br/>
                country: INDIA<br/>
              </div>
              </div>
              <ItemTable/>
              <div className="btn"><br/><br/>
            <Button
            variant="contained"
            color="primary"
            onClick={() => window.location="/"}
            style={{minWidth:200,marginLeft:"40%"}}
            >
            Continue Shopping
          </Button>
              </div>
            </div>
          </div>
      </div>
    </div>
        )
    }
}
export default withRouter(Invoice);
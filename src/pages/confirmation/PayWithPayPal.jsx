import React, { useState, useEffect, useRef } from 'react'
// import { ListGroup, ListGroupItem } from 'reactstrap'
import Invoice from '../Invoice/invoice.component'
import { Redirect, withRouter } from "react-router-dom";

function PayWithPayPal (props) {
    const { items, total } = props
    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState(null);
    const paypalRef = useRef();

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions) => {
                    console.log(total)
                    return actions.order.create({
                        purchase_units: [{
                            description: 'Alpha store checkout',
                            amount: {
                                currency_code: 'INR',
                                value: total,
                            }
                        }]
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    setPaidFor(true);
                    console.log('ORDER');
                },
                onError: err => {
                    setError(err);
                    console.error('ERROR',err);
                },
            })
             .render(paypalRef.current);
    }, [items]);

    if (paidFor) {
        return (
            <div>
                <Redirect to="/invoice"/>
                Thanks for making the purchase.
            </div>
        )
    }

    if (error) {
        return (
            <div>
                Error in processing order. Please Retry again
            </div>
        )
    }

    return (
        <div>
            {/* <ListGroup>
                {items.map((item, index) =>
                    // <ListGroupItem key={item.name + item.value}>
                    //     {item.name} - Rs. {item.value}
                    // </ListGroupItem>)}
            </ListGroup> */}
            <div ref={paypalRef} />
        </div>
    )
}

export default withRouter(PayWithPayPal);
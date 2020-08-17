import React, { useState, useEffect, useRef } from "react";
// import { ListGroup, ListGroupItem } from 'reactstrap'
import Invoice from "../Invoice/invoice.component";
import { Redirect, withRouter } from "react-router-dom";
import Axios from "axios";

function PayWithPayPal(props) {
  const { items, total, quantity, deliveryAddress, products, cartId } = props;
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const paypalRef = useRef();
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          console.log(total);
          return actions.order.create({
            purchase_units: [
              {
                description: "Alpha store checkout",
                amount: {
                  currency_code: "INR",
                  value: total,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          const data1 = {
            orderItems: JSON.stringify(products),
            orderPrice: total,
            orderQuantity: quantity,
            deliveryAddress: deliveryAddress,
            orderStatus: "paid",
          };
          Axios.post(`http://localhost:8081/order`, data1)
            .then((response) => {
              console.log(response.data);
              setOrderId(response.data.orderId);
            })
            .catch((e) => {
              console.log(e);
            });
          Axios.delete(`http://localhost:8081/cartItem/${cartId}`)
            .then((response) => {
              console.log(response.data);
            })
            .catch((e) => {
              console.log(e);
            });
          setPaidFor(true);
          console.log("ORDER");
        },
        onError: (err) => {
          setError(err);
          console.error("ERROR", err);
        },
      })
      .render(paypalRef.current);
  }, [items]);

  if (paidFor) {
    return (
      <div>
        <Redirect to="/invoice" />
        Thanks for making the purchase.
      </div>
    );
  }

  if (error) {
    return <div>Error in processing order. Please Retry again</div>;
  }

  return (
    <div>
      <div ref={paypalRef} />
    </div>
  );
}

export default withRouter(PayWithPayPal);

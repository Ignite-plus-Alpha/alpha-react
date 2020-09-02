import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ProfileDataService from "../../services/profile-service";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Address from "./address";
import Card from "./card";
import Review from "./Review.jsx";
import PayPalBtn from "../payment/PayWithPayPal";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Shipping address", "Payment details", "Review your order"];

export default function Checkout(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [totalQuantity, setTotalQuantity] = React.useState(0);
  const [selectedAddressId, setSelectedAddressId] = React.useState("");
  const [selectedCardId, setSelectedCardId] = React.useState("");
  const [products, setProducts] = React.useState([]);
  const [cartId, setCartId] = React.useState("");
  const [isDataLoaded, setIsDataLoaded] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    setTotalPrice(props.location.state.total_price);
    setTotalQuantity(props.location.state.total_quantity);
    setProducts(props.location.state.items);
    setEmail(props.location.state.email);
    getUserCartId();
  });

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Address handleAddressChange={handleAddressChange} email={email} />
        );
      case 1:
        return <Card handleCardChange={handleCardChange} email={email} />;
      case 2:
        return (
          <Review
            selectedAddressId={selectedAddressId}
            selectedCardId={selectedCardId}
            totalPrice={totalPrice}
            products={products}
            email={email}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }
  const getUserCartId = () => {
    Axios.get(`http://localhost:8081/cart/${localStorage.getItem("userId")}`)
      .then((response) => {
        console.log(response.data);
        setCartId(response.data);
        setIsLoaded(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleAddressChange = (selectedAddressId) => {
    setSelectedAddressId(selectedAddressId);
  };

  const handleCardChange = (selectedCardId) => {
    setSelectedCardId(selectedCardId);
  };

  if (!isLoaded) return <div></div>;
  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h6" gutterBottom>
                  Proceed to pay with PayPal
                </Typography>
                <Typography variant="subtitle1">
                  <PayPalBtn
                    total={totalPrice}
                    currency={"INR"}
                    quantity={totalQuantity}
                    deliveryAddress={selectedAddressId}
                    products={products}
                    cartId={cartId}
                    setTotalQuantity={props.location.setTotalQuantity}
                    email={props.email}
                  />
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Confirm" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}

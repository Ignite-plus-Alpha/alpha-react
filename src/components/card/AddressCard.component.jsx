import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Chip from "@material-ui/core/Chip";
import ProfileService from "../../services/profile-service";
import UpdateAddressForm from "../Modal/update-address-form.component";
import LocationOn from "@material-ui/icons/LocationOn";
import "./location-chip.styles.css";
import Alert from "../alert/alert.component";
import TextButtons from "../../components/text-button/text-button.component";
import OutlinedChips from "../../components/chip/chip.component";
import "./card.styles.css";

const useStyles = makeStyles({
  root: {
    minWidth: 10,
    margin: 5,
  },
  pos: {
    marginBottom: 2,
  },
});

export function AddressCard({
  loadProfileData,
  loadAddresses,
  emailId,
  userId,
  addressId,
  firstName,
  lastName,
  mobile,
  addressLine1,
  addressLine2,
  addressType,
  city,
  state,
  country,
  zipcode,
  defaultAddress,
}) {
  const classes = useStyles();
  const [showAlert, setShowAlert] = React.useState(false);

  const handleDelete = (userId, addressId) => {
    if (addressId === defaultAddress) setShowAlert(true);
    else
      ProfileService.deleteAddressByUserIdAddressId(userId, addressId)
        .then((response) => console.log(response))
        .then(loadAddresses)
        .catch((e) => {
          console.log(e);
        });
  };
  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const makeDefault = () => {
    ProfileService.setDefaultAddressByEmailId(emailId, addressId)
      .then(loadProfileData)
      .catch((e) => console.log(e));
    console.log(
      emailId,
      addressId,
      "make default...................................."
    );
  };

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <div className="card header">
            <Typography variant="h5" style={{ marginBottom: "2%" }}>
              {defaultAddress === addressId ? (
                <Chip size="small" label="Default" float="right" />
              ) : (
                <OutlinedChips
                  makeDefault={makeDefault}
                  label="make default"
                  symbol="D"
                />
              )}{" "}
              Address Details
            </Typography>
          </div>

          <Chip
            icon={<LocationOn />}
            label={addressType}
            className={classes.chip}
            color="primary"
            position="relative"
            left="20px"
            size="small"
          />

          <Divider style={{ marginBottom: "1%" }} />
          <Typography className={classes.pos} color="bold">
            {firstName}&nbsp;{lastName}
          </Typography>
          <Typography className={classes.pos} color="bold">
            {addressLine1}&nbsp;{addressLine2}
            <br />
            {city},&nbsp;{state},&nbsp;{country}
            <br />
            zipcode : {zipcode}
          </Typography>
          <Typography className={classes.pos} color="bold">
            mobile : {mobile}
          </Typography>
        </CardContent>
        <CardActions>
          <div
            className="optionButtons"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              minWidth: "100%",
              padding: "1%",
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(userId, addressId)}
            >
              Delete
            </Button>
            <UpdateAddressForm
              addressType={addressType}
              loadAddresses={loadAddresses}
              userId={userId}
              addressId={addressId}
              emailId={emailId}
              addressLine1={addressLine1}
              addressLine2={addressLine2}
              city={city}
              state={state}
              country={country}
              zipcode={zipcode}
              loadProfileData={loadProfileData}
            />
          </div>
        </CardActions>
      </Card>
      {showAlert && (
        <Alert
          handleAlertClose={handleAlertClose}
          message={
            "set another address as default to proceed with deletion of defaul address"
          }
          showAlert={showAlert}
        />
      )}
    </div>
  );
}

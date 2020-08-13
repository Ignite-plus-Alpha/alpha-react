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
import UpdateCardExpiry from "../../components/Modal/update-card-expiry.component";
import Alert from "../alert/alert.component";
import CustomConfirmation from "../alert/confirmation-alert.component";
import OutlinedChips from "../../components/chip/chip.component";

const useStyles = makeStyles({
  root: {
    minWidth: 10,
    margin: 5,
  },
  pos: {
    marginBottom: 2,
  },
});

export function WalletCard({
  loadWallets,
  loadProfileData,
  email,
  currentUserUserId,
  walletId,
  cardHolderName,
  cardNumber,
  expiryDate,
  defaultCard,
}) {
  const classes = useStyles();

  const [showAlert, setShowAlert] = React.useState(false);
  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const makeDefault = () => {
    ProfileService.setDefaultWalletByEmailId(email, walletId)
      .then(loadProfileData)
      .catch((e) => console.log(e));
    console.log(
      email,
      walletId,
      "make default...................................."
    );
  };

  const deleteDefault = () => {
    console.log("heyyyyyyyyy");
    const st = ".";
    ProfileService.setDefaultWalletByEmailId(email, st)
      .then((res) => console.log(res))
      .then(
        ProfileService.deleteCardByUserIdWalletId(currentUserUserId, walletId)
          .then((response) => console.log(response))
          .then(loadWallets)
          .catch((e) => {
            console.log(e);
          })
      );

    setShowAlert(false);
  };

  const handleDelete = (currentUserUserId, walletId) => {
    console.log("deleted for", currentUserUserId, "*****", walletId);

    if (walletId === defaultCard) setShowAlert(true);
    else
      ProfileService.deleteCardByUserIdWalletId(currentUserUserId, walletId)
        .then((response) => console.log(response))
        .then(loadWallets)
        .catch((e) => {
          console.log(e);
        });
  };

  return (
    <div>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" style={{ marginBottom: "2%" }}>
            {defaultCard === walletId ? (
              <Chip size="small" label="Preffered" float="right" />
            ) : (
              <OutlinedChips makeDefault={makeDefault} />
            )}{" "}
            Card Details
          </Typography>
          <Divider style={{ marginBottom: "1%" }} />
          <Typography className={classes.pos} color="bold">
            Card Holder Name&nbsp;:&nbsp;{cardHolderName}
          </Typography>
          <Typography className={classes.pos} color="bold">
            Card Number &nbsp;:&nbsp;
            {(cardNumber = cardNumber.toString().replace(/\d(?=\d{4})/g, "*"))}
          </Typography>
          <Typography className={classes.pos} color="bold">
            Expiry&nbsp;Date&nbsp;:&nbsp;{expiryDate}
          </Typography>
        </CardContent>
        <CardActions>
          <div
            className="optionButtons"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              position: "center",
              minWidth: "100%",
              padding: "2%",
            }}
          >
            <span>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => handleDelete(currentUserUserId, walletId)}
              >
                Delete
              </Button>
            </span>
            <span>
              <UpdateCardExpiry
                loadProfileData={loadProfileData}
                loadWallets={loadWallets}
                email={email}
                userId={currentUserUserId}
                expiryDate={expiryDate}
                walletId={walletId}
                loadData={loadWallets}
                firstName={cardHolderName}
              />
            </span>
          </div>
        </CardActions>
      </Card>
      {showAlert && (
        <CustomConfirmation
          handleAlertClose={handleAlertClose}
          deleteDefault={deleteDefault}
          message={"Are you sure you want to delete your preferred card"}
          showAlert={showAlert}
        />
      )}
    </div>
  );
}

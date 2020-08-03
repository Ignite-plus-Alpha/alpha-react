import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import UpdateProfileForm from '../Modal/update-profile-form.component';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },
  pos: {
    marginBottom: 2,
  },
});

export default function ProfileDetailCard({email,firstName,lastName,mobile,loadData}) {
  const classes = useStyles();


  return (
    <Card className={classes.root}>
      <CardContent>
      <Typography variant="h5" component="h2" style={{marginBottom:"2%"}}>
          Profile Details
        </Typography>
        <Divider style={{marginBottom:"3%"}}/>
        <Typography className={classes.pos} color="textSecondary">
          email&nbsp;:&nbsp;{email}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        First&nbsp;Name&nbsp;:&nbsp;{firstName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        Last&nbsp;Name&nbsp;:&nbsp;{lastName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        Mobile&nbsp;Number&nbsp;:&nbsp;{mobile}
        </Typography>
      </CardContent>
      <CardActions>
      <UpdateProfileForm email={email} loadData={loadData} firstName={firstName}/>
      </CardActions>
    </Card>
  );
}

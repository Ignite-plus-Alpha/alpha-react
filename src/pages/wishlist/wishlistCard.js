import React from 'react';

import Grid from "@material-ui/core/Grid"
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Remove from '@material-ui/icons/Close'

const useStyles = makeStyles((theme) => ({
  root: {
    
    maxWidth: 305,
    marginBottom:'20%',
    alignItems:'center',
    
  },
  media: {
    height:345,
    
    paddingTop: '56.25%', // 16:9
  },
 
}));



const WishlistCard = props => {
  const classes = useStyles();
  return (
    <div className="summary">
      <Grid key={props.key} item >
      <Card className={classes.root}>
      
      <CardHeader
        
        action={
          <IconButton aria-label="remove" onClick={props.removeItem}>
            <Remove />
          </IconButton>
        }
        
      />
      
      <CardMedia
        className={classes.media}
        image={props.imageUrl}
      />
      <CardContent>
        <Typography variant="body2"  component="p">
          {props.title}
        </Typography>
        <Typography variant="body2"  component="p">
          ₹{props.price}
        </Typography>
        </CardContent>
        <Typography>
          <Button fullWidth onClick={props.moveToCart}>Move to Cart</Button>
        </Typography>
      
      
    </Card>
      
      </Grid>
    </div>
  );
};

export default WishlistCard;

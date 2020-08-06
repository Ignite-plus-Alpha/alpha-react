// import React from 'react'
// import './menu-item.styles.scss'
 import { withRouter } from 'react-router-dom'




// const MenuItem = ({groupId,imageUrl,history,match}) => (
  
//     <div  className ={`$ menu-item`} onClick={()=>history.push(`${match.url}${groupId}`)}>         
//         <div className='background-image' style ={{backgroundImage:`url(${imageUrl})`}}/>
//         <div className='content'>
//             <h1 className='title'>{groupId.toUpperCase()}</h1>
//             <span className='sub-title'>SHOP NOW</span>
//         </div>  
       
        
//     </div>
// )

// export default withRouter(MenuItem);
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 400,
    padding:20 ,
    position:'relative',
    justifyContent:'space-between'
  },
  image: {
    position: 'relative',
    height: 400,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
});

// const images = [
//     {
//         url: '/static/images/grid-list/breakfast.jpg',
//         title: 'Breakfast',
//       width: '30%',
//     }
//   ];

const ButtonBases=(props)=> {
  const { classes,imageUrl,groupId,history,match} = props;
  
  return (
    <div className={classes.root}>
        <ButtonBase
          focusRipple
          key={groupId}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width:'100%',
          }} 
          onClick={()=>history.push(`${match.url}${groupId}`)}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {groupId.toUpperCase()}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
    </div>
  );
}

ButtonBases.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(ButtonBases));
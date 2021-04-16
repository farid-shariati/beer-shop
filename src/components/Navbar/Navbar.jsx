import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StarIcon from '@material-ui/icons/Star';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Badge, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import {cartItemsState} from 'atoms'
import { useRecoilValue } from 'recoil';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cartIcon: {
    marginRight: '25px',
  },
  title: {
    flex: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'white',
  },
  cartCount:{
      backgroundColor:"white",
      borderRadius:"50%",
      width:"20px",
      height:"20px",
      color:theme.palette.primary.main,
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      position:"absolute",
      top:35,
      left:40
  },
}));

const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px"
    }
  }))(Badge);

const Navbar = () => {
  const classes = useStyles();
  const cartItemsCount = useRecoilValue(cartItemsState)
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              Beer Shop
            </Link>
          </Typography>
          <Box>
            <IconButton edge="start" className={classes.cartIcon} color="inherit" title="cart items">
              <Link to="/cart" className={classes.link}>
              <StyledBadge badgeContent={cartItemsCount.length} color="secondary">
                <ShoppingCartIcon fontSize="large" />
              </StyledBadge>
              </Link>
            </IconButton>
            <IconButton edge="start" className={classes.faveIcon} color="inherit" title="favorites">
              <Link to="/favorites" className={classes.link}>
                <StarIcon fontSize="large" />
              </Link>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;

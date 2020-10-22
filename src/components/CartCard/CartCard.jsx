import { Box, Card, CardMedia, IconButton, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import {cartItemsState} from 'atoms'
import { useRecoilState } from 'recoil';
import { useSnackbar } from 'notistack';
import { saveItmes } from 'utils';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '65px',
    marginTop: '20px',
    padding: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartImage: {
    width: '50px',
    height: '50px',
    backgroundSize:"contain"
  },
  cartInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  price: {
      marginRight:"50px",
  },
  itemInfo: {
    display:"flex",
    alignItems:"center",
  },
  name: {
    marginLeft:"20px"
  }
});

const CartCard = ({id,image,price,name}) => {
  console.log(price)
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [cartItems, setCartItems] = useRecoilState(cartItemsState)
  const deleteHandler = (id) => {
    let tempCartItems = cartItems.filter((cart) => cart.id !== id)
    setCartItems(tempCartItems)
    enqueueSnackbar('item deleted from your cart');
    saveItmes('cart', tempCartItems);
  }
  return (
    <Card className={classes.root}>
      <Box className={classes.itemInfo}>
      <CardMedia image={image} className={classes.cartImage} />
      <Typography className={classes.name}>{name}</Typography>
      </Box>
      <Box className={classes.cartInfo}>
        <Typography className={classes.price}>{price}$</Typography>
        <Box>
          <IconButton color="secondary" onClick={() => deleteHandler(id)}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};

export default CartCard;

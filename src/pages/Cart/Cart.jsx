import { Container, makeStyles, Typography } from '@material-ui/core';
import CartCard from 'components/CartCard/CartCard';
import React from 'react'
import {cartItemsState} from 'atoms/index'
import { useRecoilValue } from 'recoil';

const useStyles = makeStyles({
    root: {
      padding:"30px"
    },
    emptyText: {
        textAlign:"center"
    }
  });

const Cart = () => {
    const classes = useStyles()
    const cartItems = useRecoilValue(cartItemsState)
    var totalcounts = cartItems.reduce(function(prev, cur) {
        return prev + cur.srm;
      }, 0);
    console.log(cartItems)
    if(cartItems.length < 1){
        return (
            <h2 className={classes.emptyText}>There is no item in your cart :(</h2>
        )
    }
    return (
        <Container>
        <div className={classes.root}>
            <Typography>totel : {totalcounts}$</Typography>
            {cartItems.map((cart) => (
                <CartCard key={cart.id} id={cart.id} name={cart.name} image={cart.image} price={cart.srm}/>
            ))}
        </div>
        </Container>
    )
}

export default Cart

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Box, CardMedia, CircularProgress, IconButton, Typography } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import { useSingleSoda } from 'hooks';
import { useSnackbar } from 'notistack';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { cartItemsState, favoriteItemsState } from 'atoms';
import StarIcon from '@material-ui/icons/Star';
import { saveItmes } from 'utils';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles((theme) => ({
  modal: {},
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '15px',
    maxWidth: '600px',
  },
  sodaImage: {
    width: '300px',
    height: '250px',
    borderRadius: '10px',
    backgroundSize: 'contain',
  },
  imgBox: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const SodaDetailModal = ({ soda, ...props }) => {
  const [favorites, setFavorites] = useRecoilState(favoriteItemsState);
  const { data, isLoading } = useSingleSoda(soda.id);
  const existsInFavorites = () => {
    return (
      favorites.findIndex((item) => {
        return item.id === soda.id;
      }) > -1
    );
  };
  const classes = useStyles();
  const sodaItem = data && data[0];
  const { enqueueSnackbar } = useSnackbar();
  const setCartItems = useSetRecoilState(cartItemsState);
  const deleteHandler = (id) => {
    let tempItems = favorites.filter((cart) => cart.id !== id);
    setFavorites(tempItems);
    saveItmes('favorites', tempItems);
  };
  const addToFavotites = () => {
    if (!existsInFavorites()) {
      setFavorites((oldcartItems) => {
        const newItem = [
          ...oldcartItems,
          {
            id: soda.id,
            name: soda.name,
            image_url: soda.image_url,
            description: soda.description,
            srm: soda.srm,
          },
        ];

        saveItmes('favorites', newItem);

        return newItem;
      });
      enqueueSnackbar('item added to your favorite items');
    } else {
      deleteHandler(soda.id);
      enqueueSnackbar('item temoved from your favorite items');
    }
  };
  const addToCart = () => {
    setCartItems((oldcartItems) => [
      ...oldcartItems,
      {
        id: uuidv4(),
        name: soda.name,
        image: soda.image_url,
        srm: soda.srm,
      },
    ]);
    enqueueSnackbar('item added to your cart');
  };
  return (
    <Dialog
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      closeAfterTransition
      {...props}
    >
      <DialogContent>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Box className={classes.imgBox}>
              <CardMedia image={sodaItem?.image_url} className={classes?.sodaImage}></CardMedia>
            </Box>
            <Typography variant="h5">{sodaItem?.name}</Typography>
            <Typography variant="body">{sodaItem?.description}</Typography>
            <Typography variant="h6">{sodaItem?.srm}$</Typography>
            <Box className={classes.icons}>
              <IconButton onClick={addToCart}>
                <ShoppingCartIcon />
              </IconButton>
              <IconButton onClick={addToFavotites}>{existsInFavorites() ? <StarIcon /> : <StarBorderOutlinedIcon />}</IconButton>
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SodaDetailModal;

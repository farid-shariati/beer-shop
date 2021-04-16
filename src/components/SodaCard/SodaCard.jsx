import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import StarIcon from '@material-ui/icons/Star';
import Typography from '@material-ui/core/Typography';
import { Box, IconButton } from '@material-ui/core';
import { cartItemsState, favoriteItemsState } from 'atoms';
import { useRecoilState } from 'recoil';
import { useSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';

import { saveItmes } from 'utils';
import { useSetRecoilState } from 'recoil';

const useStyles = makeStyles({
  root: {
    height: 450,
    display:"flex",
    flexDirection:"column"
  },
  media: {
    height: 250,
    backgroundSize: 'contain',
  },
  icons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  descriptionText: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height: 75,
  },
  cardAction: {
    display:' flex',
    flexDirection:"column",
    flex:1
  },
  nameText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  img: {
    width:"100%",
  }
});

const SodaCard = ({ openModal, name, image, description, srm, id }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const setCart = useSetRecoilState(cartItemsState);
  const [favorites, setFavorites] = useRecoilState(favoriteItemsState);

  const existsInFavorites = () => {
    return (
      favorites.findIndex((item) => {
        return item.id === id;
      }) > -1
    );
  };


  const addToCart = () => {
    setCart((oldcartItems) => {
      const newItem = [
        ...oldcartItems,
        {
          id: uuidv4(),
          name,
          image,
          srm,
        },
      ];
      saveItmes('cart', newItem);

      return newItem;
    });
    enqueueSnackbar('item added to your cart');
  };
  const deleteHandler = (id) => {
    let tempItems = favorites.filter((cart) => cart.id !== id)
    setFavorites(tempItems)
    enqueueSnackbar('item deleted from your favorites')
    saveItmes('favorites', tempItems);
  }
  const addToFavotites = () => {
    if(!existsInFavorites()){
    setFavorites((oldcartItems) => {
      const newItem = [
        ...oldcartItems,
        {
          id,
          name,
          image_url :image,
          description,
          srm,
        },
      ];

      saveItmes('favorites', newItem);

      return newItem;
    });
    enqueueSnackbar('item added to your favorite items')}
    else {
      deleteHandler(id)
    }
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={openModal} className={classes.cardAction}>
        <Box className={classes.img}>
        <CardMedia className={classes.media} image={image ? image : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"} />
        </Box>
        <CardContent>
          <Typography gutterBottom component="h6" className={classes.nameText}>
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" className={classes.descriptionText}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.icons}>
        <IconButton onClick={addToCart}>
          <ShoppingCartIcon />
        </IconButton>
        <IconButton onClick={addToFavotites}>
          {existsInFavorites() ? <StarIcon /> : <StarBorderOutlinedIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default SodaCard;

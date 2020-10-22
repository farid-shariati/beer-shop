import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { useEffect } from 'react';
import theme from './theme';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';
//pages
import Layout from 'layout/MainLayout';
import Home from 'pages/Home';
import Favorite from 'pages/Favorite';
import Cart from 'pages/Cart';

import { getItems } from 'utils';
import { useSetRecoilState } from 'recoil';
import { cartItemsState, favoriteItemsState } from 'atoms';

const RootApp = () => {
  const setCart = useSetRecoilState(cartItemsState);
  const setFavorites = useSetRecoilState(favoriteItemsState);
  useEffect(() => {
    const cart = getItems('cart', 14);
    const favorites = getItems('favorites', 30);
    setCart(cart);
    setFavorites(favorites);
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <CssBaseline />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/favorites" component={Favorite} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={5}
          autoHideDuration={2000}
          variant="success"
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <RootApp />
        </SnackbarProvider>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;

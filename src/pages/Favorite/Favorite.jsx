import { Container, Grid, makeStyles } from '@material-ui/core';
import SodaCard from 'components/SodaCard/SodaCard';
import SodaDetailModal from 'components/SodaDetailModal/SodaDetailModal';
import React, { useState } from 'react';
import { favoriteItemsState } from 'atoms/index';
import { useRecoilValue } from 'recoil';

const useStyles = makeStyles({
  root: {
    marginTop: '65px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  cardBox: {
    padding: '10px',
  },
  emptyText: {
    textAlign: 'center',
  },
});

const Favorite = () => {
  const classes = useStyles();
  const [modalOpen, setModalOpen] = useState(null);
  const openModal = (soda) => {
    setModalOpen(soda);
  };
  const favorites = useRecoilValue(favoriteItemsState);
  if (favorites.length < 1) {
    return <h2 className={classes.emptyText}>There is no item in your favorite list :(</h2>;
  }
  return (
    <Container>
      <Grid container spacing={2} className={classes.root}>
        {favorites.map((soda) => (
          <Grid item md={4} lg={3} sm={12} key={soda.id}>
            <SodaCard
              openModal={() => openModal(soda)}
              name={soda.name}
              image={soda.image_url}
              description={soda.description}
              id={soda.id}
              srm={soda.srm}
            />
          </Grid>
        ))}
        {modalOpen !== null && <SodaDetailModal open={true} soda={modalOpen} onClose={() => setModalOpen(null)} />}
      </Grid>
    </Container>
  );
};

export default Favorite;

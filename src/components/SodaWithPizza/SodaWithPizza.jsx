import { Grid, makeStyles } from '@material-ui/core';
import SodaCard from 'components/SodaCard/SodaCard';
import SodaDetailModal from 'components/SodaDetailModal/SodaDetailModal';
import { useSodaWithPizza } from 'hooks';
import React, { useState } from 'react';
import { sortTypeState } from 'atoms/index';
import { useRecoilValue } from 'recoil';
import { ascendingAbv, ascendingAlphabetic, descendingAbv, descendingAlphabetic } from 'utils';

const useStyles = makeStyles({
  root: {
    marginTop: 25,
  },
});

const SodaWithPizza = () => {
  const classes = useStyles();

  const { data: sodawithpizza, isLoading } = useSodaWithPizza();

  const sortState = useRecoilValue(sortTypeState);

  const [modalOpen, setModalOpen] = useState(null);

  const getSodas = () => {
    switch (sortState) {
      case 0:
        return ascendingAlphabetic(sodawithpizza);
      case 1:
        return descendingAlphabetic(sodawithpizza);
      case 2:
        return ascendingAbv(sodawithpizza);
      case 3:
        return descendingAbv(sodawithpizza);
      default:
        return sodawithpizza;
    }
  };

  const openModal = (soda) => {
    setModalOpen(soda);
  };
  if (isLoading) return <p>loading...</p>;
  return (
    <Grid container spacing={2} className={classes.root}>
      {sodawithpizza ? (
        getSodas().map((soda) => (
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
        ))
      ) : (
        <p>there is something wrong with api :( sorry come back later</p>
      )}
      {modalOpen !== null && <SodaDetailModal open={true} soda={modalOpen} onClose={() => setModalOpen(null)} />}
    </Grid>
  );
};

export default SodaWithPizza;

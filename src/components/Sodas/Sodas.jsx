import React, { useState } from 'react';
import SodaCard from 'components/SodaCard/SodaCard';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SodaDetailModal from 'components/SodaDetailModal';
import { useAllSodas } from 'hooks/index';
import { sortTypeState } from 'atoms/index';
import { useRecoilValue } from 'recoil';
import { ascendingAbv, ascendingAlphabetic, descendingAbv, descendingAlphabetic } from 'utils';

const useStyles = makeStyles({
  root: {
    marginTop:25
  }
});

const Sodas = () => {
  const classes = useStyles();

  const { data: sodas, isLoading } = useAllSodas();

  const sortState = useRecoilValue(sortTypeState);

  const [modalOpen, setModalOpen] = useState(null);

  const getSodas = () => {
    switch (sortState) {
      case 0:
        return ascendingAlphabetic(sodas);
      case 1:
        return descendingAlphabetic(sodas);
      case 2:
        return ascendingAbv(sodas);
      case 3:
        return descendingAbv(sodas);
      default:
        return sodas;
    }
  };

  const openModal = (soda) => {
    setModalOpen(soda);
  };
  if (isLoading) return <p>loading...</p>;
  return (
    <Grid container spacing={2} className={classes.root}>
      {sodas ? getSodas().map((soda) => (
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
      )) : <p>there is something wrong with api :( sorry come back later</p>}
      {modalOpen !== null && <SodaDetailModal open={true} soda={modalOpen} onClose={() => setModalOpen(null)} />}
    </Grid>
  );
};

export default Sodas;

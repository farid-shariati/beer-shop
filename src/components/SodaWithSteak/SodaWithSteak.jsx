import { Grid, makeStyles } from '@material-ui/core';
import SodaCard from 'components/SodaCard/SodaCard';
import SodaDetailModal from 'components/SodaDetailModal/SodaDetailModal';
import React, { useState } from 'react';
import { useSodaWithSteak } from 'hooks/index';
import { useRecoilValue } from 'recoil';
import { ascendingAbv, ascendingAlphabetic, descendingAbv, descendingAlphabetic } from 'utils';
import { sortTypeState } from 'atoms';


const useStyles = makeStyles({
  root: {
    marginTop: 25

  },

});

const SodaWithSteak = () => {
  const classes = useStyles();

  const { data: sodawithsteak, isLoading } = useSodaWithSteak();

  const sortState = useRecoilValue(sortTypeState);

  const [modalOpen, setModalOpen] = useState(null);

  const getSodas = () => {
    switch (sortState) {
      case 0:
        return ascendingAlphabetic(sodawithsteak);
      case 1:
        return descendingAlphabetic(sodawithsteak);
      case 2:
        return ascendingAbv(sodawithsteak);
      case 3:
        return descendingAbv(sodawithsteak);
      default:
        return sodawithsteak;
    }
  };

  const openModal = (soda) => {
    setModalOpen(soda);
  };
  if (isLoading) return <p>loading...</p>;
  return (
    <Grid container spacing={2} className={classes.root}>
      {getSodas().map((soda) => (
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
  );
};

export default SodaWithSteak;

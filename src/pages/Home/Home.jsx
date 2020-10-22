import { Container } from '@material-ui/core';
import Sodas from 'components/Sodas/Sodas';
import SodaWithPizza from 'components/SodaWithPizza/SodaWithPizza';
import SodaWithSteak from 'components/SodaWithSteak/SodaWithSteak';
import SortType from 'components/SortType/SortType';
import TabMenu from 'components/TabMenu/TabMenu';
import React, { useState } from 'react';

const Home = () => {
  const [sodaType, setSodaType] = useState(0);
  const renderCards = () => {
    if (sodaType === 0) {
      return <SodaWithPizza />;
    } else if (sodaType === 1) {
      return <SodaWithSteak />;
    } else if (sodaType === 2) {
      return <Sodas />;
    }
  };
  const setWithPizza = () => {
    setSodaType(0);
  };
  const setWithSteak = () => {
    setSodaType(1);
  };
  const setSodas = () => {
    setSodaType(2);
  };
  return (
    <div>
      <TabMenu setWithPizza={setWithPizza} setWithSteak={setWithSteak} setSodas={setSodas} />
      <Container>
        <SortType />
        {renderCards()}
      </Container>
    </div>
  );
};

export default Home;

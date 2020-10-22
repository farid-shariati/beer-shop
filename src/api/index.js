import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.punkapi.com/v2',
});

const getSodaWithPizza = async () => {
  const { data } = await client.get(`/beers?food=pizza`);
  return data;
};

const getSodaWithSteak = async () => {
  const { data } = await client.get(`/beers?food=steak`);
  return data;
};

const getSodas = async () => {
  const { data } = await client.get(`/beers`);
  return data;
};

const getSingleSoda = async (_, id) => {
    const { data } = await client.get(`/beers/${id}`);
    return data;
  };

  export {
    getSodaWithPizza,
    getSodaWithSteak,
    getSodas,
    getSingleSoda
  }
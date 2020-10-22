import * as api from 'api';
import { useQuery } from 'react-query';

const useAllSodas = () => {
  return useQuery('sodas', api.getSodas);
};

const useSodaWithPizza = () => {
  return useQuery('sodawithpizza', api.getSodaWithPizza);
};

const useSodaWithSteak = () => {
  return useQuery('sodawithsteak', api.getSodaWithSteak);
};

const useSingleSoda = (id) => {
    return useQuery(['soda', id], api.getSingleSoda)
}

export { useAllSodas, useSodaWithPizza, useSodaWithSteak, useSingleSoda };

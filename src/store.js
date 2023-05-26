import { configureStore } from '@reduxjs/toolkit';
// gracias a toolkit, podemos simplificar la configuracion y el uso de redux
// incorpora el concepto de slice ==> que es una parte del state de redux ==> uno para pokemons otro para filter
// incopora el createSlice ==> genera automáticamente las acciones y los reducers basados en un objeto que define las transformaciones del estado

import pokemonsReducer from './features/pokemons/pokemonsSlice';
import filtersReducer from './features/filters/filtersSlice';

export default configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    filters: filtersReducer,
  },
});


import axios from "axios"


export const GET_POKEMONS= "GET_POKEMONS"
export const GET_POKEMON = 'GET_POKEMON'
export const SEARCH_POKEMON = 'SEARCH_POKEMON';

export const getPokemons = () => {
    return async function(dispatch){
        const apiData = await axios.get('/pokemon/')

        const pokemons = apiData.data
        dispatch({type: GET_POKEMONS, payload:  pokemons})
    }
}


export const getPokemon = (id) => {
        return async function (dispatch){
            const apiData = await axios.get(`/pokemon/${id}`)
            const pokemon = apiData.data;
            dispatch({type: GET_POKEMON, payload:  pokemon})

        }
       
}

export const searchPokemon = (name) => {
    return async function(dispatch){
        const res = await axios.get(`/pokemon/?name=${name}`)
        dispatch({type: SEARCH_POKEMON, payload: res.data})
    }
}

export const CREATE_POKEMON_REQUEST = 'CREATE_POKEMON_REQUEST';
export const CREATE_POKEMON_SUCCESS = 'CREATE_POKEMON_SUCCESS';
export const CREATE_POKEMON_FAILURE = 'CREATE_POKEMON_FAILURE';

// En tu archivo de acciones
export const createPokemon = (pokemon) => {
    return function (dispatch) {
      dispatch({ type: CREATE_POKEMON_REQUEST });
  
      axios.post('/pokemon/', pokemon, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
          dispatch({ type: CREATE_POKEMON_SUCCESS, payload: res.data });
      })
      .catch(err => {
          // Asegúrate de que estás recibiendo el mensaje de error correcto del servidor
          const errorMessage = err.response.data;
          dispatch({ type: CREATE_POKEMON_FAILURE, error: errorMessage });
      });
    };
  };
  
  


export const CLEAR_SEARCH = 'CLEAR_SEARCH'

export const clearSearch = () => {
    return {
      type: CLEAR_SEARCH,
    };
  };
  

 
  export const SET_FILTER_BY_TYPE = "SET_FILTER_BY_TYPE"
  export const SET_FILTER_BY_ORIGIN = "SET_FILTER_BY_ORIGIN"
  export const SET_SORT_TYPE = "SET_SORT_TYPE"
  export const SET_SORT_ORDER = "SET_SORT_ORDER"
  

  export const setFilterByType = (type) => {
    return {
      type: SET_FILTER_BY_TYPE,
      payload: type,
    };
  }
  
  export const setFilterByOrigin = (origin) => {
    return {
      type: SET_FILTER_BY_ORIGIN,
      payload: origin,
    };
  }
  
  export const setSortType = (sortType) => {
    return {
      type: SET_SORT_TYPE,
      payload: sortType,
    };
  }
  
  export const setSortOrder = (sortOrder) => {
    return {
      type: SET_SORT_ORDER,
      payload: sortOrder,
    };
  }
  

  export const DELETE_POKEMON_REQUEST = 'DELETE_POKEMON_REQUEST';
export const DELETE_POKEMON_SUCCESS = 'DELETE_POKEMON_SUCCESS';
export const DELETE_POKEMON_FAILURE = 'DELETE_POKEMON_FAILURE';

export const deletePokemon = (id) => {
  return function (dispatch) {
    dispatch({ type: DELETE_POKEMON_REQUEST });

    axios.delete(`/pokemon/${id}`)
    .then(() => {
        dispatch({ type: DELETE_POKEMON_SUCCESS, payload: id });
    })
    .catch(err => {
        dispatch({ type: DELETE_POKEMON_FAILURE, error: err });
    });
  };
};


export const GET_TYPES = "GET_TYPES";

export const getTypes = () => {
    return async function(dispatch){
        const apiData = await axios.get('/types/?limit=50')
        const types = apiData.data
        dispatch({type: GET_TYPES, payload: types})
    }
}

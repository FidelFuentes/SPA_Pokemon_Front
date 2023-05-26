import { GET_POKEMONS, SEARCH_POKEMON,CREATE_POKEMON_FAILURE,CREATE_POKEMON_REQUEST,GET_TYPES,CREATE_POKEMON_SUCCESS, CLEAR_SEARCH,SET_FILTER_BY_ORIGIN,SET_SORT_ORDER,SET_SORT_TYPE,SET_FILTER_BY_TYPE,DELETE_POKEMON_FAILURE,DELETE_POKEMON_REQUEST,DELETE_POKEMON_SUCCESS} from "./actions"

const inititalState = {
    pokemons: [],
    filterResults: [],
    searchResults: [],
    originFilter: 'all',
    filterByType: 'all',
    filterByOrigin: 'all',
    sortType: '',
    sortOrder: '',
    pokemonCreationStatus: 'idle',
    types: [],
}

const rootReducer = (state = inititalState , action) => {
    switch ( action.type){
        case GET_POKEMONS:
            return {...state , pokemons: action.payload}
        case SEARCH_POKEMON:
            return {...state , searchResults: action.payload}
            case CREATE_POKEMON_REQUEST:
                return { ...state, pokemonCreationStatus: 'loading' }
              case CREATE_POKEMON_SUCCESS:
                return { ...state, pokemonCreationStatus: 'success', pokemons: [...state.pokemons, action.payload] }
                case CREATE_POKEMON_FAILURE:
                    return { ...state, pokemonCreationStatus: 'idle', errorMessage: action.error }
        case CLEAR_SEARCH:
            return {...state, searchResults: [],}
        case SET_FILTER_BY_TYPE:
                return {...state , filterByType: action.payload}
        case SET_FILTER_BY_ORIGIN:
                return {...state , filterByOrigin: action.payload}
                case SET_SORT_TYPE:
                    return {...state , sortType: action.payload === 'none' ? '' : action.payload}
                case SET_SORT_ORDER:
                    return {...state , sortOrder: action.payload === 'none' ? '' : action.payload}

                    case DELETE_POKEMON_REQUEST:
      return { ...state, pokemonDeletionStatus: 'loading' };
    case DELETE_POKEMON_SUCCESS:
      return { 
        ...state, 
        pokemonDeletionStatus: 'success', 
        pokemons: state.pokemons.filter(pokemon => pokemon.id !== action.payload) 
      };
    case DELETE_POKEMON_FAILURE:
      return { ...state, pokemonDeletionStatus: 'idle' };
      case GET_TYPES:
    return {...state , types: action.payload}

                
        
        default:
            return {...state}
    }
}

export default rootReducer;





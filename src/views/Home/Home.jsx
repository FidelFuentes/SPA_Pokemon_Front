import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons,searchPokemon,setSortOrder,setSortType,getTypes  } from '../../redux/actions';
import CardsContainer from '../../componentes/CardsContainer/CardsContainer';
import SearchBar from '../../componentes/SearchBar/SearchBar';
import style from './Home.module.css'
import Pagination from '../../componentes/Pagination/Pagination';

const Home = () =>{
    const dispatch = useDispatch()
    const pokemons = useSelector(state => state.pokemons)
    const searchResults = useSelector(state => state.searchResults) 
    let displayData = searchResults.length > 0 ? searchResults : pokemons; 
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(12);
    const sortType = useSelector(state => state.sortType);
    const sortOrder = useSelector(state => state.sortOrder);
    const [currentPokemons, setCurrentPokemons] = useState([]);
    const [dataToShow, setDataToShow] = useState([]);
    const [filterByType, setFilterByType] = useState('all');
    const [filterByOrigin, setFilterByOrigin] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    

    
    // 1. Obtener pokemones
    useEffect(()=>{
        setIsLoading(true)
        dispatch(getPokemons())
        .then(() => {
            setIsLoading(false); // Indicamos que se terminó de cargar
        })
        
    },[dispatch])

    // Obtener tipos
        useEffect(()=>{
            dispatch(getTypes())
    },[dispatch])

const types = useSelector(state => state.types)


    // 2. Filtrar pokemones
    useEffect(() => {
        let filteredArray = [...displayData]; // Modificado aquí, de pokemons a displayData
        
        if (filterByType !== 'all') {
            filteredArray = filteredArray.filter(pokemon => pokemon.types.includes(filterByType));
        }
    

        if (filterByOrigin !== 'all') {
            if (filterByOrigin === 'db') {
                filteredArray = filteredArray.filter(pokemon => pokemon.created);
            } else {
                filteredArray = filteredArray.filter(pokemon => !pokemon.created);
            }
        }
        

        if (searchTerm !== '') {
            filteredArray = filteredArray.filter(pokemon =>
                pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredData(filteredArray);
    }, [displayData, filterByType, filterByOrigin, searchTerm]); // Modificado aquí, de pokemons a displayData

    // 2. Ordenar pokemones
    useEffect(() => {
        let sortedArray = [...filteredData];
        if(sortType === 'name'){
            if(sortOrder === 'asc'){
                sortedArray = sortedArray.sort((a, b) => a.name.localeCompare(b.name));
            }
            else if(sortOrder === 'desc'){
                sortedArray = sortedArray.sort((a, b) => b.name.localeCompare(a.name));
            }
        }
        else if(sortType === 'attack'){
            if(sortOrder === 'asc'){
                sortedArray = sortedArray.sort((a, b) => a.attack - b.attack);
            }
            else if(sortOrder === 'desc'){
                sortedArray = sortedArray.sort((a, b) => b.attack - a.attack);
            }
        }
        setDataToShow(sortedArray);
    }, [sortType, sortOrder, filteredData])
    
    

    // Se recalculará currentPokemons cada vez que cambie dataToShow
    
    useEffect(() => {
        const indexOfLastPokemon = currentPage * pokemonsPerPage;
        const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
        const currentPokemons = dataToShow.slice(indexOfFirstPokemon, indexOfLastPokemon);
        setCurrentPokemons(currentPokemons);
    }, [dataToShow, currentPage, pokemonsPerPage]);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleFilterByType = (e) => {
        setFilterByType(e.target.value);
        setCurrentPage(1);
    }
    
    const handleFilterByOrigin = (e) => {
        setFilterByOrigin(e.target.value);
        setCurrentPage(1);
    }
    
    
    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        dispatch(searchPokemon(term));  // Dispatch the searchPokemon action
    }
    
    

    return(
        <div className={style.homeContainer}>
            <div className={style.select}>

          <SearchBar onSearch={handleSearch} />

          <select onChange={(e) => {
    const [type, order] = e.target.value.split('-');
    dispatch(setSortType(type));
    dispatch(setSortOrder(order));
}}>
    <option value="none-none">Sort by name</option>
    <option value="name-asc">Sort by name ascending</option>
    <option value="name-desc">Sort by name descending</option>
</select>

<select onChange={(e) => {
    const [type, order] = e.target.value.split('-');
    dispatch(setSortType(type));
    dispatch(setSortOrder(order));
}}>
    <option value="none-none">Sort by attack</option>
    <option value="attack-asc">Sort by attack ascending</option>
    <option value="attack-desc">Sort by attack descending</option>
</select>

          
                <select onChange={handleFilterByType}>
                <option value="all">All types</option>
                {types && types.map((type) => (
                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                    ))}
                </select>
          
          <select onChange={handleFilterByOrigin}>
            <option value="all">All pokémons</option>
            <option value="api">Pokédex</option>
            <option value="db">Yours pokémons</option>
          </select>
          </div>

          {isLoading ? (
            <img src="https://i.pinimg.com/originals/eb/94/72/eb947275a119eeecb960f4e0f5cc55f1.gif" alt="" />
        ) : (
            <CardsContainer pokemons={currentPokemons} />
        )}
          
          <Pagination 
            pokemonsPerPage={pokemonsPerPage}
            totalPokemons={dataToShow.length}
            paginate={paginate}
            currentPage={currentPage}
            />

        </div>
    )
    
}

export default Home;

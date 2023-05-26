import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchPokemon } from '../../redux/actions';
import { clearSearch } from '../../redux/actions';
import { useEffect } from 'react';
import styles from './SearchBar.module.css';


function SearchBar() {
    const [inputValue, setInputValue] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
          dispatch(clearSearch());
        };
      }, [dispatch]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(searchPokemon(inputValue));
    }

    return (
        
        <form onSubmit={handleSubmit} className={styles.search}>
            <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Look for a Pokémon "/>
            <button type="submit">Search</button>
        </form>
        
    )
}

export default SearchBar;

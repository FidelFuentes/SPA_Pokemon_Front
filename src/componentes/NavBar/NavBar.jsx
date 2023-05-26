import  {Link} from "react-router-dom"
import style from './NavBar.module.css'
import { useDispatch } from 'react-redux';
import { clearSearch } from '../../redux/actions';


const NavBar = () =>{
    const dispatch = useDispatch();

    return(
        <div className={style.navContainer}>
            <div className={style.titleContainer}>
                <h1>PokéApp</h1> 
                <img src="https://cdn.iconscout.com/icon/free/png-256/free-squirtle-pokemon-water-wartortle-cartoon-32212.png" className={style.navImage} alt="pokeIcon"></img>
                </div>
                <div>
            <Link to="/home" onClick={() => dispatch(clearSearch())}>Home</Link>
            
            <Link to="/create"> Create your Pokémon </Link>
            </div>
        </div>
    )
}

export default NavBar;
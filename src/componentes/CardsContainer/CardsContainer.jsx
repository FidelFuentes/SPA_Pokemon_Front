import Card from "../Card/Card"
import style from "./CardsContainer.module.css"

const CardsContainer = ({ pokemons }) => {
    return(
        <div className={style.cardContainer}>
            {pokemons.map(pokemon => {
                return <Card
                    key={pokemon.id}
                    id={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.image} 
                    types={pokemon.types} 
                    created={pokemon.created}
                />
            })}
        </div>
    )
}

export default CardsContainer

import { Link } from 'react-router-dom';
import style from './Card.module.css';
import { useDispatch } from 'react-redux';
import { deletePokemon } from '../../redux/actions';

const Card = ({ id, name, image, types, created }) => {
    const dispatch = useDispatch();

    const handleDeleteClick = (e) => {
        e.stopPropagation(); // para evitar que el evento de clic se propague al enlace
        dispatch(deletePokemon(id));
    };

    return (
        <div className={style.cardWrapper}>
            <Link to={`/detail/${id}`} className={style.card}>
                <p className={style.id}>{created ? '' : id}</p>
                <img src={image} alt={name} />
                <p>{name}</p>
                <div>
                    {types.map((type, index) => <span key={index}>{type} </span>)}
                </div>
            </Link>
            {created && <button onClick={handleDeleteClick}>Delete</button>}
        </div>
    );
}

export default Card;

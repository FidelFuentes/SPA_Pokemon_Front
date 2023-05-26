import styles from './Pagination.module.css'
import { Link } from 'react-router-dom';

// deploy
const Pagination = ({ pokemonsPerPage, totalPokemons, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav >
      <ul className={styles.pagination}>
        <li>
          <button 
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            prev
          </button>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className={number === currentPage ? styles['active-page'] : ''}>

        <Link to="#" onClick={() => paginate(number)} className={styles['page-link']}>
            {number}
        </Link>

          </li>
        ))}
        <li>
          <button 
            onClick={() => currentPage < pageNumbers.length && paginate(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
          >
            next
          </button>
        </li>
      </ul>
    </nav>
  );
};


export default Pagination;

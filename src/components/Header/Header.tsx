import { Link } from 'react-router-dom';
import styles from '../../components/Header/Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__wrap}>
        <h1>Pokemons</h1>
        <div className={styles.header__wrapButton}>
          <Link to='/favorites' className={styles.header__btn}>
            Favorites
          </Link>
          <Link to='/' className={styles.header__btn}>
            Main
          </Link>
          <Link to='/comparison' className={styles.header__btn}>
            Comparison
          </Link>
        </div>
      </div>
    </header>
  );
};

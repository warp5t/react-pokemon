import { Link } from 'react-router-dom';
import styles from '../../components/Header/Header.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export const Header = () => {
  const nextPage = useSelector((state: RootState) => state.pokeList.data.next);

  const getSamePage = () => {
    if (!nextPage) {
      console.error("nextPage is null or undefined");
      return;
    }
    const urlObj = new URL(nextPage);
    const params = new URLSearchParams(urlObj.search);
    const offsetParam = params.get('offset');
    const currentOffset = offsetParam ? parseInt(offsetParam) : 0;
    const newOffset = Math.max(0, currentOffset - 20);
    params.set('offset', String(newOffset));
    urlObj.search = params.toString();
    console.log('current page: ', urlObj.toString());
    return urlObj.toString();
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__wrap}>
        <h1>Pokemons</h1>
        <div className={styles.header__wrapButton}>
          <Link to='/favorites' className={styles.header__btn}>
            Favorites
          </Link>
          <Link to='/' onClick={getSamePage} className={styles.header__btn}>
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

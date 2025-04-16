import styles from '../styles/header/Header.module.css'

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__wrap}>
        <h1>Pokemons</h1>
        <div className={styles.header__wrapButton}>
          <button>Favorites</button>
          <button>Comparison</button>
        </div>
      </div>
    </header>
  )
}
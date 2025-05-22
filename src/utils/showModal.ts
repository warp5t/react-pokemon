import style from '../components/Pokemons/Pokemons.module.css';

export const modalSwitch = (
  fn: React.Dispatch<React.SetStateAction<boolean>>,
  _status: boolean,
) => {
  if (fn) {
    fn((status: boolean) => !status);
  }
  const body = document.getElementById('body');
  body?.classList.toggle(style.scrollStop);
};

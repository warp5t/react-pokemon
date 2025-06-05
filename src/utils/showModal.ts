import style from './stopScroll.module.css';

export const modalSwitch = (
  fn: React.Dispatch<React.SetStateAction<boolean>>,
  modal: boolean,
) => {
  if (fn) {
    fn((modal: boolean) => !modal);
  }
  const body = document.getElementById('body');
  if (modal === false) {
    body?.classList.remove(style.scrollStop);
  } else {
    body?.classList.add(style.scrollStop);
  }
};

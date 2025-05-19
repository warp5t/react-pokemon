import ReactDOM from 'react-dom';
import style from './Modal.module.css';

interface ModalProps {
  toggle: () => void;
}

export function Modal({ toggle }: ModalProps) {
  const modalRoot = document.getElementById('modal-root') as HTMLDivElement;
  return ReactDOM.createPortal(
    <div className={style.modal}>
    <div className={style.modal__wrap}>
      <div className={style.modal__text}>You can't chose <br /> more than two pokemons</div>
      <button className={style.modal__btn} onClick={toggle}>Close</button>
    </div>
    </div>,
    modalRoot,
  );
}

import ReactDOM from 'react-dom';
import style from './Modal.module.css';

interface ModalProps {
  toggle: () => void;
}

export function Modal({ toggle }: ModalProps) {
  const modalRoot = document.getElementById('modal-root') as HTMLDivElement;
  return ReactDOM.createPortal(
    <div className={style.modal}>
      <div className={style.modal__text}>This is poke modal</div>
      <button onClick={toggle}>Close</button>
    </div>,
    modalRoot,
  );
}

import ReactDOM from 'react-dom';
import style from './Modal.module.css';
import { clearCompareError } from '../../slicers/pokeCompare/compareSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
interface ModalProps {
  toggle: () => void;
}

export function Modal({ toggle }: ModalProps) {
  const modalRoot = document.getElementById('modal-root') as HTMLDivElement;
   const dispatch = useDispatch<AppDispatch>();
  return ReactDOM.createPortal(
    <div className={style.modal}>
      <div className={style.modal__wrap}>
        <div className={style.modal__text}>
          You can't chose <br /> more than two pokemons
        </div>
        <button className={style.modal__btn} onClick={
          () => {
            toggle()
            dispatch(clearCompareError())
          }
          }>
          Close
        </button>
      </div>
    </div>,
    modalRoot,
  );
}

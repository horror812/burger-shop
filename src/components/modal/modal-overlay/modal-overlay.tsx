import { FC } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal-overlay.module.css';


type ModalOverlayProps = {
  onClick: () => void; 
  children: React.ReactElement
}

const ModalOverlay: FC<ModalOverlayProps> = ({ children, onClick }) => {
 
  const modalRoot = document.getElementById("modals");

  if(modalRoot) {
    return ReactDOM.createPortal(
      (
        <div className={styles.root} onClick={onClick}>
            {children} 
        </div>
      ), 
      modalRoot
    );
  } else {
    return null;
  }
};

export default ModalOverlay;
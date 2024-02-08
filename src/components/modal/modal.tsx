import { FC, useCallback, useEffect } from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modal-overlay/modal-overlay';
import styles from './modal.module.css';

type ModalProps = {
  header?: string;
  onClick?: () => void;
  children: React.ReactElement
}

const Modal: FC<ModalProps> = ({ header, children, onClick }) => {

  // esc-cb
  const handleCloseByEsc = useCallback(
    (e: KeyboardEvent) => { e.key === "Escape" && onClick && onClick()}
  , [onClick]);      

  // eff
  useEffect(() => {
      document.addEventListener('keydown', handleCloseByEsc)
      return () => {
          document.removeEventListener('keydown', handleCloseByEsc)
      }
  }, [handleCloseByEsc]);

  return (
    <ModalOverlay onClick={onClick}>
      <div className={styles.root + " pt-10 pr-10 pb-15 pl-10"} 
        onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          { header && <h2 className="text_type_main-large">{header}</h2>}
          <button className={styles.closeButton} onClick={onClick}>
            <CloseIcon type="primary" />
          </button>
        </div>
          {children}
      </div>
    </ModalOverlay>
  );
};

export default Modal;
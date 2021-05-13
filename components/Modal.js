import cx from 'classnames';
import { MdClose } from 'react-icons/md';
import ReactModal from 'react-modal';

import styles from '../styles/Modal.module.css';
import Button from './Button';

const Modal = ({ isOpen, onClose, children, className }) => (
  <ReactModal
    isOpen={isOpen}
    ariaHideApp={false}
    closeTimeoutMS={150}
    className={cx(styles.modal, className)}
    overlayClassName={cx(styles.overlay)}
    onRequestClose={onClose}
  >
    <Button
      thin
      icon={MdClose}
      onClick={onClose}
      tooltip="Close Modal"
      className={cx(styles.close)}
    />

    {children}
  </ReactModal>
);

export default Modal;

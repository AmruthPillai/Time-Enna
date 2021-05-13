import cx from 'classnames';

import styles from '../styles/Button.module.css';
import { handleKeyPress } from '../utils';

const Button = ({ icon, children, thin = false, tooltip, ariaLabel, className, onClick }) => {
  const Icon = icon;

  return (
    <button
      tabIndex="0"
      type="button"
      onClick={onClick}
      data-tip={tooltip}
      aria-label={ariaLabel}
      onKeyPress={e => handleKeyPress(e, onClick)}
      className={cx(styles.button, { [styles.thin]: thin }, className)}
    >
      {icon && <Icon />}
      {children && <span>{children}</span>}
    </button>
  );
};

export default Button;

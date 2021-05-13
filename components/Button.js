import cx from 'classnames';

import styles from '../styles/Button.module.css';

const Button = ({
  icon,
  children,
  thin = false,
  tooltip,
  className,
  onClick
}) => {
  const Icon = icon;

  const onKeyPress = e => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  return (
    <button
      tabIndex="0"
      type="button"
      onClick={onClick}
      data-tip={tooltip}
      onKeyPress={onKeyPress}
      className={cx(styles.button, { [styles.thin]: thin }, className)}
    >
      {icon && <Icon />}
      {children && <span>{children}</span>}
    </button>
  );
};

export default Button;

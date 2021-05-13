import cx from 'classnames';

import styles from '../styles/Logo.module.css';

const Logo = ({ small, disableAnimation }) => (
  <div
    className={cx(styles.logo, {
      [styles.small]: small,
      [styles.noAnimation]: disableAnimation
    })}
  >
    <img
      width="246px"
      height="48px"
      src="/images/logo.svg"
      alt="Time Enna - Timezone Converter - Logo"
    />
  </div>
);

export default Logo;

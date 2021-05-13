import cx from 'classnames';
import { format, getHours, isSameHour } from 'date-fns';
import { useRecoilValue } from 'recoil';

import { is24HourState } from '../../atoms';
import { timePixelMap } from '../../config';
import styles from '../../styles/timeline/Hour.module.css';

const Hour = ({ date, currentZonedTime }) => {
  const is24Hour = useRecoilValue(is24HourState);

  const readableDate = format(date, 'do MMM');
  const readableHour = is24Hour ? format(date, 'H:mm') : format(date, 'h a');

  const isNewDay = format(date, 'H') === '0';
  const isCurrentHour = isSameHour(date, currentZonedTime);
  const isBusinessHour = getHours(date) >= 10 && getHours(date) <= 18;
  const isStartOfWorkDay = getHours(date) === 10;
  const isEndOfWorkDay = getHours(date) === 18;

  return (
    <div
      style={{ width: timePixelMap['1h'] }}
      className={cx(styles.hour, {
        [styles.current]: isCurrentHour,
        [styles.business]: isBusinessHour
      })}
    >
      {isCurrentHour && <span className={cx(styles.label)}>Current Time</span>}
      {isStartOfWorkDay && <span className={cx(styles.label)}>Start of Work Day</span>}
      {isEndOfWorkDay && <span className={cx(styles.labelAlt)}>End of Work Day</span>}
      {isNewDay && `${readableDate}, `}
      {readableHour}
    </div>
  );
};

export default Hour;

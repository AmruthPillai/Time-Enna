import cx from 'classnames';
import { format, getHours, getMinutes, isSameHour } from 'date-fns';
import { useRecoilValue } from 'recoil';

import { is24HourState } from '../../atoms';
import { timePixelMap } from '../../config';
import styles from '../../styles/timeline/Hour.module.css';

const Hour = ({ date, currentZonedTime }) => {
  const is24Hour = useRecoilValue(is24HourState);

  const readableDate = format(date, 'do MMM');
  const readableHour = is24Hour ? format(date, 'H:mm') : format(date, 'h a');

  const isNewDay = getHours(date) === 0;
  const isBusinessHour = getHours(date) >= 10 && getHours(date) <= 18;
  const isStartOfWorkDay = getHours(date) === 10;
  const isEndOfWorkDay = getHours(date) === 18;
  const isCurrentHour = isSameHour(date, currentZonedTime);
  const currentHourInMinutePixels = timePixelMap['1m'] * getMinutes(currentZonedTime);

  return (
    <div
      style={{ width: timePixelMap['1h'] }}
      className={cx(styles.hour, {
        [styles.current]: isCurrentHour,
        [styles.business]: isBusinessHour
      })}
    >
      {isCurrentHour && (
        <>
          <div
            className={cx(styles.indicator)}
            style={{ left: `${currentHourInMinutePixels}px` }}
          />
          <span className={cx(styles.label)} style={{ left: `${currentHourInMinutePixels + 8}px` }}>
            Current Time
          </span>
        </>
      )}
      {!isCurrentHour && isNewDay && (
        <>
          <div className={cx(styles.indicator)} />
          <span className={cx(styles.label)}>New Day</span>
        </>
      )}
      {!isCurrentHour && isStartOfWorkDay && (
        <>
          <div className={cx(styles.indicator)} />
          <span className={cx(styles.label)}>Start of Work Day</span>
        </>
      )}
      {!isCurrentHour && isEndOfWorkDay && (
        <>
          <div className={cx(styles.indicator, styles.right)} />
          <span className={cx(styles.label, styles.right)}>End of Work Day</span>
        </>
      )}
      {isNewDay && `${readableDate}, `}
      {readableHour}
    </div>
  );
};

export default Hour;

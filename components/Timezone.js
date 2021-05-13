import cx from 'classnames';
import { format, getHours, isSameHour } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsMoon } from 'react-icons/bs';

import { maxPixels, timePixelMap } from '../config';
import { DELETE_TIMEZONE } from '../config/actions';
import { AppContext } from '../context/AppContext';
import styles from '../styles/Timezone.module.css';
import {
  epochToTimestamp,
  getHoursFromStartToEnd,
  timestampToPixels
} from '../utils';
import Button from './Button';

const Timezone = ({ id, timezone, sliderRef }) => {
  const [isHovered, setHovered] = useState(false);

  const { state, dispatch } = useContext(AppContext);
  const { is24Hour, cursorTime, startDate, endDate } = state;

  const currentZonedTime = utcToZonedTime(new Date(), timezone);
  const zonedTime = useMemo(
    () => utcToZonedTime(cursorTime, timezone),
    [cursorTime, timezone]
  );

  useEffect(() => {
    if (!isHovered) {
      sliderRef.scrollLeft = timestampToPixels(zonedTime, startDate);
    }
  }, [isHovered, sliderRef, zonedTime, startDate]);

  const onScroll = () => {
    dispatch({
      type: 'UPDATE_TIME_BY_MINUTES',
      payload: {
        timezone,
        minutes: sliderRef.scrollLeft / timePixelMap['1m']
      }
    });
  };

  const onDeleteTimezone = () =>
    dispatch({
      type: DELETE_TIMEZONE,
      payload: { id }
    });

  const TimeDisplay = () => {
    const isNight =
      (format(zonedTime, 'H') >= 0 && format(zonedTime, 'H') <= 6) ||
      (format(zonedTime, 'H') >= 19 && format(zonedTime, 'H') <= 23);

    return (
      <div className={cx(styles.display)}>
        <div className={cx(styles.left)}>
          <h4>{timezone}</h4>
          <h2>
            {is24Hour
              ? `${format(zonedTime, 'HH')}:${format(zonedTime, 'mm')}`
              : `${format(zonedTime, 'hh')}:${format(zonedTime, 'mm')} ${format(
                  zonedTime,
                  'a'
                )}`}
            {isNight && <BsMoon />}
          </h2>
          <h6>{epochToTimestamp(zonedTime).date}</h6>
        </div>

        <div className={cx(styles.right)}>
          <Button
            thin
            icon={AiOutlineDelete}
            tooltip="Delete Timezone"
            onClick={onDeleteTimezone}
            className="text-red-600"
          />
        </div>
      </div>
    );
  };

  const Hour = ({ date }) => {
    const readableDate = format(date, 'do MMM');
    const readableHour = is24Hour ? format(date, 'H:mm') : format(date, 'h a');

    const isNewDay = format(date, 'H') === '0';
    const isCurrentHour = isSameHour(date, currentZonedTime);
    const isBusinessHour = getHours(date) >= 10 && getHours(date) <= 18;

    return (
      <div
        className={cx(styles.hour, {
          [styles.current]: isCurrentHour,
          [styles.business]: isBusinessHour
        })}
        style={{
          width: timePixelMap['1h']
        }}
      >
        {isCurrentHour && (
          <span className={cx(styles.label)}>Current Time</span>
        )}
        {isNewDay && `${readableDate}, `}
        {readableHour}
      </div>
    );
  };

  return (
    <div className={cx(styles.timezone)}>
      <TimeDisplay />

      <div
        onScroll={onScroll}
        ref={el => (sliderRef = el)}
        className={cx(styles.scroller)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onTouchStart={() => setHovered(true)}
        onTouchEnd={() => setHovered(false)}
      >
        <div style={{ minWidth: maxPixels }} className="flex items-center">
          {getHoursFromStartToEnd(startDate, endDate).map(date => (
            <Hour key={date} date={date} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timezone;

import cx from 'classnames';
import { format, getHours, set } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsMoon } from 'react-icons/bs';
import { RiDirectionLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { cursorTimestampState, is24HourState, timezonesState } from '../../atoms';
import styles from '../../styles/timeline/TimeDisplay.module.css';
import { epochToTimestamp, handleKeyPress } from '../../utils';
import Button from '../Button';

const TimeDisplay = ({ zonedTime, timezone }) => {
  const is24Hour = useRecoilValue(is24HourState);
  const [timezones, setTimezones] = useRecoilState(timezonesState);
  const setCursorTimestamp = useSetRecoilState(cursorTimestampState);

  const hour = getHours(zonedTime);
  const isDay = hour >= 7 && hour <= 18;
  const [HH, hh, mm, a] = [
    format(zonedTime, 'HH'),
    format(zonedTime, 'hh'),
    format(zonedTime, 'mm'),
    format(zonedTime, 'a')
  ];

  const [isEditMode, setEditMode] = useState(false);
  const [timeToJump, setTimeToJump] = useState(`${HH}:${mm}`);

  const toggleEditMode = () => {
    setTimeToJump(`${HH}:${mm}`);

    if (isEditMode) {
      if (timeToJump.match('([01]?[0-9]|2[0-3]):[0-5][0-9]')) {
        const [hours, minutes] = timeToJump.split(':');
        const newTime = set(zonedTime, { hours, minutes });
        setCursorTimestamp(zonedTimeToUtc(newTime, timezone));
        setEditMode(false);
      } else {
        toast.dark(
          'It looks like you entered a wrong format of time. Try something like 06:30 or 23:10 instead.'
        );
        setEditMode(false);
      }
    } else {
      setEditMode(true);
    }
  };

  const handleDeleteTimezone = () => {
    const tempTimezones = timezones.filter(tz => tz !== timezone);
    if (tempTimezones.length > 0) {
      setTimezones(tempTimezones);
    } else {
      toast.dark('You might not want to remove the last timezone. Maybe add some more instead?');
    }
  };

  return (
    <div className={cx(styles.display)}>
      <div className={cx(styles.left)}>
        <h1>{timezone}</h1>
        {isEditMode ? (
          <h2>
            <input
              type="text"
              value={timeToJump}
              onChange={e => setTimeToJump(e.target.value)}
              onKeyPress={e => handleKeyPress(e, toggleEditMode)}
            />
          </h2>
        ) : (
          <h2>
            {is24Hour ? `${HH}:${mm}` : `${hh}:${mm} ${a}`}
            {!isDay && <BsMoon data-tip="It's Night Time!" data-place="right" />}
          </h2>
        )}
        <h3>{epochToTimestamp(zonedTime).date}</h3>
      </div>

      <div className={cx(styles.right)}>
        <Button
          thin
          icon={RiDirectionLine}
          ariaLabel="Jump to Time"
          onClick={toggleEditMode}
          tooltip="Jump to Time"
          tooltipPosition="left"
        />

        <Button
          thin
          icon={AiOutlineDelete}
          className="text-red-500"
          ariaLabel="Delete Timezone"
          onClick={handleDeleteTimezone}
          tooltip="Delete Timezone"
          tooltipPosition="left"
        />
      </div>
    </div>
  );
};

export default TimeDisplay;

import cx from 'classnames';
import { format, getHours } from 'date-fns';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsMoon } from 'react-icons/bs';
import { useRecoilState, useRecoilValue } from 'recoil';

import { is24HourState, timezonesState } from '../../atoms';
import styles from '../../styles/timeline/TimeDisplay.module.css';
import { epochToTimestamp } from '../../utils';
import Button from '../Button';

const TimeDisplay = ({ zonedTime, timezone }) => {
  const is24Hour = useRecoilValue(is24HourState);
  const [timezones, setTimezones] = useRecoilState(timezonesState);

  const hour = getHours(zonedTime);
  const isDay = hour >= 7 && hour <= 18;
  const [HH, hh, mm, a] = [
    format(zonedTime, 'HH'),
    format(zonedTime, 'hh'),
    format(zonedTime, 'mm'),
    format(zonedTime, 'a')
  ];

  const handleDeleteTimezone = () => {
    setTimezones(timezones.filter(tz => tz !== timezone));
  };

  return (
    <div className={cx(styles.display)}>
      <div className={cx(styles.left)}>
        <h1>{timezone}</h1>
        <h2>
          {is24Hour ? `${HH}:${mm}` : `${hh}:${mm} ${a}`}
          {!isDay && <BsMoon />}
        </h2>
        <h3>{epochToTimestamp(zonedTime).date}</h3>
      </div>

      <div className={cx(styles.right)}>
        <Button
          thin
          icon={AiOutlineDelete}
          tooltip="Delete Timezone"
          className="text-red-500"
          ariaLabel="Delete Timezone"
          onClick={handleDeleteTimezone}
        />
      </div>
    </div>
  );
};

export default TimeDisplay;

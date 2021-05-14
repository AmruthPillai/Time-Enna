import cx from 'classnames';
import { BiReset } from 'react-icons/bi';
import { MdAlarmAdd, MdInfoOutline } from 'react-icons/md';
import { Ri24HoursFill } from 'react-icons/ri';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import {
  aboutModalOpenState,
  addTimezoneModalState,
  cursorTimestampState,
  is24HourState,
  timezonesState
} from '../atoms';
import Button from '../components/Button';
import Logo from '../components/Logo';
import Timeline from '../components/Timeline';
import AboutTimeEnna from '../modals/AboutTimeEnna';
import AddTimezoneModal from '../modals/AddTimezone';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [is24Hour, set24Hour] = useRecoilState(is24HourState);
  const toggle24Hour = () => set24Hour(!is24Hour);

  const timezones = useRecoilValue(timezonesState);
  const setAboutModalOpen = useSetRecoilState(aboutModalOpenState);
  const setAddTimezoneModalOpen = useSetRecoilState(addTimezoneModalState);
  const resetCursorTimestamp = useResetRecoilState(cursorTimestampState);

  return (
    <div className={cx(styles.container)}>
      <div className="flex justify-between">
        <Logo />

        <div className="flex items-center">
          <Button
            thin
            className="ml-2"
            icon={BiReset}
            onClick={resetCursorTimestamp}
            ariaLabel="Reset to Current Time"
            tooltip="Reset to Current Time"
            tooltipPosition="left"
          />
          <Button
            thin
            className="ml-2"
            icon={Ri24HoursFill}
            onClick={toggle24Hour}
            ariaLabel="Toggle 24 Hour Display"
            tooltip="Toggle 24 Hour Display"
            tooltipPosition="left"
          />
          <Button
            thin
            className="ml-2"
            icon={MdInfoOutline}
            onClick={() => setAboutModalOpen(true)}
            ariaLabel="About Time Enna"
            tooltip="About Time Enna"
            tooltipPosition="left"
          />
        </div>
      </div>

      <div>
        {timezones.map(timezone => (
          <Timeline key={timezone} timezone={timezone} />
        ))}
      </div>

      <div className="mt-12">
        <Button icon={MdAlarmAdd} onClick={() => setAddTimezoneModalOpen(true)}>
          Add Timezone
        </Button>
      </div>

      <AboutTimeEnna />
      <AddTimezoneModal />
    </div>
  );
};

export default Home;

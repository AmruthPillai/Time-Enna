import cx from 'classnames';
import { useContext, useState } from 'react';
import { BiReset } from 'react-icons/bi';
import { MdAlarmAdd, MdInfoOutline } from 'react-icons/md';
import { Ri24HoursFill } from 'react-icons/ri';

import Button from '../components/Button';
import Logo from '../components/Logo';
import Timezone from '../components/Timezone';
import {
  RESET_CURSOR_TO_CURRENT,
  TOGGLE_24_HOUR_DISPLAY
} from '../config/actions';
import { AppContext } from '../context/AppContext';
import AboutTimeEnna from '../modals/AboutTimeEnna';
import AddTimezoneModal from '../modals/AddTimezone';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [isAboutModalOpen, setAboutModalOpen] = useState(false);
  const [isAddTimezoneModalOpen, setAddTimezoneModalOpen] = useState(false);

  const { state, dispatch } = useContext(AppContext);
  const { timezones } = state;

  const onToggle24Hour = () => dispatch({ type: TOGGLE_24_HOUR_DISPLAY });
  const onResetTime = () => dispatch({ type: RESET_CURSOR_TO_CURRENT });

  return (
    <div className={cx(styles.container)}>
      <div className="flex justify-between">
        <Logo />

        <div className="flex items-center">
          <Button
            thin
            className="ml-2"
            icon={BiReset}
            onClick={onResetTime}
            tooltip="Reset to Current Time"
          />
          <Button
            thin
            className="ml-2"
            icon={Ri24HoursFill}
            onClick={onToggle24Hour}
            tooltip="Toggle 24 Hour Display"
          />
          <Button
            thin
            className="ml-2"
            icon={MdInfoOutline}
            onClick={() => setAboutModalOpen(true)}
            tooltip="About Time:Enna"
          />
          <AboutTimeEnna
            isOpen={isAboutModalOpen}
            setOpen={setAboutModalOpen}
          />
        </div>
      </div>

      {timezones.map(({ id, ref, timezone }) => (
        <Timezone key={id} id={id} timezone={timezone} sliderRef={ref} />
      ))}

      <div className="mt-8">
        <Button icon={MdAlarmAdd} onClick={() => setAddTimezoneModalOpen(true)}>
          Add Timezone
        </Button>

        <AddTimezoneModal
          isOpen={isAddTimezoneModalOpen}
          setOpen={setAddTimezoneModalOpen}
        />
      </div>
    </div>
  );
};

export default Home;

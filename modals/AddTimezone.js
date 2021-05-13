import cx from 'classnames';
import Fuse from 'fuse.js';
import { useEffect, useMemo, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { useRecoilState } from 'recoil';

import { addTimezoneModalState, timezonesState } from '../atoms';
import Modal from '../components/Modal';
import timezoneList from '../config/timezones';
import styles from '../styles/modals/AddTimezone.module.css';
import { handleKeyPress } from '../utils';

const AddTimezoneModal = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timezoneResults, setTimezoneResults] = useState(timezoneList);

  const [timezones, setTimezones] = useRecoilState(timezonesState);
  const [isOpen, setOpen] = useRecoilState(addTimezoneModalState);

  const fuzzyTimezoneList = useMemo(() => new Fuse(timezoneList), []);

  useEffect(
    () => setTimezoneResults(fuzzyTimezoneList.search(searchTerm)),
    [fuzzyTimezoneList, searchTerm]
  );

  const handleClose = () => {
    setSearchTerm('');
    setOpen(false);
  };

  const handleSelect = timezone => {
    setTimezones([...timezones, timezone]);
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className={styles.modal}>
      <div className={cx(styles.search)}>
        <MdSearch />
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <ul role="menu" className={cx(styles.timezoneList)}>
        {searchTerm
          ? timezoneResults.map(({ item }) => (
              <li
                key={item}
                tabIndex="0"
                role="menuitem"
                onClick={() => handleSelect(item)}
                onKeyPress={e => handleKeyPress(e, () => handleSelect(item))}
              >
                {item}
              </li>
            ))
          : timezoneList.map(timezone => (
              <li
                key={timezone}
                tabIndex="0"
                role="menuitem"
                onClick={() => handleSelect(timezone)}
                onKeyPress={e => handleKeyPress(e, () => handleSelect(timezone))}
              >
                {timezone}
              </li>
            ))}
      </ul>
    </Modal>
  );
};

export default AddTimezoneModal;

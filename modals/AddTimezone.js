import cx from 'classnames';
import Fuse from 'fuse.js';
import { useContext, useEffect, useMemo, useState } from 'react';
import { MdSearch } from 'react-icons/md';

import Modal from '../components/Modal';
import timezoneList from '../config/timezones';
import { AppContext } from '../context/AppContext';
import styles from '../styles/modals/AddTimezone.module.css';

const AddTimezoneModal = ({ isOpen, setOpen }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timezoneResults, setTimezoneResults] = useState(timezoneList);

  const { addTimezone } = useContext(AppContext);

  const fuzzyTimezoneList = useMemo(() => new Fuse(timezoneList), []);

  useEffect(
    () => setTimezoneResults(fuzzyTimezoneList.search(searchTerm)),
    [fuzzyTimezoneList, searchTerm]
  );

  const onClose = () => {
    setSearchTerm('');
    setOpen(false);
  };

  const onSelect = timezone => {
    addTimezone(timezone);
    onClose();
  };

  const onKeyPress = (e, timezone) => {
    if (e.key === 'Enter') {
      onSelect(timezone);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={styles.modal}>
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
                onClick={() => onSelect(item)}
                onKeyPress={e => onKeyPress(e, item)}
              >
                {item}
              </li>
            ))
          : timezoneList.map(timezone => (
              <li
                key={timezone}
                tabIndex="0"
                role="menuitem"
                onClick={() => onSelect(timezone)}
                onKeyPress={e => onKeyPress(e, timezone)}
              >
                {timezone}
              </li>
            ))}
      </ul>
    </Modal>
  );
};

export default AddTimezoneModal;

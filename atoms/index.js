import { endOfTomorrow, startOfYesterday } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { uniq } from 'lodash';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const localTimezone =
  Intl.DateTimeFormat().resolvedOptions().timeZone || 'Universal Coordinated Time';

const defaultTimezones = [
  'Universal Coordinated Time',
  localTimezone,
  'Asia/Calcutta',
  'Europe/Berlin',
  'America/New_York'
];

const { persistAtom } = recoilPersist();

export const is24HourState = atom({
  key: 'is24Hour',
  default: false,
  effects_UNSTABLE: [persistAtom]
});

export const startEndDateState = atom({
  key: 'startEndDate',
  default: [startOfYesterday(new Date()), endOfTomorrow(new Date())]
});

export const cursorTimestampState = atom({
  key: 'cursorTimestamp',
  default: zonedTimeToUtc(new Date(), localTimezone)
});

export const aboutModalOpenState = atom({
  key: 'aboutModal',
  default: false
});

export const addTimezoneModalState = atom({
  key: 'addTimezoneModal',
  default: false
});

export const timezonesState = atom({
  key: 'timezones',
  default: uniq(defaultTimezones),
  effects_UNSTABLE: [persistAtom]
});

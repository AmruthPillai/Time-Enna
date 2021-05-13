import { endOfTomorrow, startOfYesterday } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const localTimezone =
  Intl.DateTimeFormat().resolvedOptions().timeZone || 'Universal Coordinated Time';

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
  default: [localTimezone],
  effects_UNSTABLE: [persistAtom]
});

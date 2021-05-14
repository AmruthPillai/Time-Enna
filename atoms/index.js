import { endOfTomorrow, startOfYesterday } from 'date-fns';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'timeenna-persist'
});

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
  default: new Date()
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
  default: ['Universal Coordinated Time'],
  effects_UNSTABLE: [persistAtom]
});

import { addMinutes, endOfTomorrow, startOfYesterday } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { createContext, createRef, useEffect, useReducer, useRef } from 'react';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import { v4 as uuidv4 } from 'uuid';

import {
  ADD_TIMEZONE,
  DELETE_TIMEZONE,
  RESET_CURSOR_TO_CURRENT,
  TOGGLE_24_HOUR_DISPLAY,
  UPDATE_TIME_BY_MINUTES
} from '../config/actions';

const initialState = {
  is24Hour: false,
  cursorTime: new Date(),
  currentTime: new Date(),
  startDate: startOfYesterday(new Date()),
  endDate: endOfTomorrow(new Date()),
  timezones: []
};

const reducer = (state = initialState, { type, payload }) => {
  const tempState = { ...state };

  const addTimezone = () => {
    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timezonesArr = state.timezones.map(tz => tz.timezone);
    const { timezone, timezoneRefs } = payload;

    if (timezone === localTimezone && timezonesArr.includes(localTimezone)) {
      return state;
    }

    if (timezonesArr.includes(timezone)) {
      toast.dark(
        "The timezone you're looking to add already exists in the list.",
        { toastId: 'toast-timezone-already-exists' }
      );

      return state;
    }

    tempState.timezones.push({
      timezone,
      id: uuidv4(),
      ref: timezoneRefs.current[tempState.timezones.length]
    });

    return tempState;
  };

  const deleteTimezone = () => {
    const { id } = payload;

    if (tempState.timezones.length <= 1) {
      toast.dark(
        "You wouldn't want to delete the last timezone. Try adding one instead?",
        { toastId: 'toast-delete-timezone' }
      );

      return state;
    }

    tempState.timezones = tempState.timezones.filter(tz => tz.id !== id);

    return tempState;
  };

  const toggle24HourDisplay = () => {
    tempState.is24Hour = !tempState.is24Hour;

    return tempState;
  };

  const resetCursorToCurrent = () => {
    tempState.currentTime = new Date();
    tempState.startDate = startOfYesterday(new Date());
    tempState.endDate = endOfTomorrow(new Date());
    tempState.cursorTime = tempState.currentTime;

    return tempState;
  };

  const updateTimeByMinutes = () => {
    const { timezone, minutes } = payload;

    tempState.cursorTime = zonedTimeToUtc(
      addMinutes(tempState.startDate, minutes),
      timezone
    );

    return tempState;
  };

  const reducerMap = {
    [ADD_TIMEZONE]: addTimezone,
    [DELETE_TIMEZONE]: deleteTimezone,
    [TOGGLE_24_HOUR_DISPLAY]: toggle24HourDisplay,
    [UPDATE_TIME_BY_MINUTES]: updateTimeByMinutes,
    [RESET_CURSOR_TO_CURRENT]: resetCursorToCurrent,
    default: () => state
  };

  return (reducerMap[type] || reducerMap.default)();
};

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const timezoneRefs = useRef([]);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Initialize refs to attach to each timezone
    [...Array(10).keys()].forEach((_, index) => {
      timezoneRefs.current[index] = createRef();
    });

    // Get local timezone and add to the list on page load
    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    dispatch({
      type: ADD_TIMEZONE,
      payload: {
        timezone: localTimezone,
        timezoneRefs
      }
    });

    // Get local storage config on page load and add timezones, if available
    const localStoreTimezones =
      JSON.parse(localStorage.getItem('timezones')) || [];
    localStoreTimezones.forEach(timezone => {
      dispatch({
        type: ADD_TIMEZONE,
        payload: {
          timezone,
          timezoneRefs
        }
      });
    });
  }, []);

  // Store timezone to local storage when there is a new one added
  useEffect(() => {
    if (state.timezones.length > 0) {
      const timezones = state.timezones.map(tz => tz.timezone);
      localStorage.setItem('timezones', JSON.stringify(timezones));
    }
  }, [state]);

  // Wrapper around adding timezones, as there is a dependency on timezoneRefs
  const addTimezone = timezone => {
    dispatch({
      type: ADD_TIMEZONE,
      payload: {
        timezone,
        timezoneRefs
      }
    });

    ReactTooltip.rebuild();
  };

  return (
    <AppContext.Provider value={{ state, dispatch, addTimezone }}>
      {children}
    </AppContext.Provider>
  );
};

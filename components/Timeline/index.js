import cx from 'classnames';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import isFunction from 'lodash/isFunction';
import { useEffect, useMemo, useRef } from 'react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { useRecoilValue } from 'recoil';

import { cursorTimestampState, startEndDateState } from '../../atoms';
import { useDebouncedRecoilState } from '../../hooks';
import styles from '../../styles/timeline/Timeline.module.css';
import { getHoursFromStartToEnd, pixelsToTimestamp, timestampToPixels } from '../../utils';
import Hour from './Hour';
import TimeDisplay from './TimeDisplay';

const Timeline = ({ timezone }) => {
  const scrollRef = useRef(null);

  const [cursorTimestamp, setCursorTimestamp] = useDebouncedRecoilState(cursorTimestampState);
  const [startDate, endDate] = useRecoilValue(startEndDateState);

  const currentZonedTime = useMemo(() => utcToZonedTime(new Date(), timezone), [timezone]);
  const zonedTime = useMemo(
    () => utcToZonedTime(cursorTimestamp, timezone),
    [cursorTimestamp, timezone]
  );

  const handleScroll = ({ positionX }) => {
    const currentCursorTimestamp = pixelsToTimestamp(Math.abs(positionX), startDate);
    const utcTimestamp = zonedTimeToUtc(currentCursorTimestamp, timezone);
    setCursorTimestamp(utcTimestamp);
  };

  useEffect(() => {
    if (isFunction(scrollRef.current.context.dispatch.setPositionX)) {
      const pixelsToMove = timestampToPixels(zonedTime, startDate);
      scrollRef.current.context.dispatch.setPositionX(-Math.abs(pixelsToMove));
    }
  }, [zonedTime, startDate]);

  return (
    <div className={cx(styles.timeline)}>
      <TimeDisplay zonedTime={zonedTime} timezone={timezone} />

      <div className={cx(styles.scroller)}>
        <TransformWrapper
          onPanning={handleScroll}
          pan={{ lockAxisY: true }}
          wheel={{ disabled: true }}
          doubleClick={{ disabled: true }}
          options={{ limitToBounds: false }}
          defaultPositionX={-Math.abs(timestampToPixels(zonedTime, startDate))}
        >
          <TransformComponent ref={scrollRef}>
            <div className="h-28 flex items-center">
              {getHoursFromStartToEnd(startDate, endDate).map(date => (
                <Hour key={date} date={date} currentZonedTime={currentZonedTime} />
              ))}
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
    </div>
  );
};

export default Timeline;

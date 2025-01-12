import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { RootState } from '../../redux/store';
import { updateClock } from '../../redux/timezoneSlice';
import ClockVisual from '../../components/ClockVisual/ClockVisual';
import { TIMEZONE_OPTIONS } from '../../constants/timezones.const';
import { PagesRoutes } from '../../constants/pages.enum';
import ClockSelector from './ClockSelector';
import { Timezone } from '../../types/timezone.types';
import useResponsiveSize from '../../utils/useResponsiveSize ';
import ClockList from './ClockList';
import {
  getFormattedTime,
  getLocalTimezone,
} from '../../utils/getFormattedTime';
import Location from '/location.svg';
import { LocationIcon } from '../Clock/Clock.styles';
import {
  BackIcon,
  CityLabel,
  ClockContainer,
  ClocksWrapper,
  clockVariants,
  CurrentTimeLabel,
  locationIconVariants,
  MotionClockContainer,
  MotionLabelContainer,
  Wrapper,
} from './EditClock.styles';

const EditClock = () => {
  // get index from route
  const { id } = useParams<{ id: string }>();

  const clocks = useSelector((state: RootState) => state.timezones.clocks);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const localTimezone = getLocalTimezone();

  // if index exist and index is number, set it as selectedIndex. If not, set it to 0
  const [selectedIndex, setSelectedIndex] = useState<number>(
    id && !isNaN(Number(id)) ? Number(id) : 0
  );
  const [currentTime, setCurrentTime] = useState('');
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const { isTablet, isMobile } = useResponsiveSize();

  const selectedClock = clocks[selectedIndex];

  useEffect(() => {
    const updateTime = () => {
      const now = getFormattedTime(selectedClock.timezone);
      setCurrentTime(now);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);

    return () => clearInterval(interval);
  }, [selectedClock]);

  const handlePreviousPage = () => {
    navigate(PagesRoutes.CLOCK);
  };

  const handleTimezoneChange = (value: string) => {
    const selectedOption = JSON.parse(value) as Timezone;
    dispatch(updateClock({ index: selectedIndex, timezone: selectedOption }));
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX !== null) {
      const swipeDistance = touchStartX - e.changedTouches[0].clientX;

      // determine swipe direction
      if (swipeDistance > 50 && selectedIndex < clocks.length - 1) {
        // swipe left - next clock
        setSelectedIndex(selectedIndex + 1);
      } else if (swipeDistance < -50 && selectedIndex > 0) {
        // swipe right - previous clock
        setSelectedIndex(selectedIndex - 1);
      }
    }

    // reset touch start
    setTouchStartX(null);
  };

  return (
    <Wrapper>
      <BackIcon icon={faArrowLeft} size='xl' onClick={handlePreviousPage} />

      <ClocksWrapper
        selectedIndex={selectedIndex}
        clocksNumber={clocks.length}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {clocks.map((clock, index) => {
          const isCurrentTimezone = clock.timezone === localTimezone;

          return (
            <ClockContainer
              key={clock.label + index}
              onClick={() => setSelectedIndex(index)}
              isSelected={index === selectedIndex}
            >
              {isCurrentTimezone && (
                <LocationIcon
                  src={Location}
                  alt='location'
                  variants={locationIconVariants}
                  initial='initial'
                  animate={index === selectedIndex ? 'selected' : 'unselected'}
                  exit='exit'
                />
              )}
              <MotionClockContainer
                key={clock.label + index}
                variants={clockVariants}
                initial='unselected'
                animate={index === selectedIndex ? 'selected' : 'unselected'}
                exit='exit'
                transition={{ duration: 0.5 }}
              >
                <ClockVisual
                  timezone={clock.timezone}
                  city={clock.label}
                  latitude={clock.latitude}
                  longitude={clock.longitude}
                  isCurrentTimezone={isCurrentTimezone}
                />
              </MotionClockContainer>
            </ClockContainer>
          );
        })}
      </ClocksWrapper>

      <MotionLabelContainer
        key={selectedClock.label}
        variants={theme.defaultMotionAnimation}
        initial='initial'
        animate='animate'
        exit='exit'
      >
        <CurrentTimeLabel>{currentTime}</CurrentTimeLabel>
        <CityLabel>{selectedClock.label}</CityLabel>
      </MotionLabelContainer>
      {isTablet || isMobile ? (
        <ClockSelector
          selectedClock={selectedClock}
          options={TIMEZONE_OPTIONS}
          onChange={handleTimezoneChange}
        />
      ) : (
        <ClockList
          selectedClock={selectedClock}
          handleTimezoneChange={handleTimezoneChange}
          selectedIndex={selectedIndex}
        />
      )}
    </Wrapper>
  );
};

export default EditClock;

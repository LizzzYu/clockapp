import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import { Breakpoints } from '../../constants/breakpoints.enum';
import { getFormattedTime } from '../../utils/getFormattedTime';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  ${({ theme }) => theme.mixins.flexCenter}
  flex-direction: column;
  overflow: hidden;
  padding: 0 53px;
  margin-bottom: 40vh;
`;

const ClocksWrapper = styled.div<{
  selectedIndex: number;
  clocksNumber: number;
}>`
  display: flex;
  align-items: center;
  width: ${({ clocksNumber }) => `calc(240px * ${clocksNumber})`};
  transition: transform 0.5s ease-in-out;
  transform: ${({ selectedIndex }) =>
    `translateX(calc(50% - ${selectedIndex} * 240px - 120px))`};
`;

const ClockContainer = styled.div<{ isSelected: boolean }>`
  flex: 0 0 auto;
  width: 240px;
  height: 240px;
  ${({ theme }) => theme.mixins.flexCenter}
  position: relative;
  cursor: pointer;

  transform: scale(${({ isSelected }) => (isSelected ? 1 : 0.75)});
  transition: transform 0.5s ease-in-out;
`;

const CurrentTimeLabel = styled.h2`
  margin: 0;
  font-size: 40px;
  line-height: 40px;
  text-align: center;

  ${({ theme }) => css`
    padding-top: ${theme.spacing(5)};
    color: ${theme.colors.white};

    ${theme.mediaQuery(Breakpoints.Desktop)} {
      padding-top: ${theme.spacing(3)};
    }
  `};
`;

const CityLabel = styled.h2`
  margin: 0;
  font-size: 18px;
  line-height: 18px;
  text-align: center;
  font-weight: 300;

  ${({ theme }) => css`
    padding-top: ${theme.spacing(1)};
    color: ${theme.colors.green};
  `}
`;

const BackIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 40px;
  left: 24px;

  &:hover {
    cursor: pointer;
  }

  ${({ theme }) => theme.mediaQuery(Breakpoints.Desktop)} {
    left: 20%;
  }
`;

const MotionClockContainer = styled(motion.div)`
  flex: 0 0 auto;
  width: 240px;
  height: 240px;
  ${({ theme }) => theme.mixins.flexCenter}
  position: relative;
  cursor: pointer;
`;

const MotionLabelContainer = styled(motion.div)``;

const clockVariants = {
  selected: { scale: 1, opacity: 1 },
  unselected: { scale: 1, opacity: 0.5 },
  exit: { opacity: 0, scale: 0.8 },
};

const EditClock = () => {
  // get index from route
  const { id } = useParams<{ id: string }>();

  const clocks = useSelector((state: RootState) => state.timezones.clocks);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  // if index exist and index is number, set it as selectedIndex. If not, set it to 0
  const [selectedIndex, setSelectedIndex] = useState<number>(
    id && !isNaN(Number(id)) ? Number(id) : 0
  );
  const [currentTime, setCurrentTime] = useState('');

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

  return (
    <Wrapper>
      <BackIcon icon={faArrowLeft} size='xl' onClick={handlePreviousPage} />

      <ClocksWrapper selectedIndex={selectedIndex} clocksNumber={clocks.length}>
        {clocks.map((clock, index) => (
          <ClockContainer
            key={clock.label + index}
            onClick={() => setSelectedIndex(index)}
            isSelected={index === selectedIndex}
          >
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
              />
            </MotionClockContainer>
          </ClockContainer>
        ))}
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
        />
      )}
    </Wrapper>
  );
};

export default EditClock;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { RootState } from '../../redux/store';
import { logoutAction } from '../../redux/authSlice';
import useResponsiveSize from '../../utils/useResponsiveSize ';
import ClockVisual from '../../components/ClockVisual/ClockVisual';
import Button from '../../components/Button/Button';
import { PagesRoutes } from '../../constants/pages.enum';
import { getFormattedTime, getLocalTimezone } from '../../utils/timezoneUtils';
import Location from '/location.svg';
import {
  ButtonWrapper,
  CityLabel,
  ClocksWrapper,
  ClockWrapper,
  EditIcon,
  LabelsContainer,
  LocationIcon,
  locationIconVariants,
  TimeLabel,
  Wrapper,
} from './Clock.styles';

const Clock = () => {
  const clocks = useSelector((state: RootState) => state.timezones.clocks);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isTablet, isMobile } = useResponsiveSize();

  const localTimezone = getLocalTimezone();

  const [currentTimes, setCurrentTimes] = useState(() =>
    clocks.map((clock) => ({
      label: clock.label,
      time: getFormattedTime(clock.timezone),
    }))
  );

  useEffect(() => {
    const updateTimes = () => {
      setCurrentTimes(() =>
        clocks.map((clock) => ({
          label: clock.label,
          time: getFormattedTime(clock.timezone),
        }))
      );
    };

    updateTimes();

    // update every 10 seconds
    const interval = setInterval(updateTimes, 10000);

    return () => clearInterval(interval);
  }, [clocks]);

  const handleEdit = (index: number) => {
    navigate(`${PagesRoutes.EDIT_CLOCK}/${index}`);
  };

  const handleLogout = () => {
    dispatch(logoutAction());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate(PagesRoutes.MAIN);
  };

  return (
    <Wrapper>
      <ClocksWrapper>
        <AnimatePresence>
          <EditIcon
            icon={faPenToSquare}
            size='xl'
            onClick={() => handleEdit(0)}
          />
          {clocks.map((clock, index) => {
            const clockTime = currentTimes.find(
              (t) => t.label === clock.label
            )?.time;

            const isCurrentTimezone = clock.timezone === localTimezone;

            return (
              <ClockWrapper
                key={`${clock.label}-${index}`}
                onClick={() => handleEdit(index)}
              >
                {isCurrentTimezone && (
                  <LocationIcon
                    src={Location}
                    alt='location'
                    variants={locationIconVariants}
                    initial='initial'
                    animate='animate'
                  />
                )}
                <ClockVisual
                  timezone={clock.timezone}
                  city={clock.label}
                  latitude={clock.latitude}
                  longitude={clock.longitude}
                  size={!isMobile ? 300 : 240}
                  isCurrentTimezone={isCurrentTimezone}
                />
                {!isMobile && (
                  <LabelsContainer>
                    <TimeLabel>{clockTime}</TimeLabel>
                    <CityLabel>{clock.label}</CityLabel>
                  </LabelsContainer>
                )}
              </ClockWrapper>
            );
          })}
        </AnimatePresence>
      </ClocksWrapper>
      <ButtonWrapper>
        <Button
          paddingTop={isMobile || isTablet ? 40 : 120}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default Clock;

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { RootState } from '../../redux/store';
import { logoutAction } from '../../redux/authSlice';
import useResponsiveSize from '../../utils/useResponsiveSize ';
import ClockVisual from '../../components/ClockVisual/ClockVisual';
import Button from '../../components/Button/Button';
import { PagesRoutes } from '../../constants/pages.enum';
import { Breakpoints } from '../../constants/breakpoints.enum';
import { getFormattedTime } from '../../utils/getFormattedTime';
import Location from '/location.svg';

const Wrapper = styled.div`
  ${({ theme }) => theme.mixins.flexCenter}
  width: 100%;
  flex-direction: column;
`;

const ClocksWrapper = styled.div`
  ${({ theme }) => theme.mixins.flexCenter}
  width: 100%;
  flex-direction: column;
  margin: 0 53px;

  ${({ theme }) => theme.mediaQuery(Breakpoints.Desktop)} {
    gap: 40px;
    flex-direction: row;
  }
`;

const ClockWrapper = styled.div`
  position: relative;
  margin-top: 40px;

  ${({ theme }) => theme.mediaQuery(Breakpoints.Tablet)} {
    margin-top: 50px;
  }

  ${({ theme }) => theme.mediaQuery(Breakpoints.Desktop)} {
    margin-top: 80px;
  }
  &:hover {
    cursor: pointer;
  }
`;

const EditIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 40px;
  right: 24px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.green};
  }

  ${({ theme }) => theme.mediaQuery(Breakpoints.Desktop)} {
    right: 20%;
  }
`;

const LabelsContainer = styled.div`
  ${({ theme }) => theme.mixins.flexCenter}
  flex-direction: column;

  ${({ theme }) => theme.mediaQuery(Breakpoints.Tablet)} {
    padding-top: ${({ theme }) => theme.spacing(2)};
  }

  ${({ theme }) => theme.mediaQuery(Breakpoints.Desktop)} {
    padding-top: ${({ theme }) => theme.spacing(4)};
  }
`;

const TimeLabel = styled.h3`
  padding: 0;
  margin: 0;
  font-size: 40px;
  font-weight: 600;
`;

const CityLabel = styled.h6`
  padding: 0;
  margin: 0;
  font-size: 16px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.green};
`;

const ButtonWrapper = styled.div`
  width: 100%;

  ${({ theme }) => theme.mediaQuery(Breakpoints.Desktop)} {
    max-width: 30%;
  }
`;

const LocationIcon = styled(motion.img)`
  width: 32px;
  height: 32px;
  position: absolute;
  top: -30px;
  left: 50%;

  ${({ theme }) => theme.mediaQuery(Breakpoints.Tablet)} {
    width: 40px;
    height: 40px;
    top: -40px;
  }

  ${({ theme }) => theme.mediaQuery(Breakpoints.Desktop)} {
    width: 56px;
    height: 56px;
    top: -70px;
  }
`;

const locationIconVariants = {
  initial: { x: '-50%', y: -20, opacity: 0 },
  animate: {
    x: '-50%',
    y: [0, -5, 0],
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: 'easeInOut',
    },
  },
};

const Clock = () => {
  const clocks = useSelector((state: RootState) => state.timezones.clocks);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isTablet, isMobile } = useResponsiveSize();

  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

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

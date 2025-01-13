import { useMemo } from 'react';
import styled from '@emotion/styled';
import { Timezone } from '../../types/timezone.types';
import ClockVisualSimple from '../../components/ClockVisual/ClockVisualSimple';
import { getFormattedTime } from '../../utils/timezoneUtils';
import { Breakpoints } from '../../constants/breakpoints.enum';

const Wrapper = styled.div`
  ${({ theme }) => theme.mixins.flexCenter}
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 15px;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  transition: background-color 0.2s ease-in-out;

  &:active {
    background-color: rgba(255, 255, 255, 0.6);
  }

  ${({ theme }) => theme.mediaQuery(Breakpoints.Desktop)} {
    &:hover {
      background-color: rgba(255, 255, 255, 0.6);
      cursor: pointer;
    }
  }

  ${({ theme }) => theme.mediaQuery(Breakpoints.Desktop)} {
    min-height: 230px;
    max-width: 190px;
  }

  ${({ theme }) => theme.mediaQuery(Breakpoints.UltraWide)} {
    min-height: 230px;
    max-width: calc(50vw / 4);
  }
`;

const CurrentTimeLabel = styled.p`
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.colors.green};
  font-size: 40px;
  font-weight: 600;

  ${({ theme }) => theme.mediaQuery(Breakpoints.Tablet)} {
    font-size: 32px;
  }
`;

const Label = styled.p`
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.colors.green};
  font-size: 14px;
  font-weight: 400;
  text-align: center;
`;

const RegionLabel = styled(Label)`
  padding-top: 8px;
`;

const CityLabel = styled(Label)`
  padding-bottom: 8px;
`;

interface ClockCardProps {
  clock: Timezone;
  onClick: () => void;
}

const ClockCard = ({ clock, onClick }: ClockCardProps) => {
  // Memoize formatted time to avoid recalculating on every render
  const currentTime = useMemo(
    () => (clock.timezone ? getFormattedTime(clock.timezone) : 'N/A'),
    [clock.timezone]
  );

  return (
    <Wrapper onClick={onClick}>
      {/* Display current time */}
      <CurrentTimeLabel>{currentTime}</CurrentTimeLabel>
      {/* Display city label */}
      <RegionLabel>{clock.region || 'Unknown City'}</RegionLabel>
      <CityLabel>{clock.label || 'Unknown City'}</CityLabel>
      {/* Display clock visual if timezone is valid */}
      {clock.timezone && (
        <ClockVisualSimple timezone={clock.timezone} size={100} />
      )}
    </Wrapper>
  );
};

export default ClockCard;

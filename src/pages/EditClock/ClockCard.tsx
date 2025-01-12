import styled from '@emotion/styled';
import { Timezone } from '../../types/timezone.types';
import ClockVisualSimple from '../../components/ClockVisual/ClockVisualSimple';
import { getFormattedTime } from '../../utils/getFormattedTime';
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

  ${({ theme }) => theme.mediaQuery(Breakpoints.LargeDesktop)} {
    min-height: 30vh;
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

const CityLabel = styled.p`
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.colors.green};
  font-size: 14px;
  font-weight: 400;
  padding-bottom: 16px;
`;

interface ClockCardProps {
  clock: Timezone;
  onClick: (value: string) => void;
}

const ClockCard = ({ clock, onClick }: ClockCardProps) => {
  const currentTime = getFormattedTime(clock.timezone);

  return (
    <Wrapper onClick={() => onClick(clock.timezone)}>
      <CurrentTimeLabel>{currentTime}</CurrentTimeLabel>
      <CityLabel>{clock.label}</CityLabel>
      <ClockVisualSimple timezone={clock.timezone} size={100} />
    </Wrapper>
  );
};

export default ClockCard;

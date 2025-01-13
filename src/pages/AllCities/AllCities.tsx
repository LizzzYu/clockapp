import { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { getFormattedTime, getLocalTimezone } from '../../utils/timezoneUtils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { TIMEZONE_OPTIONS } from '../../constants/timezones.const';
import { LocationIcon, locationIconVariants } from '../Clock/Clock.styles';
import Location from '/location.svg';
import ClockCard from '../EditClock/ClockCard';
import Input from '../../components/Input/Input';
import {
  faArrowLeft,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { css } from '@emotion/react';
import { Timezone } from '../../types/timezone.types';
import { updateClock } from '../../redux/timezoneSlice';
import { PagesRoutes } from '../../constants/pages.enum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/Button/Button';

// Wrapper for the entire page layout
const Wrapper = styled.div`
  width: 100vw;
  position: relative;
  height: 100%;
  min-height: 100dvh;
  ${({ theme }) => theme.mixins.flexCenter}
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  justify-self: flex-start;
  padding-top: 72px;
  overflow: auto;
  box-sizing: border-box;
`;

// Fixed section displaying the current city and time
const CurrentCityInfoWrapper = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-top: 70px;
`;

const CurrentTimeLabel = styled.h1`
  margin: 0;
  font-size: 3rem;
`;

const CurrentCityLabel = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.green};
  font-size: 20px;
  font-weight: 300;
`;

// Wrapper for the input box
const InputWrapper = styled.div`
  width: 60%;
  padding: ${({ theme }) => theme.spacing(4)} 0;
`;

// Wrapper for the list of clock cards
const CardsWrapper = styled.div<{ isFlexLayout: boolean }>`
  width: 60%;
  display: ${({ isFlexLayout }) => (isFlexLayout ? 'flex' : 'grid')};
  ${({ isFlexLayout }) =>
    isFlexLayout
      ? css`
          flex-wrap: wrap;
          justify-content: flex-start;
        `
      : css`
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          grid-template-rows: 230px;
        `}
  gap: 16px;
  overflow: auto;

  ${({ theme }) => css`
    padding: ${theme.spacing(1)} 0 ${theme.spacing(5)} 0;
    min-height: 300px;
  `}

  // hide scrollbar for chrome, safari, and edge
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
  }
`;

// Back button icon with hover effect
export const BackIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 40px;
  left: 20%;
  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.green};
  }
`;

// Wrapper for the action buttons
const ActionButtonWrapper = styled.div`
  position: absolute;
  top: 40px;
  right: 20%;
  transition: all 0.2s ease-in-out;

  ${({ theme }) => theme.mixins.flexCenter}
`;

const EmptyResult = styled.p`
  color: ${({ theme }) => theme.colors.green};
  text-align: center;
`;

const AllCities = () => {
  const { currentCity, id } = useParams<{ currentCity: string; id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const localTimezone = getLocalTimezone();

  // Redux state
  const clocks = useSelector((state: RootState) => state.timezones.clocks);
  const initialClock =
    clocks.find((clock) => clock.label === currentCity) ?? TIMEZONE_OPTIONS[0];

  // Local state
  const [displayedCity, setDisplayedCity] = useState(initialClock);
  const [currentTime, setCurrentTime] = useState(
    getFormattedTime(initialClock.timezone)
  );
  const [search, setSearch] = useState('');

  const sortedTimezoneOptions = useMemo(() => {
    return [...TIMEZONE_OPTIONS].sort((a, b) =>
      a.region.localeCompare(b.region)
    );
  }, []);

  const isCurrentTimezone = localTimezone === displayedCity.timezone;

  // Filter options based on the search query
  const filteredItems = useMemo(() => {
    return sortedTimezoneOptions.filter((option) => {
      const labelValue = option.label.toLowerCase();
      const regionValue = option.region.toLowerCase();
      return (
        labelValue.includes(search.toLowerCase()) ||
        regionValue.includes(search.toLowerCase())
      );
    });
  }, [search, sortedTimezoneOptions]);

  // Update the current time every 10 seconds
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(getFormattedTime(displayedCity.timezone));
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);

    return () => clearInterval(interval);
  }, [displayedCity.timezone]);

  // Handle clock card click
  const handleOnCardClick = (value: string) => {
    const selectedOption = JSON.parse(value) as Timezone;
    setDisplayedCity(selectedOption);
    setCurrentTime(getFormattedTime(selectedOption.timezone));
  };

  // Handle Save action
  const handleSave = () => {
    dispatch(updateClock({ index: Number(id), timezone: displayedCity }));
    navigate(`${PagesRoutes.EDIT_CLOCK}/${id}`);
  };

  // Handle Reset action
  const handleReset = () => {
    setDisplayedCity(initialClock);
    setCurrentTime(getFormattedTime(initialClock.timezone));
  };

  // Handle navigating back to the previous page
  const handlePreviousPage = () => {
    navigate(`${PagesRoutes.EDIT_CLOCK}/${id}`);
  };

  return (
    <Wrapper>
      {/* Back icon to navigate to the previous page */}
      <BackIcon icon={faArrowLeft} size='xl' onClick={handlePreviousPage} />
      {/* Action buttons for Reset and Save */}
      <ActionButtonWrapper>
        <Button variant='text' fontSize={18} onClick={handleReset}>
          Reset
        </Button>
        <Button variant='text' fontSize={18} onClick={handleSave}>
          Save
        </Button>
      </ActionButtonWrapper>
      <CurrentCityInfoWrapper>
        {isCurrentTimezone && (
          <LocationIcon
            src={Location}
            alt='location'
            variants={locationIconVariants}
            initial='initial'
            animate='animate'
            exit='exit'
          />
        )}
        <CurrentTimeLabel>{currentTime}</CurrentTimeLabel>
        <CurrentCityLabel>
          {displayedCity.region} - {displayedCity.label}
        </CurrentCityLabel>
      </CurrentCityInfoWrapper>

      {/* Search input */}
      <InputWrapper>
        <Input
          placeholder='Search City...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          iconPosition='start'
          icon={faMagnifyingGlass}
          iconSize='xl'
        />
      </InputWrapper>

      {/* List of clock cards */}
      {filteredItems.length !== 0 ? (
        <CardsWrapper isFlexLayout={filteredItems.length < 6}>
          {filteredItems.map((timezone) => (
            <ClockCard
              key={timezone.label}
              clock={timezone}
              onClick={() => handleOnCardClick(JSON.stringify(timezone))}
            />
          ))}
        </CardsWrapper>
      ) : (
        <EmptyResult>No search results</EmptyResult>
      )}
    </Wrapper>
  );
};

export default AllCities;

import styled from '@emotion/styled';
import Selector from '../../components/Selector/Selector';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { getFormattedTime } from '../../utils/timezoneUtils';
import { Timezone } from '../../types/timezone.types';

// Styled container for the clock selector
const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  max-height: 40%;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  overflow-y: auto;
`;

// Container for each option in the selector
const OptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

// Props interface for the ClockSelector component
interface ClockSelectorProps {
  options: Timezone[]; // List of timezone options
  onChange: (value: string) => void; // Callback when a new timezone is selected
  selectedClock: Timezone; // Currently selected timezone
}

const ClockSelector = ({
  options,
  onChange,
  selectedClock,
}: ClockSelectorProps) => {
  return (
    <Wrapper>
      <Selector
        options={options} // Pass enriched options with formatted time
        placeholder='Search City...'
        selectedOption={selectedClock}
        // Extract unique key for each option
        keyExtractor={(option) => option.label}
        // Customize the label display with city name and formatted time
        labelExtractor={(option) => (
          <OptionContainer>
            <span>
              {option.region} - {option.label}
            </span>
            <span>{getFormattedTime(option.timezone)}</span>
          </OptionContainer>
        )}
        valueExtractor={(option) => JSON.stringify(option)}
        // Use label or region for search functionality
        searchExtractor={(option) => option.label + ' ' + option.region}
        // Handle option change and pass selected timezone to the parent
        onChange={onChange}
        icon={faMagnifyingGlass} // Icon for the search input
        iconSize='lg'
      />
    </Wrapper>
  );
};

export default ClockSelector;

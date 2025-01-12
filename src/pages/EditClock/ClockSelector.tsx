import styled from '@emotion/styled';
import Selector from '../../components/Selector/Selector';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { getFormattedTime } from '../../utils/getFormattedTime';
import { Timezone } from '../../types/timezone.types';

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

const OptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

interface ClockSelectorOption {
  label: string;
  timezone: string;
}

interface ClockSelectorProps {
  options: ClockSelectorOption[];
  onChange: (value: string) => void;
  selectedClock: Timezone;
}

const ClockSelector = ({
  options,
  onChange,
  selectedClock,
}: ClockSelectorProps) => {
  return (
    <Wrapper>
      <Selector
        options={options}
        placeholder='Search City...'
        selectedOption={selectedClock}
        keyExtractor={(option) => option.label}
        labelExtractor={(option) => (
          <OptionContainer>
            <span>{option.label}</span>
            <span>{getFormattedTime(option.timezone)}</span>
          </OptionContainer>
        )}
        valueExtractor={(option) => JSON.stringify(option)}
        searchExtractor={(option) => option.label}
        onChange={onChange}
        icon={faMagnifyingGlass}
        iconSize='lg'
      />
    </Wrapper>
  );
};

export default ClockSelector;

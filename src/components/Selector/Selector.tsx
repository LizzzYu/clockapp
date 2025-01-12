import React, { useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import Input from '../Input/Input';
import { Breakpoints } from '../../constants/breakpoints.enum';

const MIN_HEIGHT = 'calc(40vh - 132px)';

const SelectorWrapper = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 40vh;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  padding: 24px;
  top: 0px;
  background: rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const SearchInputIcon = styled(FontAwesomeIcon)`
  position: absolute;
  left: 40px;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.green};
`;

const OptionsList = styled.ul`
  margin: 0;
  padding: 16px;
  max-height: ${MIN_HEIGHT};
  min-height: ${MIN_HEIGHT};
  padding-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.4);
  list-style: none;
  overflow-y: auto;

  ${({ theme }) => theme.mediaQuery(Breakpoints.Tablet)} {
    // hide scrollbar for chrome, safari, and edge
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */

    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Edge */
    }
  }
`;

const OptionItem = styled.li<{ selected: boolean }>`
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  font-size: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.green};
  background: ${({ selected, theme }) =>
    selected ? theme.colors.lightGreen : 'transparent'};

  &:hover {
    background: ${({ theme }) => theme.colors.lightGreen};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const EmptyResult = styled.p`
  color: ${({ theme }) => theme.colors.green};
  text-align: center;
`;

interface SelectorProps<T> {
  options: T[];
  placeholder: string;
  selectedOption: T;
  keyExtractor: (option: T) => React.Key;
  labelExtractor: (option: T) => React.ReactNode;
  valueExtractor: (option: T) => string;
  searchExtractor: (option: T) => string;
  searchPlaceholder?: string;
  onChange?: (value: string) => void;
  icon?: IconDefinition;
  iconSize?: SizeProp;
}

const Selector = <T,>({
  options,
  placeholder,
  selectedOption,
  keyExtractor,
  labelExtractor,
  valueExtractor,
  searchExtractor,
  onChange,
  icon,
  iconSize,
}: SelectorProps<T>) => {
  const [search, setSearch] = useState('');

  const handleOnchange = (value: T) => {
    const extractedValue = valueExtractor(value);
    // Trigger the parent component's callback with the selected option
    onChange && onChange?.(extractedValue);
    // Clear the search input after selection
    setSearch('');
  };

  // Filter options based on the search query
  const filteredOptions = useMemo(() => {
    return options.filter((option) => {
      const searchValue = searchExtractor(option);
      return (
        typeof searchValue === 'string' &&
        searchValue.toLowerCase().includes(search.trim().toLowerCase())
      );
    });
  }, [options, search, searchExtractor]);

  return (
    <SelectorWrapper>
      <SearchInputWrapper>
        <SearchInputIcon size='xl' color='black' icon={faMagnifyingGlass} />
        <Input
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          iconPosition={icon ? 'start' : undefined}
          icon={icon}
          iconSize={iconSize}
        />
      </SearchInputWrapper>
      <OptionsList role='list'>
        {filteredOptions.length !== 0 ? (
          <>
            {filteredOptions.map((option) => (
              <OptionItem
                key={keyExtractor(option)}
                onClick={() => handleOnchange(option)}
                selected={keyExtractor(selectedOption) === keyExtractor(option)}
              >
                {labelExtractor(option)}
              </OptionItem>
            ))}
          </>
        ) : (
          <EmptyResult>No search results</EmptyResult>
        )}
      </OptionsList>
    </SelectorWrapper>
  );
};

export default Selector;

import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import Input from '../Input/Input';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

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
  max-height: calc(40vh - 132px);
  min-height: calc(40vh - 132px);
  padding-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.4);
  list-style: none;
  overflow-y: auto;
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
    onChange && onChange?.(extractedValue);
    setSearch('');
  };

  const filteredOptions = options.filter((option) => {
    const searchValue = searchExtractor(option);
    return (
      typeof searchValue === 'string' &&
      searchValue.toLowerCase().includes(search.trim().toLowerCase())
    );
  });

  console.log({ selectedOption });

  return (
    <SelectorWrapper>
      <SearchInputWrapper>
        <SearchInputIcon size='xl' color='black' icon={faMagnifyingGlass} />
        <Input
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          iconPosition='start'
          icon={icon}
          iconSize={iconSize}
        />
      </SearchInputWrapper>
      <OptionsList>
        {filteredOptions.map((option) => (
          <OptionItem
            key={keyExtractor(option)}
            onClick={() => handleOnchange(option)}
            selected={keyExtractor(selectedOption) === keyExtractor(option)}
          >
            {labelExtractor(option)}
          </OptionItem>
        ))}
      </OptionsList>
    </SelectorWrapper>
  );
};

export default Selector;

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import Input from '../../components/Input/Input';
import { TIMEZONE_OPTIONS } from '../../constants/timezones.const';
import { Breakpoints } from '../../constants/breakpoints.enum';
import { Timezone } from '../../types/timezone.types';
import ClockCard from './ClockCard';

const Wrapper = styled.div`
  ${({ theme }) => theme.mixins.flexCenter}
  flex-direction: column;
  position: relative;
  width: 100%;
  position: fixed;
  bottom: 50px;
  width: 60%;
  gap: 16px;

  ${({ theme }) => theme.mediaQuery(Breakpoints.LargeDesktop)} {
    width: 50%;
  }
`;

const Container = styled.div`
  ${({ theme }) => theme.mixins.flexCenter}
  width: 100%;
  position: relative;
`;

const CarouselContainer = styled.div`
  width: 100%;
  flex: 1;
  overflow: hidden;
`;

const CarouselGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  width: 100%;
  justify-content: center;
`;

const ArrowButton = styled.button<{ position: string }>`
  position: absolute;
  ${({ position }) => css`
    ${position}: -70px;
  `}
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.white};
  margin: 10px;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.green};
    background-color: rgba(255, 255, 255, 0.4);

    &:disabled {
      background-color: unset;
    }
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.grey};
    cursor: not-allowed;
  }
`;

const InputWrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
`;

interface ClockListProps {
  handleTimezoneChange: (value: string) => void;
  selectedClock: Timezone;
}

const ClockList = ({ handleTimezoneChange, selectedClock }: ClockListProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState('');

  const itemsPerPage = 4;

  const filteredItems = useMemo(
    () =>
      TIMEZONE_OPTIONS.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleOnCardClick = (value: string) => {
    handleTimezoneChange(value);
    setCurrentPage(0);
    setSearch('');
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const currentItems = filteredItems.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(0);
    setSearch('');
  }, [selectedClock]);

  return (
    <Wrapper>
      <InputWrapper>
        <Input
          placeholder='Search City...'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(0);
          }}
          iconPosition='start'
          icon={faMagnifyingGlass}
          iconSize='xl'
        />
      </InputWrapper>
      <Container>
        {currentPage !== 0 && (
          <ArrowButton
            onClick={handlePrev}
            disabled={currentPage === 0}
            position='left'
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </ArrowButton>
        )}

        <CarouselContainer>
          <AnimatePresence mode='wait'>
            <CarouselGrid
              key={currentPage}
              initial={{ opacity: 0, translateY: 100 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 100 }}
              transition={{ duration: 0.3 }}
            >
              {currentItems.map((option, index) => (
                <ClockCard
                  key={option.label + index}
                  clock={option}
                  onClick={() => handleOnCardClick(JSON.stringify(option))}
                />
              ))}
            </CarouselGrid>
          </AnimatePresence>
        </CarouselContainer>

        {currentPage !== totalPages - 1 && (
          <ArrowButton
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            position='right'
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </ArrowButton>
        )}
      </Container>
    </Wrapper>
  );
};

export default ClockList;

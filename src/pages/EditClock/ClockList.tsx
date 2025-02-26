import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Breakpoints } from '../../constants/breakpoints.enum';
import { Timezone } from '../../types/timezone.types';
import ClockCard from './ClockCard';
import { usePagination } from '../../hooks/usePagination';
import Button from '../../components/Button/Button';
import { PagesRoutes } from '../../constants/pages.enum';

const GAP_SIZE = 16;
const ARROW_BUTTON_OFFSET = -70;

const Wrapper = styled.div`
  ${({ theme }) => theme.mixins.flexCenter}
  flex-direction: column;
  position: relative;
  width: 100%;
  position: fixed;
  top: 55%;
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
  gap: ${GAP_SIZE}px;
  width: 100%;
  justify-content: center;
`;

const ArrowButton = styled.button<{ position: string }>`
  position: absolute;
  ${({ position }) => css`
    ${position}: ${ARROW_BUTTON_OFFSET}px;
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

const EmptyResult = styled.p`
  color: ${({ theme }) => theme.colors.green};
  text-align: center;
`;

const AllCitiesButtonWrapper = styled.div`
  display: flex;
  align-self: flex-end;
  justify-content: flex-end;
  align-items: center;
  margin: -10px 0;
  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.green};

    // Apply hover styles to all child elements
    * {
      color: ${({ theme }) => theme.colors.green};
      transition: all 0.3s ease-in-out;
    }
  }
`;

interface ClockListProps {
  options: Timezone[];
  handleTimezoneChange: (value: string) => void;
  selectedClock: Timezone;
  selectedIndex: number;
}

const ClockList = ({
  options,
  handleTimezoneChange,
  selectedClock,
  selectedIndex,
}: ClockListProps) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const itemsPerPage = 4;

  // Filtered options based on the search query
  const filteredItems = useMemo(() => {
    return options.filter((option) => {
      // Extract searchable content from the option using searchExtractor
      const labelValue = option.label.toLowerCase();
      const regionValue = option.region.toLowerCase();
      return (
        labelValue.includes(search.toLowerCase()) ||
        regionValue.includes(search.toLowerCase())
      );
    });
  }, [options, search]); // Recompute only when `search` changes

  const { currentPage, totalPages, handleNext, handlePrev, setCurrentPage } =
    usePagination(filteredItems.length, itemsPerPage);

  const handleOnCardClick = (value: string) => {
    handleTimezoneChange(value);
    setCurrentPage(0);
    setSearch('');
  };

  const handleAllCitiesClick = () => {
    const encodedCityLabel = encodeURIComponent(selectedClock.label);
    navigate(`${PagesRoutes.ALL_CITIES}/${encodedCityLabel}/${selectedIndex}`);
  };

  const currentItems = useMemo(() => {
    return filteredItems.slice(
      currentPage * itemsPerPage,
      currentPage * itemsPerPage + itemsPerPage
    );
  }, [currentPage, filteredItems, itemsPerPage]);

  useEffect(() => {
    // Reset pagination and search input when the selected clock changes
    // This ensures that the list always starts fresh for a new selection
    if (selectedClock) {
      setCurrentPage(0);
      setSearch('');
    }
  }, [selectedClock, setCurrentPage]);

  // Display a friendly message when no timezone data is available
  if (options.length === 0) {
    return <EmptyResult>No timezone data available</EmptyResult>;
  }

  return (
    <Wrapper>
      <InputWrapper>
        <Input
          placeholder='Search City...'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value); // Update the search query
            setCurrentPage(0); // Reset pagination to the first page on search change
          }}
          iconPosition='start'
          icon={faMagnifyingGlass}
          iconSize='xl'
        />
      </InputWrapper>
      <AllCitiesButtonWrapper onClick={handleAllCitiesClick}>
        <Button position='right' variant='text'>
          All cities
        </Button>
        <FontAwesomeIcon icon={faChevronRight} />
      </AllCitiesButtonWrapper>
      <Container>
        {currentPage !== 0 && currentItems.length !== 0 && (
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
            {currentItems.length !== 0 ? (
              <CarouselGrid
                key={currentPage} // Ensure animation is triggered on page change
                initial={{ opacity: 0 }} // Start animation with opacity 0
                animate={{ opacity: 1 }} // Animate to opacity 1 when entering
                exit={{ opacity: 0 }} // Animate to opacity 0 when exiting
                transition={{ duration: 0.3 }} // Smooth transition over 0.3 seconds
              >
                {currentItems.map((option, index) => (
                  <ClockCard
                    key={option.label + index}
                    clock={option}
                    onClick={() => handleOnCardClick(JSON.stringify(option))}
                  />
                ))}
              </CarouselGrid>
            ) : (
              // Handle no search results case
              <EmptyResult>No search results</EmptyResult>
            )}
          </AnimatePresence>
        </CarouselContainer>

        {currentPage !== totalPages - 1 && currentItems.length !== 0 && (
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

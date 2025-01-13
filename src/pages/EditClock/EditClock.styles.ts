import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Breakpoints } from '../../constants/breakpoints.enum';

export const clockVariants = {
  selected: { scale: 1, opacity: 1 },
  unselected: { scale: 1, opacity: 0.5 },
  exit: { opacity: 0, scale: 0.8 },
};

export const locationIconVariants = {
  initial: { x: '-50%', y: -20, opacity: 0 },
  selected: {
    x: '-50%',
    y: [0, -5, 0],
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: 'easeInOut',
    },
  },
  unselected: {
    y: 0,
    opacity: 0.5,
  },
  exit: {
    opacity: 0,
  },
};

export const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100dvh;
  ${({ theme }) => theme.mixins.flexCenter}
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  padding: 0 53px;
`;

export const ClocksWrapper = styled.div<{
  selectedIndex: number;
  clocksNumber: number;
}>`
  position: relative;
  display: flex;
  align-items: center;
  padding-top: 8dvh;
  width: ${({ clocksNumber }) => `calc(240px * ${clocksNumber})`};
  transition: transform 0.5s ease-in-out;
  transform: ${({ selectedIndex }) =>
    `translateX(calc(50% - ${selectedIndex} * 240px - 120px))`};

  ${({ theme }) => theme.mediaQuery(Breakpoints.Tablet)} {
    margin-top: 1dvh;
  }
`;

export const ClockContainer = styled.div<{ isSelected: boolean }>`
  flex: 0 0 auto;
  width: 240px;
  height: 240px;
  ${({ theme }) => theme.mixins.flexCenter}
  position: relative;
  cursor: pointer;

  transform: scale(${({ isSelected }) => (isSelected ? 1 : 0.75)});
  transition: transform 0.5s ease-in-out;

  ${({ theme }) => theme.mediaQuery(Breakpoints.Tablet)} {
    margin-top: 20px;
  }
`;

export const CurrentTimeLabel = styled.h2`
  margin: 0;
  font-size: 40px;
  line-height: 40px;
  text-align: center;

  ${({ theme }) => css`
    padding-top: ${theme.spacing(2)};
    color: ${theme.colors.white};
  `};
`;

export const CityLabel = styled.h2`
  margin: 0;
  font-size: 18px;
  line-height: 18px;
  text-align: center;
  font-weight: 300;

  ${({ theme }) => css`
    padding-top: ${theme.spacing(1)};
    color: ${theme.colors.green};
  `}
`;

export const BackIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 40px;
  left: 80px;
  transition: all 0.2s ease-in-out;
  z-index: 2;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.green};
  }

  ${({ theme }) => theme.mediaQuery(Breakpoints.Desktop)} {
    left: 20%;
  }
`;

export const MotionClockContainer = styled(motion.div)`
  flex: 0 0 auto;
  width: 240px;
  height: 240px;
  ${({ theme }) => theme.mixins.flexCenter}
  position: relative;
  cursor: pointer;
`;

export const MotionLabelContainer = styled(motion.div)``;

import { motion } from 'framer-motion';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Breakpoints } from '../../constants/breakpoints.enum';

export const Wrapper = styled.div`
  ${({ theme }) => theme.mixins.flexCenter}
  width: 100%;
  flex-direction: column;
`;

export const ClocksWrapper = styled.div`
  ${({ theme }) => theme.mixins.flexCenter}
  width: 100%;
  flex-direction: column;
  margin: 0 53px;

  ${({ theme }) => theme.mediaQuery(Breakpoints.Desktop)} {
    gap: 40px;
    flex-direction: row;
  }
`;

export const ClockWrapper = styled.div`
  position: relative;
  margin-top: 40px;

  ${({ theme }) => theme.mediaQuery(Breakpoints.Tablet)} {
    margin-top: 50px;
  }

  ${({ theme }) => theme.mediaQuery(Breakpoints.Desktop)} {
    margin-top: 80px;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const EditIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 40px;
  right: 24px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.colors.green};
  }

  ${({ theme }) => theme.mediaQuery(Breakpoints.Desktop)} {
    right: 20%;
  }
`;

export const LabelsContainer = styled.div`
  ${({ theme }) => theme.mixins.flexCenter}
  flex-direction: column;

  ${({ theme }) => theme.mediaQuery(Breakpoints.Tablet)} {
    padding-top: ${({ theme }) => theme.spacing(2)};
  }

  ${({ theme }) => theme.mediaQuery(Breakpoints.Desktop)} {
    padding-top: ${({ theme }) => theme.spacing(4)};
  }
`;

export const TimeLabel = styled.h3`
  padding: 0;
  margin: 0;
  font-size: 40px;
  font-weight: 600;
`;

export const CityLabel = styled.h6`
  padding: 0;
  margin: 0;
  font-size: 16px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.green};
`;

export const ButtonWrapper = styled.div`
  width: 100%;

  ${({ theme }) => theme.mediaQuery(Breakpoints.Desktop)} {
    max-width: 30%;
  }
`;

export const LocationIcon = styled(motion.img)`
  width: 32px;
  height: 32px;
  position: absolute;
  top: -30px;
  left: 50%;

  ${({ theme }) => theme.mediaQuery(Breakpoints.Tablet)} {
    width: 40px;
    height: 40px;
    top: -40px;
  }

  ${({ theme }) => theme.mediaQuery(Breakpoints.Desktop)} {
    width: 56px;
    height: 56px;
    top: -60px;
  }
`;

export const locationIconVariants = {
  initial: { x: '-50%', y: -20, opacity: 0 },
  animate: {
    x: '-50%',
    y: [0, -5, 0],
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: 'easeInOut',
    },
  },
};

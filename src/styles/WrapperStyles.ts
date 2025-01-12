import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Breakpoints } from '../constants/breakpoints.enum';

export const AnimatedWrapper = styled(motion.div)(({ theme }) => ({
  width: '100%',
  maxHeight: '100vh',
  maxWidth: '100vw',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: `0 ${theme.spacing(7)}`,

  [theme.mediaQuery(Breakpoints.Desktop)]: {
    padding: `0 ${theme.spacing(10)}`,
  },
}));

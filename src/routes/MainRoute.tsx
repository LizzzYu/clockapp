import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { motion } from 'framer-motion';
import Login from '../pages/Login/Login';
import Clock from '../pages/Clock/Clock';
import EditClock from '../pages/Clock/EditClock';
import { PagesRoutes } from '../constants/pages.enum';
import PrivateRoute from './PrivateRoute';
import { Breakpoints } from '../constants/breakpoints.enum';

const AnimatedWrapper = styled(motion.div)(({ theme }) => ({
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

const MainRoutes = () => {
  const location = useLocation();
  const theme = useTheme();

  return (
    <AnimatedWrapper
      key={location.pathname}
      variants={theme.defaultMotionAnimation}
      initial='initial'
      animate='animate'
      exit='exit'
    >
      <Routes location={location} key={location.key}>
        <Route path={PagesRoutes.MAIN} element={<Login />} />
        <Route
          path={PagesRoutes.CLOCK}
          element={
            <PrivateRoute>
              <Clock />
            </PrivateRoute>
          }
        />
        <Route
          path={`${PagesRoutes.EDIT_CLOCK}/:id`}
          element={
            <PrivateRoute>
              <EditClock />
            </PrivateRoute>
          }
        />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </AnimatedWrapper>
  );
};

export default MainRoutes;

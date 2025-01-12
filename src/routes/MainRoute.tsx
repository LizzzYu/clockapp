import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import Login from '../pages/Login/Login';
import Clock from '../pages/Clock/Clock';
import EditClock from '../pages/EditClock/EditClock';
import AllCities from '../pages/AllCities/Allcities';
import { PagesRoutes } from '../constants/pages.enum';
import PrivateRoute from './PrivateRoute';
import { AnimatedWrapper } from '../styles/WrapperStyles';

const MainRoutes = () => {
  const location = useLocation();
  const theme = useTheme();

  const createPrivateRoute = (Component: React.FC) => (
    <PrivateRoute>
      <Component />
    </PrivateRoute>
  );

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
        <Route path={PagesRoutes.CLOCK} element={createPrivateRoute(Clock)} />
        <Route
          path={`${PagesRoutes.EDIT_CLOCK}/:id`}
          element={createPrivateRoute(EditClock)}
        />
        <Route
          path={`${PagesRoutes.ALL_CITIES}/:currentCity/:id`}
          element={createPrivateRoute(AllCities)}
        />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </AnimatedWrapper>
  );
};

export default MainRoutes;

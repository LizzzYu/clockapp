import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import Login from '../pages/Login/Login';
import Clock from '../pages/Clock/Clock';
import EditClock from '../pages/EditClock/EditClock';
import { PagesRoutes } from '../constants/pages.enum';
import PrivateRoute from './PrivateRoute';
import { AnimatedWrapper } from '../styles/WrapperStyles';
import AllCities from '../pages/AllCities/AllCities';

/**
 * MainRoutes component defines the application's main routing structure.
 * It includes both public and private routes, wrapped with animation and theme support.
 */
const MainRoutes = () => {
  const location = useLocation(); // Get the current location object for animated transitions
  const theme = useTheme(); // Access the current theme to use animations

  /**
   * Wraps a given component in a PrivateRoute component to enforce authentication checks.
   * @param Component - The component to be rendered within the private route.
   * @returns A JSX element wrapped with PrivateRoute.
   */
  const createPrivateRoute = (Component: React.FC) => (
    <PrivateRoute>
      <Component />
    </PrivateRoute>
  );

  return (
    // AnimatedWrapper applies animation effects based on route transitions
    <AnimatedWrapper
      key={location.pathname} // Ensures animation triggers on path change
      variants={theme.defaultMotionAnimation} // Fetches animation variants from the theme
      initial='initial' // Initial animation state
      animate='animate' // Target animation state
      exit='exit' // Animation state when route exits
    >
      {/* React Router handles route matching and rendering */}
      <Routes location={location} key={location.key}>
        {/* Public route for the login page */}
        <Route path={PagesRoutes.MAIN} element={<Login />} />

        {/* Private route for the clock page */}
        <Route path={PagesRoutes.CLOCK} element={createPrivateRoute(Clock)} />

        {/* Private route for editing a specific clock */}
        <Route
          path={`${PagesRoutes.EDIT_CLOCK}/:id`}
          element={createPrivateRoute(EditClock)}
        />

        {/* Private route for displaying all cities */}
        <Route
          path={`${PagesRoutes.ALL_CITIES}/:currentCity/:id`}
          element={createPrivateRoute(AllCities)}
        />

        {/* Catch-all route redirects to the main page if no match is found */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </AnimatedWrapper>
  );
};

export default MainRoutes;

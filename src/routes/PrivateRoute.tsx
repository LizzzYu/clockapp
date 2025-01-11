import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setRedirectMessage } from '../redux/authSlice';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(setRedirectMessage('Please login first'));
    }
  }, [isAuthenticated, dispatch]);

  return isAuthenticated ? <>{children}</> : <Navigate to='/' replace />;
};

export default PrivateRoute;

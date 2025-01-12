import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setRedirectMessage } from '../redux/authSlice';

export const useAuthRedirect = (setErrorMessage: (msg: string | undefined) => void) => {
  const redirectMessage = useSelector(
    (state: RootState) => state.auth.redirectMessage
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (redirectMessage) {
      setErrorMessage(redirectMessage);
      const timeout = setTimeout(() => {
        dispatch(setRedirectMessage(null));
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [redirectMessage, dispatch, setErrorMessage]);
};

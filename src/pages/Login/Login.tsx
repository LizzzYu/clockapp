import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { RootState } from '../../redux/store';
import ClockLogo from '/clock-logo.svg';
import ComingSoon from '/work-progress.svg';
import { loginAction, setRedirectMessage } from '../../redux/authSlice';
import { ApiErrorResponse, login, LoginResponse } from '../../api/auth';
import useModal from '../../hooks/useModal ';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/Checkbox/Checkbox';
import Input from '../../components/Input/Input';
import Modal from '../../components/Modal/Modal';
import { PagesRoutes } from '../../constants/pages.enum';
import Loading from '../../components/Loading/Loading';
import { Breakpoints } from '../../constants/breakpoints.enum';
import useResponsiveSize from '../../utils/useResponsiveSize ';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${({ theme }) => theme.mediaQuery(Breakpoints.Desktop)} {
    width: 30%;
  }
`;

const Logo = styled.img`
  width: 100%;
`;

const InputWrapper = styled.div(({ theme }) => ({
  paddingTop: theme.spacing(10),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

const Footer = styled.div`
  ${({ theme }) => theme.mixins.flexCenter}
  position: absolute;
  bottom: 0;
  left: 0;
  padding-bottom: ${({ theme }) => theme.spacing(4)};
  width: 100%;
  font-size: 14px;
  line-height: 22px;
  font-weight: 500;
`;

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const { isOpen, openModal, closeModal } = useModal();
  const { isMobile, isTablet } = useResponsiveSize();
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const redirectMessage = useSelector(
    (state: RootState) => state.auth.redirectMessage
  );

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    openModal();
  };

  const handleOnkeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && username && password) {
      void handleLogin();
    }
  };

  useEffect(() => {
    if (username !== '' || password !== '') {
      setErrorMessage(undefined);
    }
  }, [username, password]);

  useEffect(() => {
    if (redirectMessage) {
      setErrorMessage(redirectMessage);
      const timeout = setTimeout(() => {
        dispatch(setRedirectMessage(null));
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [redirectMessage, dispatch]);

  const handleLogin = async () => {
    setErrorMessage(undefined);
    setIsLoading(true);
    try {
      const response: LoginResponse = await login({
        username,
        password,
        expiresInMins: 30,
      });

      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);

      dispatch(loginAction());
      navigate(PagesRoutes.CLOCK);
    } catch (error) {
      if (axios.isAxiosError<ApiErrorResponse>(error) && error.response) {
        setErrorMessage(error.response.data.message || 'Login failed.');
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    } finally {
      setPassword('');
      setUsername('');
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading color={theme.colors.green} />;

  return (
    <Wrapper>
      <Logo src={ClockLogo} alt='clock-logo' />
      <InputWrapper>
        <Input
          label='Email, Phone, or Username'
          placeholder='Enter your Email, Phone, or Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleOnkeyDown}
          autoFocus
          errorMessage={errorMessage}
        />
        <Input
          label='Password'
          placeholder='Enter your Password'
          value={password}
          type={isPasswordVisible ? 'text' : 'password'}
          icon={isPasswordVisible ? faEye : faEyeSlash}
          iconPosition='end'
          onIconClick={togglePasswordVisibility}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleOnkeyDown}
          errorMessage={errorMessage}
        />
      </InputWrapper>
      <Button
        paddingTop={9}
        variant='text'
        position='right'
        onClick={openModal}
      >
        Forgot Password?
      </Button>
      <Checkbox
        checked={isChecked}
        onChange={handleCheckboxChange}
        label='Remember me for 30 days'
        paddingTop={29}
      />
      <Button
        paddingTop={68}
        onClick={() => {
          void handleLogin();
        }}
        disabled={!username || !password || isLoading}
      >
        Login
      </Button>
      <Footer>
        <p>Don’t have an account?</p>
        <Button variant='text' onClick={openModal}>
          Register
        </Button>
      </Footer>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <img width={isMobile || isTablet ? 130 : 150} src={ComingSoon} />
        <p>coming soon...</p>
        <Button onClick={closeModal}>Confirm</Button>
      </Modal>
    </Wrapper>
  );
};

export default Login;

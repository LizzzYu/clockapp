import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import ClockLogo from '/clock-logo.svg';
import ComingSoon from '/work-progress.svg';
import { loginAction } from '../../redux/authSlice';
import { ApiErrorResponse } from '../../api/auth';
import { performLogin } from '../../services/authService';
import useModal from '../../hooks/useModal ';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';
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
  height: 100dvh;
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

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);

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

  useAuthRedirect(setErrorMessage);

  const handleLogin = async () => {
    setErrorMessage(undefined); // Clear any existing error messages
    setIsLoading(true); // Start the loading indicator
    try {
      // Perform the login API call
      await performLogin(username, password);
      dispatch(loginAction()); // Update Redux state to reflect authentication status
      navigate(PagesRoutes.CLOCK); // Redirect to the protected route
    } catch (error) {
      // Handle API or unexpected errors
      if (axios.isAxiosError<ApiErrorResponse>(error) && error.response) {
        setErrorMessage(error.response.data.message || 'Login failed.');
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
    } finally {
      setPassword(''); // Clear the password input field
      setUsername(''); // Clear the username input field
      setIsLoading(false); // Stop the loading indicator
    }
  };

  const modalImageSize = useMemo(
    () => (isMobile || isTablet ? 130 : 150),
    [isMobile, isTablet]
  );

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
        <img width={modalImageSize} src={ComingSoon} />
        <p>coming soon...</p>
        <Button onClick={closeModal}>Confirm</Button>
      </Modal>
    </Wrapper>
  );
};

export default Login;

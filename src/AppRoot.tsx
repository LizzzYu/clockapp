import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import { defaultTheme } from './style';
import { useAppSelector } from './redux/storeTypes';
import Background from './components/Background/Background';
import MainRoutes from './routes/MainRoute';
import LocationProvider from './routes/LocationProvider';

const InterfaceContainer = styled.div(({ theme }) => ({
  backgroundColor: theme.colors.black,
  color: theme.colors.white,
  width: '100vw',
  minHeight: '100dvh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  rowGap: theme.spacing(2),
}));

const AppRoot = () => {
  const booted = useAppSelector((state) => state.app.booted);
  if (!booted) {
    return null;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <InterfaceContainer>
        <Background>
          <BrowserRouter>
            <LocationProvider>
              <MainRoutes />
            </LocationProvider>
          </BrowserRouter>
        </Background>
      </InterfaceContainer>
    </ThemeProvider>
  );
};

export default AppRoot;

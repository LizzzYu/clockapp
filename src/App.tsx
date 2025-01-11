import { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store';
import { Global as EmotionGlobal } from '@emotion/react';
import { appBoot } from './redux/appReducer';
import AppRoot from './AppRoot';
import { globalStyle } from './style';

const App = () => {
  useEffect(() => {
    store.dispatch(appBoot());
  }, []);

  return (
    <ReduxProvider store={store}>
      <EmotionGlobal styles={globalStyle} />
      <AppRoot />
    </ReduxProvider>
  );
};

export default App;

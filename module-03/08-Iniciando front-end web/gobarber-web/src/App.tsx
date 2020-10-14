import React from 'react';

import SiginIn from './pages/SignIn';
// import SiginUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import AppProvider from './hooks/index'

const App: React.FC = () => (
  <>
    <AppProvider>
      <SiginIn />
    </AppProvider>

    <GlobalStyle />
  </>
);

export default App;

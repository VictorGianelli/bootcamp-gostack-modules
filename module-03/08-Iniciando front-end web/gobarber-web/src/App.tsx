import React from 'react';

import SiginIn from './pages/SignIn';
// import SiginUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import AuthProvider from './context/AuthContext'

const App: React.FC = () => (
  <>
    <AuthProvider.Provider value={{ name: 'Victor' }} >
      <SiginIn />
    </AuthProvider.Provider>

    <GlobalStyle />
  </>
);

export default App;

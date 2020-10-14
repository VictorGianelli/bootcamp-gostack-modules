import React from 'react';

import SiginIn from './pages/SignIn';
// import SiginUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import ToastContainer from './components/ToastContainer'
import { AuthProvider } from './hooks/AuthContext'

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SiginIn />
    </AuthProvider>

    <ToastContainer />
    
    <GlobalStyle />
  </>
);

export default App;

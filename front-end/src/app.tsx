// Composant principal de l'application React

import React from 'react';
import { SocketProvider } from './providers/SocketProvider';
import ChatScreen from './screens/ChatScreen';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <SocketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ChatScreen />} />
        </Routes>
      </Router>
    </SocketProvider>
  );
};

export default App;

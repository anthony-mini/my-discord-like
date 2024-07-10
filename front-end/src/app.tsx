// Composant principal de l'application React

import React from 'react';
import { SocketProvider } from './providers/SocketProvider';

const App = () => {
  return (
    <SocketProvider>
      <div>
        <h1>Chat App</h1>
      </div>
    </SocketProvider>
  );
};

export default App;

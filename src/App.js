import React from 'react';
import './styles/styles.scss';
import AppRouter from './routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Toaster />
      <AppRouter />
    </div>
  );
}

export default App;

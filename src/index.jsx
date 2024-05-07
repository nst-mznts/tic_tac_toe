import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { GameSettingsContextProvider } from './utils/GameSettingsContextProvider';
import { GameScoreContextProvider } from './utils/GameScoreContextProvider';
import App from './components/App/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GameSettingsContextProvider>
      <GameScoreContextProvider>
        <App />
      </GameScoreContextProvider>
    </GameSettingsContextProvider>
  </React.StrictMode>,
);

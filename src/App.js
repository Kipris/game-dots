import React from 'react';
import './styles.css';
import { Box } from '@chakra-ui/core';
import GameSettings from './components/GameSettings';
import GameField from './components/GameField';
import LeaderBoard from './components/LeaderBoard';

const App = () => (
  <div className="app">
    <Box w="650px" borderWidth="1px" p="24px" rounded="sm">
      <GameSettings />
      <GameField />
    </Box>
    <Box w="350px" borderWidth="1px" p="24px" rounded="sm">
      <LeaderBoard />
    </Box>
  </div>
);

export default App;

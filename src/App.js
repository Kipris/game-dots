import React, { Component } from "react";
import axios from 'axios';
import "./App.css";

import GameSettings from './components/GameSettings';
import GameField from './components/GameField';
import LeaderBoard from './components/LeaderBoard';

import { Box } from "@chakra-ui/core";

class App extends Component {
  state = {
    settings: {}
  }

  componentDidMount() {
    axios.get('https://starnavi-frontend-test-task.herokuapp.com/game-settings')
      .then(response => this.setState({settings: response.data}))
  }

  render() {
    return (
      <div className="App">
        <Box w="650px" borderWidth="1px" p="24px" rounded="sm">
          <GameSettings settings={this.state.settings} />
          <GameField />
        </Box>
        <Box w="350px" borderWidth="1px" p="24px" rounded="sm">
          <LeaderBoard />
        </Box>  
      </div>
    );
  }
}

export default App;

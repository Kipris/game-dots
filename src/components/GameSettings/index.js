import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Grid, Box, Select, Input, Button, Text,
} from '@chakra-ui/core';
import * as actions from '../../store/actions';
import './styles.css';

class GameSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Choose difficulty, type your name and press button to play',
      buttonText: 'Play',
      playerName: '',
      pickedDifficulty: '',
    };
  }

  componentDidMount() {
    const { fetchSettings } = this.props;
    fetchSettings();
  }

  componentDidUpdate(prevProps) {
    const { newWinner, gameStatus } = this.props;
    if (!gameStatus && prevProps.gameStatus) {
      this.setState({
        message: `${newWinner.winner} won`,
        buttonText: 'Play again',
      });
    }
  }

  onStartGameHandler = () => {
    const { settings, gameStarted } = this.props;
    const { pickedDifficulty } = this.state;
    const { delay } = settings[pickedDifficulty];
    let { playerName } = this.state;
    playerName = playerName || 'Anonymous';
    const message = `${playerName} vs Computer AI`;
    this.setState({ message });
    gameStarted({
      playerName,
      pickedDifficulty,
      delay,
    });
  }

  nameChangeHandler = (event) => {
    this.setState({ playerName: event.target.value });
  }

  difficultyChangeHandler = (event) => {
    this.setState({ pickedDifficulty: event.target.value });
  }

  render() {
    const { settings, gameStatus } = this.props;
    const {
      message, buttonText, playerName, pickedDifficulty,
    } = this.state;
    const settingsEntries = Object.entries(settings);
    const options = settingsEntries.map(([key, value]) => {
      const modeName = key.slice(0, 1).toUpperCase() + key.slice(1, -4);
      return (
        <option
          key={value.field}
          value={key}
        >
          {modeName}
        </option>
      );
    });

    return (
      <Box mb="40px">
        <Grid templateColumns="repeat(2, 1fr) 100px" gap={4} mb="20px">
          <Select
            disabled={gameStatus}
            value={pickedDifficulty}
            onChange={(event) => this.difficultyChangeHandler(event)}
            placeholder="Pick game difficulty"
          >
            {options}
          </Select>
          <Input
            disabled={gameStatus}
            value={playerName}
            onChange={(event) => this.nameChangeHandler(event)}
            placeholder="Enter your name"
          />
          <Button
            variantColor="teal"
            size="md"
            type="button"
            onClick={this.onStartGameHandler}
            disabled={gameStatus || !pickedDifficulty}
          >
            {buttonText}
          </Button>
        </Grid>
        <Text fontSize="md" textAlign="center">{message}</Text>
      </Box>
    );
  }
}

GameSettings.propTypes = {
  fetchSettings: PropTypes.func.isRequired,
  gameStatus: PropTypes.bool.isRequired,
  settings: PropTypes.shape({
    field: PropTypes.number,
    delay: PropTypes.number,
  }).isRequired,
  newWinner: PropTypes.shape({
    id: PropTypes.number,
    winner: PropTypes.string,
    date: PropTypes.instanceOf(Date),
  }),
  gameStarted: PropTypes.func.isRequired,
};

GameSettings.defaultProps = {
  newWinner: {},
};

const mapStateToProps = (state) => (
  {
    reducer: state.gameReducer,
    settings: state.gameReducer.settings,
    gameStatus: state.gameReducer.gameStatus,
    newWinner: state.gameReducer.newWinner,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    fetchSettings: () => dispatch(actions.fetchSettings()),
    gameStarted: (currentGame) => dispatch(actions.gameStarted(currentGame)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(GameSettings);

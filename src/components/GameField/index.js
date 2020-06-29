import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../../store/actions';
import './styles.css';

class GameField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      capacity: 5,
      userScore: 0,
      computerScore: 0,
      fieldKeys: Array.from(Array(5).keys()).map((col) => (
        Array.from(Array(5).keys()).map((row) => `${row}${col}`))).flat(),
      fieldClasses: new Array(25),
      usedFields: [],
      currentIndex: null,
    };
  }

  componentDidUpdate(prevProps) {
    const { capacity } = this.state;
    const { gameStatus } = this.props;
    if (gameStatus && !prevProps.gameStatus) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        userScore: 0,
        computerScore: 0,
        fieldClasses: new Array(capacity ** 2),
        usedFields: [],
        currentIndex: null,
      }, () => this.doGameStep());
    }
  }

  createArray = (capacity = this.state.capacity) => (
    Array.from(Array(capacity).keys())
  )

  renderFieldDOM = () => {
    const { fieldKeys, fieldClasses } = this.state;
    return this.createArray().map((col) => (
      this.createArray().map((row) => {
        const id = `${row}${col}`;
        const classId = fieldKeys.indexOf(id);
        return (
          <div
            key={id}
            className={fieldClasses[classId]}
            onClick={(event) => this.onFieldClickHandler(event)}
            onKeyDown={() => {}}
            role="button"
            tabIndex="-1"
          />
        );
      })));
  }

  getRandom = (min = 0, max = this.state.capacity - 1) => (
    Math.floor(Math.random() * (max - min + 1)) + min
  );

  doGameStep = () => {
    const { capacity, usedFields } = this.state;
    const dimension = capacity ** 2;
    const { length } = usedFields;
    if (length < Math.ceil(dimension / 2)) {
      this.generateNum();
    } else {
      this.finishGame();
    }
  }

  finishGame = () => {
    const { userScore, computerScore } = this.state;
    const { playerName, postWinner } = this.props;
    const winner = userScore > computerScore ? playerName : 'Computer AI';
    postWinner({
      id: Math.random(),
      winner,
      date: new Date(),
    });
  }

  generateNum = () => {
    const randomRow = this.getRandom();
    const randomCol = this.getRandom();
    const { usedFields } = this.state;
    const isNotUniq = usedFields.filter(([row, col]) => (
      row === randomRow && col === randomCol
    ));
    if (isNotUniq.length > 0) {
      this.generateNum();
    } else {
      this.setField(randomRow, randomCol);
    }
  }

  setField = (row, col) => {
    this.setState((state) => {
      const { usedFields } = this.state;
      const fields = [...usedFields, [row, col]];
      return {
        ...state,
        usedFields: fields,
      };
    }, () => this.drawField(row, col));
  }

  drawField = (row, col) => {
    const { fieldKeys, fieldClasses } = this.state;
    const updatedFieldClasses = [...fieldClasses];
    const id = `${row}${col}`;
    const classId = fieldKeys.indexOf(id);
    updatedFieldClasses[classId] = 'selected';
    this.setState({
      fieldClasses: updatedFieldClasses,
      currentIndex: classId,
    }, () => {
      this.timeoutID = this.timer();
      return this.timeoutID;
    });
  }

  onFieldClickHandler = (event) => {
    const { fieldClasses, currentIndex } = this.state;
    const updatedFieldClasses = [...fieldClasses];
    if (event.target.className === 'selected') {
      updatedFieldClasses[currentIndex] = 'user-chosen';
      clearTimeout(this.timeoutID);
      this.setState((state) => (
        {
          fieldClasses: updatedFieldClasses,
          userScore: state.userScore + 1,
        }
      ), () => this.doGameStep());
    }
  }

  onComputerMoveHandler = () => {
    const { fieldClasses, currentIndex } = this.state;
    const updatedFieldClasses = [...fieldClasses];
    updatedFieldClasses[currentIndex] = 'computer-chosen';
    this.setState((state) => (
      {
        fieldClasses: updatedFieldClasses,
        computerScore: state.computerScore + 1,
      }
    ), () => this.doGameStep());
  }

  timer = () => {
    const { delay } = this.props;
    return setTimeout(this.onComputerMoveHandler, delay);
  };

  render() {
    return (
      <>
        <div className="Field">
          {this.renderFieldDOM()}
        </div>
      </>
    );
  }
}

GameField.propTypes = {
  gameStatus: PropTypes.bool.isRequired,
  playerName: PropTypes.string,
  postWinner: PropTypes.func.isRequired,
  delay: PropTypes.number,
};

GameField.defaultProps = {
  playerName: 'Anonymous',
  delay: 2000,
};

const mapStateToProps = (state) => (
  {
    reducer: state.gameReducer,
    gameStatus: state.gameReducer.gameStatus,
    playerName: state.gameReducer.currentGame.playerName,
    delay: state.gameReducer.currentGame.delay,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    postWinner: (winner) => dispatch(actions.postWinner(winner)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(GameField);

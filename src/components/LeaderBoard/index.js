import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spinner, Box, Text } from '@chakra-ui/core';
import * as actions from '../../store/actions';

class LeaderBoard extends Component {
  componentDidMount() {
    const { fetchWinners } = this.props;
    fetchWinners();
  }

  render() {
    const { winners } = this.props;
    let listItems = <Spinner size="lg" />;
    if (winners.length !== 0) {
      listItems = winners.reverse().map((winner) => (
        <Box
          key={winner.id}
          p={4}
          d="flex"
          justifyContent="space-between"
          mb="1"
          borderWidth="1px"
          rounded="sm"
        >
          <Text fontSize="xs">{winner.winner}</Text>
          <Text fontSize="xs">{(new Date(winner.date)).toLocaleString()}</Text>
        </Box>
      ));
    }

    return (
      <div>
        <Text fontSize="2xl" mb={2}>Leader Board</Text>
        <Box h="75vh" overflowY="auto" textAlign="center">
          {listItems}
        </Box>
      </div>
    );
  }
}

LeaderBoard.propTypes = {
  fetchWinners: PropTypes.func.isRequired,
  winners: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    winner: PropTypes.string,
    date: PropTypes.string,
  })).isRequired,
};

const mapStateToProps = (state) => (
  {
    reducer: state.gameReducer,
    winners: state.gameReducer.winners,
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    fetchWinners: () => dispatch(actions.fetchWinners()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(LeaderBoard);

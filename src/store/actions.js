import axios from 'axios';
import * as actionTypes from './actionsTypes';

export const fetchSettingsSuccess = (payload) => (
  {
    type: actionTypes.FETCH_SETTINGS_SUCCESS,
    payload,
  }
);

export const fetchSettingsFail = (error) => (
  {
    type: actionTypes.FETCH_SETTINGS_FAIL,
    error,
  }
);

export const fetchSettings = () => (
  async (dispatch) => {
    try {
      const response = await axios.get('https://starnavi-frontend-test-task.herokuapp.com/game-settings');
      return dispatch(fetchSettingsSuccess(response.data));
    } catch (error) {
      return dispatch(fetchSettingsFail(error));
    }
  }
);

export const fetchWinnersStart = () => (
  {
    type: actionTypes.FETCH_WINNERS_START,
  }
);

export const fetchWinnersSuccess = (payload) => (
  {
    type: actionTypes.FETCH_WINNERS_SUCCESS,
    payload,
  }
);

export const fetchWinnersFail = (error) => (
  {
    type: actionTypes.FETCH_WINNERS_FAIL,
    error,
  }
);

export const fetchWinners = () => (
  async (dispatch) => {
    try {
      dispatch(fetchWinnersStart());
      const response = await axios.get('https://starnavi-frontend-test-task.herokuapp.com/winners');
      return dispatch(fetchWinnersSuccess(response.data));
    } catch (error) {
      return dispatch(fetchWinnersFail(error));
    }
  }
);

export const gameStarted = (payload) => (
  {
    type: actionTypes.GAME_STARTED,
    payload,
  }
);

export const postWinnerStart = (payload) => (
  {
    type: actionTypes.POST_WINNER_START,
    payload,
  }
);

export const postWinnerSuccess = (payload) => (
  {
    type: actionTypes.POST_WINNER_SUCCESS,
    payload,
  }
);

export const postWinnerFail = (error) => (
  {
    type: actionTypes.POST_WINNER_FAIL,
    error,
  }
);

export const postWinner = (payload) => (
  async (dispatch) => {
    try {
      dispatch(postWinnerStart(payload));
      const response = await axios.post('https://starnavi-frontend-test-task.herokuapp.com/winners', payload);
      return dispatch(postWinnerSuccess(response.data));
    } catch (error) {
      return dispatch(postWinnerFail(error));
    }
  }
);

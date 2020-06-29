import * as actionTypes from './actionsTypes';

const initialState = {
  settings: {},
  winners: [],
  newWinner: {},
  gameStatus: false,
  currentGame: {},
  loading: false,
  error: null,
};

const fetchSettingsSuccess = (state, action) => (
  {
    ...state,
    settings: action.payload,
  }
);

const fetchSettingsFail = (state, action) => (
  {
    ...state,
    error: action.error,
  }
);

const fetchWinnersStart = (state) => (
  {
    ...state,
    loading: true,
  }
);

const fetchWinnersSuccess = (state, action) => (
  {
    ...state,
    winners: action.payload,
    loading: false,
  }
);

const fetchWinnersFail = (state, action) => (
  {
    ...state,
    loading: false,
    error: action.error,
  }
);

const gameStarted = (state, action) => (
  {
    ...state,
    gameStatus: true,
    currentGame: action.payload,
    newWinner: {},
  }
);

const postWinnerStart = (state, action) => (
  {
    ...state,
    gameStatus: false,
    newWinner: action.payload,
    loading: true,
  }
);

const postWinnerSuccess = (state, action) => (
  {
    ...state,
    winners: action.payload,
    loading: false,
  }
);

const postWinnerFail = (state, action) => (
  {
    ...state,
    error: action.error,
    loading: false,
  }
);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_SETTINGS_SUCCESS: return fetchSettingsSuccess(state, action);
    case actionTypes.FETCH_SETTINGS_FAIL: return fetchSettingsFail(state, action);
    case actionTypes.FETCH_WINNERS_START: return fetchWinnersStart(state, action);
    case actionTypes.FETCH_WINNERS_SUCCESS: return fetchWinnersSuccess(state, action);
    case actionTypes.FETCH_WINNERS_FAIL: return fetchWinnersFail(state, action);
    case actionTypes.GAME_STARTED: return gameStarted(state, action);
    case actionTypes.POST_WINNER_START: return postWinnerStart(state, action);
    case actionTypes.POST_WINNER_SUCCESS: return postWinnerSuccess(state, action);
    case actionTypes.POST_WINNER_FAIL: return postWinnerFail(state, action);
    default: return state;
  }
};

export default reducer;

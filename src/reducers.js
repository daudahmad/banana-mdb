import { combineReducers } from "redux";
import { RECEIVE_MOVIES, SEARCH_MOVIES, SET_TITLE, SEARCH_MOVIES_FAILURE } from "./actions";

function selectedTitle(state = "", action) {
  switch (action.type) {
    case SET_TITLE:
      return action.title;
    default:
      return state;
  }
}

function movies(
  state = {
    isFetching: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case SEARCH_MOVIES:
      return Object.assign({}, state, {
        isFetching: true
      });
    case SEARCH_MOVIES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      });
    case RECEIVE_MOVIES:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.movies,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  movies,
  selectedTitle
});

export default rootReducer;

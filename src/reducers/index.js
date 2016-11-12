import { combineReducers } from 'redux'
import {
  SEARCH_TEXT_CHANGED,
  SEARCH_TEXT_CLEAR,
} from '../actions';


const searchText = (state = "", action) => {
  switch (action.type) {
    case SEARCH_TEXT_CHANGED:
      return action.text;

    case SEARCH_TEXT_CLEAR:
      return "";

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  searchText,
});

export default rootReducer;

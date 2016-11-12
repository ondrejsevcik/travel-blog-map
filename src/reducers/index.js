import {combineReducers} from 'redux'
import {
  SEARCH_TEXT_CHANGED,
  SEARCH_TEXT_CLEAR,
  ZOOM_CHANGED,
  POSITION_CHANGED,
  FETCH_BLOGPOST_SUCCESS,
  SELECT_BLOGPOST,
} from '../actions';


const BRNO = {lat: 49.19106, lng: 16.611419};

const rootReducer = (state, action) => {
  // TODO: initial state
  if (!state) {
    return {
      zoom: 13,
      searchText: "",
      position: BRNO,
      selectedBlogpost: null,
      blogposts: [],
    };
  }

  switch (action.type) {
    case SEARCH_TEXT_CHANGED:
      return Object.assign({}, state, {searchText: action.text});

    case SEARCH_TEXT_CLEAR:
      return Object.assign({}, state, {searchText: ""});

    case ZOOM_CHANGED:
      return Object.assign({}, state, {zoom: action.zoom});

    case POSITION_CHANGED:
      return Object.assign({}, state, {position: action.position});

    case FETCH_BLOGPOST_SUCCESS:
      return {
        ...state,
        blogposts: action.json,
      };

    case SELECT_BLOGPOST:
      return {
        ...state,
        selectedBlogpost: state.blogposts.find(b => b.url = action.url),
      };

    default:
      return state;
  }
};

export default rootReducer;

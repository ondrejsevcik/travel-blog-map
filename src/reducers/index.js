import {
  SEARCH_TEXT_CHANGED,
  SEARCH_TEXT_CLEAR,
  ZOOM_CHANGED,
  POSITION_CHANGED,
  FETCH_BLOGPOST_SUCCESS,
  SELECT_BLOGPOST,
  UNSELECT_BLOGPOST,
  FETCH_LOCATION_SUCCESS,
  FETCH_SUGGESTIONS_SUCCESS,
} from '../actions';


const BRNO = {lat: 49.19106, lng: 16.611419};
const DEFAULT_SUGGESTIONS = ['Praha', 'Brno', 'London', 'Berlin'];

const rootReducer = (state, action) => {
  // TODO: initial state
  if (!state) {
    return {
      zoom: 12,
      searchText: "",
      position: BRNO,
      selectedBlogpost: null,
      suggestions: DEFAULT_SUGGESTIONS,
      blogposts: [],
    };
  }

  switch (action.type) {
    case SEARCH_TEXT_CHANGED:
      return {
        ...state,
        searchText: action.text
      };

    case SEARCH_TEXT_CLEAR:
      return {
        ...state,
        searchText: ""
      };

    case ZOOM_CHANGED:
      return {
        ...state,
        zoom: action.zoom
      };

    case POSITION_CHANGED:
      return {
        ...state,
        position: action.position
      };

    case FETCH_BLOGPOST_SUCCESS:
      return {
        ...state,
        blogposts: action.json,
      };

    case SELECT_BLOGPOST:
      return {
        ...state,
        selectedBlogpost: state.blogposts.find(b => b.url === action.url),
      };

    case UNSELECT_BLOGPOST:
      return {
        ...state,
        selectedBlogpost: null,
      };

    case FETCH_LOCATION_SUCCESS:
      return {
        ...state,
        position: action.position,
      };

    case FETCH_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        suggestions: action.suggestions,
      };

    default:
      return state;
  }
};

export default rootReducer;

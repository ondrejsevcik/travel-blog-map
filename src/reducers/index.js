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
      blogposts: [{
        "text_short": "Dneska za\u010d\u00edn\u00e1me brzy, respektive on a ona za\u010d\u00ednaj\u00ed d\u0159\u00edve ne\u017e j\u00e1. J\u00e1 vyr\u00e1\u017e\u00edm p\u0159ed sedmou. Cesta by m\u011bla podle jejich p\u0159\u00edru\u010dky trvat kolem \u0161esti a p\u016fl hodiny. Sbalim v\u011bci, vyjdu p\u0159ed chatu a sm\u011b\u0159uji ke hran\u011b hory/kopce, kde za\u010d\u00edn\u00e1 prudk\u00e1 stezka dol\u016f. Tam used\u00e1 a v klidu sn\u00edd\u00e1m tortily s nugetkou (\u010dt\u011bte jako Nutela od Orionu). Po v\u010derej\u0161\u00ed bou\u0159ce a krupobit\u00ed jsou dole v \u00fadol\u00ed mraky. Super pohled ...",
        "title": "Den #07",
        "url": "http://bezhrbu.cz/2016/06/22/den-07/",
        "image": "http://bezhrbu.cz/wp-content/uploads/2016/06/wp-1466628631376.jpg",
        "tags": ["blog"],
        "lat": 47.6431397,
        "lng": 15.4043772
      }],
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
        selectedBlogpost: state.blogposts.find(b => b.url === action.url),
      };

    default:
      return state;
  }
};

export default rootReducer;

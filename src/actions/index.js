export const SEARCH_TEXT_CHANGED = 'SEARCH_TEXT_CHANGED';
export const searchTextChanged = text => ({
  type: SEARCH_TEXT_CHANGED,
  text
});

export const SEARCH_TEXT_CLEAR = 'SEARCH_TEXT_CLEAR';
export const searchTextClear = () => ({
  type: SEARCH_TEXT_CLEAR
});

export const FETCH_BLOGPOST_SUCCESS = 'FETCH_BLOGPOST_SUCCESS';
export const fetchBlogpostsSuccess = (json) => ({
  type: FETCH_BLOGPOST_SUCCESS,
  json
});

const endpoint = 'https://1npdz8h6qb.execute-api.eu-west-1.amazonaws.com/dev/map/points/';
export const FETCH_BLOGPOSTS = 'FETCH_BLOGPOSTS';
export const fetchBlogposts = (lat, lng, zoom) => (dispatch) => {
  return fetch(`${endpoint}?lat=${lat}&lng=${lng}&zoom=${zoom}&tags=blog`)
    .then(response => response.json())
    .then(json => dispatch(fetchBlogpostsSuccess(json)))
    .catch(err => console.error('OUCH!', err));
};

export const SELECT_BLOGPOST = 'SELECT_BLOGPOST';
export const selectBlogpost = (url) => ({
  type: SELECT_BLOGPOST,
  url
})

export const ZOOM_CHANGED = 'ZOOM_CHANGED';
export const zoomChanged = (zoom) => ({
  type: ZOOM_CHANGED,
  zoom,
})

export const POSITION_CHANGED = 'POSITION_CHANGED';
export const positionChanged = (position) => ({
  type: POSITION_CHANGED,
  position
})

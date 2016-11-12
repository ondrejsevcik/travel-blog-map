export const SEARCH_TEXT_CHANGED = 'SEARCH_TEXT_CHANGED';
export const searchTextChanged = text => ({
  type: SEARCH_TEXT_CHANGED,
  text
});

export const SEARCH_TEXT_CLEAR = 'SEARCH_TEXT_CLEAR';
export const searchTextClear = () => ({
  type: SEARCH_TEXT_CLEAR
});

export const FETCH_LOCATION_SUCCESS = 'FETCH_LOCATION_SUCCESS';
export const fetchLocationSuccess = (position) => ({
  type: FETCH_LOCATION_SUCCESS,
  position
});

export const FETCH_LOCATION = 'FETCH_LOCATION';
export const fetchLocation = (locationName) => (dispatch) => {
  const encoded = encodeURIComponent(locationName);
  return fetch(`https://maps.google.com/maps/api/geocode/json?address=${encoded}`)
    .then(result => result.json())
    .then(json => json.results[0].geometry.location)
    .then(position => dispatch(fetchLocationSuccess(position)))
    .catch(e => console.log('OUCH!!!! Another error?', e));
};

export const FETCH_SUGGESTIONS_SUCCESS = 'FETCH_SUGGESTIONS_SUCCESS';
export const fetchSuggestionSuccess = (suggestions) => ({
  type: FETCH_SUGGESTIONS_SUCCESS,
  suggestions
});

export const FETCH_SUGGESTIONS = 'FETCH_SUGGESTIONS';
export const fetchSuggestions = (locationName) => (dispatch) => {

  const displaySuggestions = (predictions, status) => {
    // eslint-disable-next-line no-undef
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
      console.log('OHHHH! Error while fetching suggestions.');
      return;
    }

    dispatch(fetchSuggestionSuccess(predictions.map(p => p.description)))
  };

  // eslint-disable-next-line no-undef
  var service = new google.maps.places.AutocompleteService();
  service.getQueryPredictions({ input: locationName }, displaySuggestions);
};

export const FETCH_BLOGPOST_SUCCESS = 'FETCH_BLOGPOST_SUCCESS';
export const fetchBlogpostsSuccess = (json) => ({
  type: FETCH_BLOGPOST_SUCCESS,
  json
});

const endpoint = 'https://1npdz8h6qb.execute-api.eu-west-1.amazonaws.com/dev/map/points/';
export const FETCH_BLOGPOSTS = 'FETCH_BLOGPOSTS';
export const fetchBlogposts = (bounds) => (dispatch) => {
  const params = `lat_from=${bounds.lat_from}&lat_to=${bounds.lat_to}&lng_from=${bounds.lng_from}&lng_to=${bounds.lng_to}`;

  //lat_from=40.65459581890774&lat_to=-73.88715162714846&lng_from=-73.88715162714846&lng_to=40.82913691476422&tags=tweet
  //lat_from=49.06986171793627&lat_to=49.22930109775443&lng_from=16.292128838867256&lng_to=16.75767449316413&tags=tweet

  return fetch(`${endpoint}?${params}&tags=tweet`)
    .then(response => response.json())
    .then(json => dispatch(fetchBlogpostsSuccess(json)))
    .catch(err => console.error('OUCH!', err));
};

export const SELECT_BLOGPOST = 'SELECT_BLOGPOST';
export const selectBlogpost = (url) => ({
  type: SELECT_BLOGPOST,
  url
});

export const UNSELECT_BLOGPOST = 'UNSELECT_BLOGPOST';
export const unselectBlogpost = () => ({
  type: UNSELECT_BLOGPOST,
});

export const ZOOM_CHANGED = 'ZOOM_CHANGED';
export const zoomChanged = (zoom) => ({
  type: ZOOM_CHANGED,
  zoom,
});

export const POSITION_CHANGED = 'POSITION_CHANGED';
export const positionChanged = (position) => ({
  type: POSITION_CHANGED,
  position
});

export const viewportChanged = (dispatch, position, zoom, boundaries) => (dispatch) => {
  dispatch(positionChanged(position));
  dispatch(zoomChanged(zoom));
  dispatch(fetchBlogposts(boundaries));
};

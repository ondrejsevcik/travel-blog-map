import React from 'react';
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SimpleMap from '../components/SiteMap';
import AutoComplete from 'material-ui/AutoComplete';
import {
  searchTextChanged,
  searchTextClear,
  fetchBlogposts,
  unselectBlogpost,
  fetchLocation,
  fetchSuggestions,
} from '../actions';
import IconButton from 'material-ui/IconButton';
import Clear from 'material-ui/svg-icons/content/clear';
import Drawer from 'material-ui/Drawer';
import BlogpostDetail from '../components/BlogpostDetail';

class App extends React.Component {
  static propTypes = {
    searchText: React.PropTypes.string.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    zoom: React.PropTypes.number.isRequired,
    position: React.PropTypes.object.isRequired,
    selectedBlogpost: React.PropTypes.object,
  };

  componentDidMount() {
    const {
      dispatch,
      position,
      zoom,
    } = this.props;

    const BRNO_BOUNDS_POSITION = {
      lat_from: 49.115050852028226,
      lat_to: 49.26560834592336,
      lng_from: 16.479411401123116,
      lng_to: 16.743426598877022,
    };

    dispatch(fetchBlogposts(BRNO_BOUNDS_POSITION));
  }

  render() {
    const {
      dispatch,
      searchText,
    } = this.props;

    return (
      <MuiThemeProvider>
        <div>
          <Drawer
            open={!!this.props.selectedBlogpost}
            zDepth={0}
            width={350}
            style={{
              zIndex: 900,
            }}
            containerStyle={{
              zIndex: 1100,
            }}
            onRequestChange={(open, reason) => {
              console.log('requestChange', open, reason);
            }}
            docked={true}
          >
            {!!this.props.selectedBlogpost ? (
              <BlogpostDetail
                selectedBlogpost={this.props.selectedBlogpost}
                onClose={() => dispatch(unselectBlogpost())}
              />
            ) : null}
          </Drawer>
          <div
            style={{
              position: "fixed",
              top: "10px",
              left: "10px",
              zIndex: 1000,
              padding: "0 0 0 10px",
              background: "white",
              display: "flex",
            }}
          >
            <AutoComplete
              key="autocomplete"
              dataSource={this.props.suggestions}
              filter={AutoComplete.caseInsensitiveFilter}
              searchText={this.props.searchText}
              maxSearchResults={4}
              onUpdateInput={(searchText) => {
                console.log('onUpdateInput');
                dispatch(searchTextChanged(searchText));
                dispatch(fetchSuggestions(searchText));
              }}
              onNewRequest={(searchText) => {
                console.log('onNewRequest');
                dispatch(searchTextChanged(searchText));
                dispatch(fetchLocation(searchText));
              }}
            />
            <IconButton
              onClick={() => dispatch(searchTextClear())}
              style={{
                opacity: searchText ? '1' : '0.5',
              }}
            >
              <Clear />
            </IconButton>
          </div>
          <SimpleMap />
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchText: state.searchText,
    position: state.position,
    zoom: state.zoom,
    selectedBlogpost: state.selectedBlogpost,
    suggestions: state.suggestions,
  }
};

export default connect(mapStateToProps)(App)

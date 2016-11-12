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

    dispatch(fetchBlogposts(position.lat, position.lng, zoom));
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
            onRequestChange={(open, reason) => console.log('requestChange', open, reason)}
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
              top: 10,
              left: 10,
              zIndex: 1000,
              width: "320px",
              padding: "5px",
              background: "white",
            }}
          >
            <AutoComplete
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
          <div
            style={{
              zIndex: 1100,
              position: "fixed",
              right: 10,
              bottom: 10,
            }}
            className="fb-like"
            data-hare="true"
            data-width="450"
            data-show-faces="true">
          </div>
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

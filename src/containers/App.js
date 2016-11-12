import React from 'react';
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SimpleMap from '../components/SiteMap';
import AutoComplete from 'material-ui/AutoComplete';
import {
  searchTextChanged,
  searchTextClear,
  fetchBlogposts
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

  componentWillReceiveProps(nextProps) {
    console.log('nextProps', nextProps);
  }

  shouldComponentUpdate(...args) {
    console.log('sdc', args);
    return true;
  }

  render() {
    const { dispatch } = this.props;

    {console.log('selectedBlogpost', this.props.selectedBlogpost)}
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
              dataSource={['Praha', 'Brno', 'Paris', 'London']}
              filter={AutoComplete.caseInsensitiveFilter}
              searchText={this.props.searchText}
              maxSearchResults={4}
              onUpdateInput={(searchText) => {
                console.log('onUpdateInput');
                dispatch(searchTextChanged(searchText))
              }}
              onNewRequest={(searchText) => {
                console.log('onNewRequest');
                dispatch(searchTextChanged(searchText))
              }}
            />
            <IconButton
              onClick={() => dispatch(searchTextClear())}
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
  }
};

export default connect(mapStateToProps)(App)

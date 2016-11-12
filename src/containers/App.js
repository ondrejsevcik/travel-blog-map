import React from 'react';
import { connect } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SimpleMap from '../components/SiteMap';
import AutoComplete from 'material-ui/AutoComplete';
import { searchTextChanged, searchTextClear } from '../actions';
import IconButton from 'material-ui/IconButton';
import Clear from 'material-ui/svg-icons/content/clear';

class App extends React.Component {
  static propTypes = {
    searchText: React.PropTypes.string.isRequired,
    dispatch: React.PropTypes.func.isRequired
  };

  render() {
    const { dispatch } = this.props;

    return (
      <MuiThemeProvider>
        <div>
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
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchText: state.searchText,
  }
};

export default connect(mapStateToProps)(App)

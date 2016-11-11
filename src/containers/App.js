import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SimpleMap from '../components/SiteMap';

const App = () => (
  <MuiThemeProvider>
    <div>
      <SimpleMap>

      </SimpleMap>
    </div>
  </MuiThemeProvider>
);


ReactDOM.render(
  <App />,
  document.getElementById('root')
);


export default App;

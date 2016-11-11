import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

export default class SearchBar extends React.Component {
  render() {
    return (
      <div>
        <AutoComplete
          hintText="What are you looking for?"
          dataSource={['Praha', 'Brno', 'Paris', 'London']}
          floatingLabelText="Search"
          fullWidth={true}
        />
      </div>
    );
  }
}

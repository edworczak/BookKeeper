import React from 'react';
import ReactDOM from 'react-dom';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleTextChange(event) {
    this.props.onSearchBar(event.target.value);
  }

  handleCheckboxChange(event) {
    this.props.onCheckboxAreLent(event.target.checked);
  }

  render() {
    return <div>
      <div className="search">
        <span className="fa fa-search"></span>
        <input type="text" placeholder="Wyszukaj" value={this.props.filterText} onChange={this.handleTextChange} />
      </div>
    </div>;
  }
}

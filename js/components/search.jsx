import React from 'react';
import ReactDOM from 'react-dom';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      areLent: ""
    };

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
        <i className="fas fa-search"></i>
        <input type="text" placeholder="Wyszukaj" value={this.props.filterText} onChange={this.handleTextChange} />
      </div>
      <div className="checkbox-container">
        <input type="checkbox" id="areLent" checked={this.props.areLent}  onChange={this.handleCheckboxChange}/>
        <label className="checkbox-label" htmlFor="areLent">
            <div className="checkbox">
                <i className="fas fa-check"></i>
            </div>
            <p>tylko pożyczone</p>
        </label>
      </div>
    </div>;
  }
}

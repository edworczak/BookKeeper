import React from 'react';
import ReactDOM from 'react-dom';

// Import components
import BookActionButtons from './bookactionbuttons.jsx';

export default class BookRow extends React.Component {
  render() {
    return <div className="table-row">
      <div className="table__title">{this.props.title}</div>
      <div className="table__author">{this.props.author}</div>
      <div className="table__state">{this.props.state}</div>
      <div className="table__action"><BookActionButtons callback={this.props.callback} index={this.props.index}/></div>
    </div>;
  }
}

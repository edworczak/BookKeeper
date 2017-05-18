import React from 'react';
import ReactDOM from 'react-dom';

export default class BookHeader extends React.Component {
  render() {
    return <div className="table-row">
      <div className="table__title">tytuł</div>
      <div className="table__author">autor</div>
      <div className="table__state">stan</div>
      <div className="table__action">akcja</div>
    </div>;
  }
}

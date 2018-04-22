import React from 'react';
import ReactDOM from 'react-dom';

// Import components
import BookActionButtons from './bookactionbuttons.jsx';

export default class BookRow extends React.Component {
  render() {
    let rating;
    if (this.props.read) {
      rating = <span><i className="fas fa-check" style={{color: "#087E8B"}}></i> {this.props.rating}</span>;
    } else {
      rating = <span><i className="fas fa-times" style={{color: "#E56399"}}></i></span>;
    }

    return <div className="table-row">
      <div className="table__id">{this.props.index + 1}</div>
      <div className="table__title">{this.props.title}</div>
      <div className="table__author">{this.props.author}</div>
      <div className="table__rating">{rating}</div>
      <div className="table__state">{this.props.state}</div>
      <div className="table__action">
        <BookActionButtons
        callback={this.props.callback}
        index={this.props.index}
        title={this.props.title}
        author={this.props.author}
        description={this.props.description}
        publisher={this.props.publisher}
        publishedOn={this.props.publishedOn}
        read={this.props.read}
        rating={this.props.rating}
        lent={this.props.lent}
        lentTo={this.props.lentTo}
        linkTo={this.props.linkTo} />
      </div>
    </div>;
  }
}

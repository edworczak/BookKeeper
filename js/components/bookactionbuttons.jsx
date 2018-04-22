import React from 'react';
import ReactDOM from 'react-dom';

// Import components
import App from './app.jsx';
import EditBookForm from './editbookform.jsx';
import BookInfo from './bookinfo.jsx';

export default class BookActionButtons extends React.Component {

  showInfo(event) {
    let author = "autor: " + this.props.author;
    let title = "tytuł: " + this.props.title;

    let checkPublisher;
    this.props.publisher == null ? checkPublisher = "nie podano nazwy wydawnictwa" : checkPublisher = "wydawnictwo: " + this.props.publisher;

    let checkPublishedOn;
    this.props.publishedOn == null ? checkPublishedOn = "nie podano daty wydania" : checkPublishedOn = "data wydania: " + this.props.publishedOn;

    let checkDescription;
    this.props.description == null ? checkDescription = "nie podano opisu" : checkDescription = this.props.description;

    let checkRating;
    if (this.props.rating == null) {
      checkRating = "brak oceny";
    } else {
      checkRating = "ocena: " + this.props.rating + "/10";
    }

    let checkLentTo;
    if ((this.props.lentTo.length > 0)) {
      checkLentTo = "pożyczona: " + this.props.lentTo;
    } else {
      checkLentTo = "na miejscu";
    }

    ReactDOM.render(
      <BookInfo
        title={title}
        author={author}
        description={checkDescription}
        publisher={checkPublisher}
        publishedOn={checkPublishedOn}
        read={this.props.read}
        rating={checkRating}
        lent={this.props.lent}
        lentTo={checkLentTo} />,
      document.getElementById('app')
    );
  }

  editBook(event) {
    let checkPublisher;
    this.props.publisher == null ? checkPublisher = "" : checkPublisher = this.props.publisher;

    let checkPublishedOn;
    this.props.publishedOn == null ? checkPublishedOn = "" : checkPublishedOn = this.props.publishedOn;

    let checkDescription;
    this.props.description == null ? checkDescription = "" : checkDescription = this.props.description;

    let checkRating;
    if (this.props.rating == null) {
      checkRating = "";
    } else {
      checkRating = this.props.rating;
    }

    let checkLentTo;
    if ((this.props.lentTo.length > 0)) {
      checkLentTo = this.props.lentTo;
    } else {
      checkLentTo = "";
    }

    ReactDOM.render(
      <EditBookForm
        title={this.props.title}
        author={this.props.author}
        description={checkDescription}
        publisher={checkPublisher}
        publishedOn={checkPublishedOn}
        read={this.props.read}
        rating={checkRating}
        lent={this.props.lent}
        lentTo={checkLentTo}
        linkTo={this.props.linkTo} />,
      document.getElementById('app')
    );
  }

  deleteThisBook(i) {
    this.props.callback(this.props.index);
  }

  render() {
    return <div>
        <a onClick={event => this.showInfo(event)}><i className="fas fa-info book-action" data-fa-transform="shrink-8" data-fa-mask="fas fa-square"></i></a>
        <a onClick={event => this.editBook(event)}><i className="fas fa-pencil-alt book-action" data-fa-transform="shrink-8" data-fa-mask="fas fa-square"></i></a>
        <a onClick={index => this.deleteThisBook(index)}><i className="fas fa-times book-action--alert" data-fa-transform="shrink-8" data-fa-mask="fas fa-square"></i></a>
    </div>;
  }
}

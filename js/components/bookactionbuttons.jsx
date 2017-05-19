import React from 'react';
import ReactDOM from 'react-dom';

// Import components
import App from './app.jsx';
import EditBookForm from './editbookform.jsx';

export default class BookActionButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      info: false,
      edit: false
    }
  }

  showInfo(event) {
    console.log("pokazuję informacje");
  }

  editBook(event) {
    ReactDOM.render(
      <EditBookForm
        title={this.props.title}
        author={this.props.author}
        lent={this.props.lent}
        lentTo={this.props.lentTo}
        linkTo={this.props.linkTo} />,
      document.getElementById('app')
    );
  }

  deleteThisBook(i) {
    this.props.callback(this.props.index);
  }

  render() {
    return <div>
      <button className="book-action" onClick={event => this.showInfo(event)}><i className="fa fa-info" aria-hidden="true"></i></button>
      <button className="book-action" onClick={event => this.editBook(event)}><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
      <button className="book-action--alert" onClick={index => this.deleteThisBook(index)}><i className="fa fa-times" aria-hidden="true"></i></button>
    </div>;
  }
}

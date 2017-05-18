import React from 'react';
import ReactDOM from 'react-dom';

// Import components
import BookHeader from './bookheader.jsx';
import BooksList from './bookslist.jsx';

export default class BooksTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: this.props.books
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      books: newProps.books
    })
  }

  render() {
    return <div className="books-list">
      <BookHeader />
      <hr />
      <BooksList books={this.state.books} filterText={this.props.filterText}  areLent={this.props.areLent} callback={this.props.callback} />
    </div>;
  }
}

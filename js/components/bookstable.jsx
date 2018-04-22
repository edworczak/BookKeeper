import React from 'react';
import ReactDOM from 'react-dom';

// Import components
import BookHeader from './bookheader.jsx';
import BooksList from './bookslist.jsx';

class Footer extends React.Component {
  render() {
    return <footer>
      <p>Layout, front-end: Ewa Dworczak 2017 || Back-end: Tomasz Grzesiak 2016</p>
    </footer>;
  }
}

export default class BooksTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: this.props.books,
      loading: this.props.loading,
      error: this.props.error,
      loaded: this.props.loaded
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      books: newProps.books,
      loading: newProps.loading,
      error: newProps.error,
      loaded: newProps.loaded
    })
  }

  render() {
    return <div className="table-footer-container">
      <div className="books-list">
        <BookHeader />
        <hr />
        <BooksList books={this.state.books}
                   loading={this.state.loading}
                   error={this.state.error}
                   loaded={this.state.loaded}
                   filterText={this.props.filterText}
                   areLent={this.props.areLent}
                   callback={this.props.callback} />
      </div>
      <Footer />
    </div>;
  }
}

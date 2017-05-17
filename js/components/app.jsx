import React from 'react';
import ReactDOM from 'react-dom';

// Import components
import Menu from './menu.jsx';
import BooksTable from './bookstable.jsx';

class Footer extends React.Component {
  render() {
    return <footer>
      <p>Ewa Dworczak, 2017</p>
    </footer>;
  }
}

export default class App extends React.Component {
  render() {
    return <div>
      <div className="container">
        <Menu />
        <BooksTable books={this.props.books} />
      </div>
      <Footer />
    </div>;
  }
}

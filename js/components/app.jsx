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
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      areLent: false
    };

    this.handleSearchBar = this.handleSearchBar.bind(this);
    this.handleCheckboxAreLent = this.handleCheckboxAreLent.bind(this);
  }

  handleSearchBar(filterText) {
    this.setState({
      filterText: filterText
    });
  }

  handleCheckboxAreLent(areLent) {
    this.setState({
      areLent: areLent
    })
  }

  render() {
    return <div>
      <div className="container">
        <Menu filterText={this.state.filterText} areLent={this.state.areLent} onSearchBar={this.handleSearchBar} onCheckboxAreLent={this.handleCheckboxAreLent} />
        <BooksTable books={this.props.books} filterText={this.state.filterText}  areLent={this.state.areLent} />
      </div>
      <Footer />
    </div>;
  }
}

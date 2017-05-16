import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function(){

  class BookRow extends React.Component {
    render() {
      return <div className="table-row">
        <div className="table__title">{this.props.title}</div>
        <div className="table__author">{this.props.author}</div>
        <div className="table__state">{this.props.state}</div>
        <div className="table__action">{this.props.action}</div>
      </div>;
    }
  }

  class BooksList extends React.Component {
    render() {
      return <div className="table-content">
      <BookRow title="Ginekolodzy" author="Jürgen Thorwald" state="na miejscu" action="..." />
      <BookRow title="House of Cards" author="Michael Dobbs" state="na miejscu" action="..." />
      <BookRow title="Sekrety urody Koreanek. Elementarz pielęgnacji" author="Charlotte Cho" state="pożyczona: Monika Konieczna" action="..." />
      <BookRow title="Zew Cthulhu" author="Howard Phillips Lovecraft" state="pożyczona: Olga Kierzkowska" action="..." />
      </div>
    }
  }

  class BooksTable extends React.Component {
    render() {
      return <div className="books-list">
        <BookRow title="tytuł" author="autor" state="stan" action="akcje" />
        <hr />
        <BooksList />
      </div>;
    }
  }

  class Footer extends React.Component {
    render() {
      return <footer>
        <p>Ewa Dworczak, 2017</p>
      </footer>;
    }
  }

  class Menu extends React.Component {
    render() {
      const logo = "./img/logo.png";
      return <div className="menu">
        <div><img src={logo} /></div>
        <div><a>Ustawienia</a></div>
      </div>;
    }
  }

  class App extends React.Component {
    render() {
      return <div>
        <div className="container">
          <Menu />
          <BooksTable />
        </div>
        <Footer />
      </div>;
    }
  }

  ReactDOM.render(
    <App />,
    document.getElementById('app')
  );
});

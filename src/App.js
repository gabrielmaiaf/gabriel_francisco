import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Components
import Header from './components/header';

// Pages
import AddCharacter from './pages/add-character';
import ListView from './pages/list-view';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <Route exact path="/" component={ListView} />
          <Route path="/add" component={AddCharacter} />
        </div>
      </div>
    );
  }
}

export default App;

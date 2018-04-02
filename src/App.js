import React, { Component } from 'react';

import './App.css';
import ListContainer from './components/ListContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>RATHAUS GROCERY MANAGER</h1>
        <ListContainer />
      </div>
    );
  }
}

export default App;

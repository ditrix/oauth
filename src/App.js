import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleOAuth from './components/GoogleOAuth'


class App extends Component {
  
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <GoogleOAuth />
        </header>
      </div>
    );
  }
}

export default App;

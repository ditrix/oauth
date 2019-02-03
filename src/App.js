import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleOAuth from './components/GoogleOAuth'
import FacebookOAuth from './components/FacebookOAuth'

class App extends Component {
  
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <FacebookOAuth />
        {/*  <GoogleOAuth />*/}
        </header>
      </div>
    );
  }
}

export default App;

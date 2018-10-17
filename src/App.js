import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './components/Home';
import coinHome from './components/coinHome';

const NoMatch = () => (
  <div className="container align-items-center">
      <h3 >
          <img src="/static/error.png" alt="error" height="300px"/>
      </h3>
  </div>
);

class App extends Component {
  render() {
    return (
      <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/coins/:id" component={coinHome}/>
          <Route component={NoMatch} />
        </Switch>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;

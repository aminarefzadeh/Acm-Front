import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ResponsiveDrawer from './drawer_responsive';
import Login from './login';
import Signup from './signup';
import Home from './home';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return (
      <ResponsiveDrawer>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={Signup} />
              <Route path="/home" exact component={Home} />
            </Switch>
          </BrowserRouter>
      </ResponsiveDrawer>
      
    );
  }
}



export default connect(null, null)(App);
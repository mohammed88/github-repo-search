import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ReposListView from './views/ReposListView/';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={ReposListView} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

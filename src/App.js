import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import ReposListView from './views/ReposListView/';
import RepoDetailsView from './views/RepoDetailsView/';
import NotFoundView from './views/NotFoundView/';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={ReposListView} />
            <Route path="/repo/:owner/:repo" component={RepoDetailsView} />
            <Route component={NotFoundView} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

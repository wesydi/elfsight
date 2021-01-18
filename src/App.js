import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Main from './components/Main/Main';
import Menu from './components/Menu/Menu';

const App = () => (
  <Router>
    <Route path="/">
      <Menu />
    </Route>
    <Route path="/albums/:id/photos">
      <Main />
    </Route>
  </Router>
);

export default App;

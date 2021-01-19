import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Main from './components/Main/Main';

const App = () => (
  <Router>
    <Route path="/">
      <Main />
    </Route>
  </Router>
);

export default App;

import React from 'react';
import {
  Route,
} from 'react-router-dom';
import './Main.css';
import Menu from '../Menu/Menu';

const Main = () => (
  <div className="main">
    <Menu />
    <Route path="/albums/:id/photos">
      <div className="gallery" />
    </Route>
  </div>
);

export default Main;

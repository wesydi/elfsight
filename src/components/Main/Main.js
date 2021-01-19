import React from 'react';
import {
  Route,
} from 'react-router-dom';
import './Main.css';
import Menu from '../Menu/Menu';
import Gallery from '../Gallery/Gallery';

const Main = () => (
  <div className="main">
    <Menu />
    <Route path="/albums/:id/photos">
      <Gallery />
    </Route>
  </div>
);

export default Main;

import React, { useEffect, useState } from 'react';
import {
  Route,
  useLocation,
} from 'react-router-dom';
import './Main.css';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Menu from '../Menu/Menu';
import Gallery from '../Gallery/Gallery';
import galleryActions from '../../actions/galleryActions';
import Lightbox from '../Lightbox/Lightbox';

const url = 'https://jsonplaceholder.typicode.com';

const Main = ({ dispatch }) => {
  const [data, setData] = useState(null);
  const [isAlbum, setIsAlbum] = useState(false);
  const location = useLocation();

  useEffect(async () => {
    if (location.pathname.includes('fullscreen')) return;
    if (location.pathname.includes('albums')) {
      setIsAlbum(true);
    } else {
      setIsAlbum(false);
    }
    try {
      const path = location.pathname === '/' ? '/users' : location.pathname;
      const response = await axios.get(`${url}${path}`);
      if (!location.pathname.includes('photos')) {
        setData(response.data);
      } else {
        galleryActions(dispatch).addPhotos(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [location]);

  return (
    <div className="main">
      <Menu data={data} isAlbum={isAlbum} />
      <Route path="/albums/:id/photos">
        <Gallery />
      </Route>
      <Route path="/albums/:id/photos/fullscreen/:id">
        <Lightbox />
      </Route>
    </div>
  );
};

Main.defaultProps = {
  dispatch: () => {},
};

Main.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(Main);

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
  const [dataMenu, setDataMenu] = useState([]);
  const [isAlbum, setIsAlbum] = useState(false);
  const location = useLocation();
  const splitLocation = location.pathname.split('/');

  useEffect(async () => {
    setIsAlbum(location.pathname.includes('albums'));
    try {
      if (location.pathname === '/' || location.pathname === '/users') {
        const response = await axios.get(`${url}/users`);
        setDataMenu(response.data);
      }
      if (location.pathname.includes('users') && location.pathname.includes('albums')) {
        const response = await axios.get(`${url}${splitLocation.slice(0, 4).join('/')}`);
        const responseWithPhotos = response.data.map(async (album) => {
          const photos = await axios.get(`${url}/albums/${album.id}/photos`);
          return { ...album, length: photos.data.length, cover: photos.data[0].thumbnailUrl };
        });
        Promise.all(responseWithPhotos).then((results) => {
          setDataMenu(results);
        });
      }
      if (location.pathname.includes('photos') && !location.pathname.includes('fullscreen')) {
        const response = await axios.get(`${url}/${splitLocation.slice(3).join('/')}`);
        galleryActions(dispatch).addPhotos(response.data);
      }
      if (location.pathname.includes('fullscreen')) {
        const response = await axios.get(`${url}/${splitLocation.slice(3, 6).join('/')}`);
        galleryActions(dispatch).addPhotos(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [location]);

  return (
    <div className="main">
      <Menu data={dataMenu} isAlbum={isAlbum} />
      <Route path="/users/:id/albums/:id/photos">
        <Gallery />
      </Route>
      <Route path="/users/:id/albums/:id/photos/fullscreen/:id">
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

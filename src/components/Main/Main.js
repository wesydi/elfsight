import React, { useEffect, useState } from 'react';
import {
  Route,
  useLocation,
} from 'react-router-dom';
import './Main.scss';
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
        const users = await axios.get(`${url}/users`);
        setDataMenu(users.data);
      }
      if (location.pathname.includes('albums')) {
        const pathToAlbums = `${splitLocation.slice(0, 4).join('/')}`;
        const albums = await axios.get(`${url}${pathToAlbums}`);
        const filledAlbums = albums.data.map(async (album) => {
          const photos = await axios.get(`${url}/albums/${album.id}/photos`);
          return { ...album, length: photos.data.length, cover: photos.data[0].thumbnailUrl };
        });
        Promise.all(filledAlbums).then((results) => {
          setDataMenu(results);
        });
      }
      if (location.pathname.includes('photos')) {
        const pathToPhotos = `${splitLocation.slice(3, 6).join('/')}`;
        const photos = await axios.get(`${url}/${pathToPhotos}`);
        galleryActions(dispatch).addPhotos(photos.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [location]);

  return (
    <div className="main">
      <Menu data={dataMenu} isAlbum={isAlbum} />
      <Route exact path={['/', '/users', '/users/:id/albums']}>
        <div className="placeholder">
          <span>Выберите пункт из меню</span>
        </div>
      </Route>
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

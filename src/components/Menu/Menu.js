import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import galleryActions from '../../actions/galleryActions';
import './Menu.scss';

const url = 'https://jsonplaceholder.typicode.com';

const Menu = ({ dispatch }) => {
  const [data, setData] = useState(null);
  const [isAlbum, setIsAlbum] = useState(false);
  const location = useLocation();

  useEffect(async () => {
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
    <nav className="menu">
      <div className="menu__list">
        <ul>
          {
            data ? (
              data.map((el) => (
                <li key={el.id}>
                  <NavLink activeClassName="menu__link_active" className="menu__link" to={isAlbum ? `/albums/${el.id}/photos` : `/users/${el.id}/albums`}>{el.name || el.title}</NavLink>
                  <hr />
                </li>
              ))
            ) : null
          }
        </ul>
      </div>
    </nav>
  );
};

Menu.defaultProps = {
  dispatch: () => {},
};

Menu.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(Menu);

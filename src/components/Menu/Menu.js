import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, useLocation, Link } from 'react-router-dom';
import './Menu.scss';
import Loader from '../Loader/Loader';

const Menu = ({ data, isAlbum }) => {
  const location = useLocation();
  const [widthWindow, setWidthWindow] = useState(window.innerWidth);
  const [isOpenBurger, setIsOpenBurger] = useState(false);
  const [isPhotosLoaded, setIsPhotosLoaded] = useState(false);
  const currentUserId = location.pathname.split('/')[2];

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidthWindow(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    setIsPhotosLoaded(false);
  }, [currentUserId]);

  const renderBurgerMenu = () => (
    <div
      role="presentation"
      onClick={() => setIsOpenBurger(!isOpenBurger)}
      className={`menu-btn ${isOpenBurger ? 'menu-btn_open' : ''}`}
    >
      <div className="menu-btn__burger" />
    </div>
  );

  const renderList = () => {
    if (data.length > 0) {
      return (
        <>
          { isAlbum ? <Link to="/users" className="menu__button">←</Link> : null }
          {isAlbum && !isPhotosLoaded ? <Loader /> : null}
          <div className={`menu__list ${isAlbum && !isPhotosLoaded ? 'menu__list_empty' : ''}`}>
            <ul>
              {
                data.map((el, index) => (
                  <li key={el.id}>
                    {isAlbum ? <img onLoad={() => (index === data.length - 1 ? setIsPhotosLoaded(true) : null)} className="menu__cover" src={el.cover} alt="Cover of album" /> : null}
                    <NavLink
                      onClick={() => (isOpenBurger && isAlbum ? setIsOpenBurger(false) : null)}
                      activeClassName="menu__link_active"
                      className="menu__link"
                      to={isAlbum ? `/users/${currentUserId}/albums/${el.id}/photos` : `/users/${el.id}/albums`}
                    >{el.name || `${el.title} (${el.length})`}
                    </NavLink>
                    <hr />
                  </li>
                ))
              }
            </ul>
          </div>
        </>
      );
    }
    return <Loader />;
  };

  return (
    <nav className={`menu ${isOpenBurger ? 'menu_full' : ''}`}>
      {
        widthWindow <= 768 ? renderBurgerMenu() : null
      }
      {
        widthWindow > 768 || isOpenBurger ? renderList() : null
      }
    </nav>
  );
};

Menu.defaultProps = {
  data: [],
  isAlbum: false,
};

Menu.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  isAlbum: PropTypes.bool,
};

export default connect()(Menu);

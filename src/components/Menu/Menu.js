import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, useLocation, Link } from 'react-router-dom';
import './Menu.scss';
import Loader from '../Loader/Loader';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

const Menu = ({ data, isAlbum }) => {
  const location = useLocation();
  const [widthWindow, setWidthWindow] = useState(0);
  const [isOpenBurger, setIsOpenBurger] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidthWindow(window.innerWidth);
    });
  }, []);

  const handleClick = (stateBurger) => {
    setIsOpenBurger(stateBurger);
  };

  const renderList = () => (data.length > 0 ? (
    <>
      { isAlbum ? <Link to="/users" className="menu__button">←</Link> : null }
      <div className="menu__list">
        <ul>
          {
          data.map((el) => (
            <li key={el.id}>
              {isAlbum ? <img className="menu__cover" src={el.cover} alt="Cover of album" /> : null}
              <NavLink
                onClick={() => (isOpenBurger && isAlbum ? setIsOpenBurger(false) : null)}
                activeClassName="menu__link_active"
                className="menu__link"
                to={isAlbum ? `/users/${location.pathname.split('/')[2]}/albums/${el.id}/photos` : `/users/${el.id}/albums`}
              >{el.name || `${el.title} (${el.length})`}
              </NavLink>
              <hr />
            </li>
          ))
        }
        </ul>
      </div>
    </>
  ) : <Loader />);

  return (
    <nav className={`menu ${isOpenBurger ? 'menu_full' : null}`}>
      {
        widthWindow <= 768 ? <BurgerMenu isOpen={isOpenBurger} handleClick={handleClick} /> : null
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
  data: PropTypes.oneOfType(PropTypes.array, PropTypes.object),
  isAlbum: PropTypes.bool,
};

export default connect()(Menu);

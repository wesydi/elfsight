import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './Menu.scss';
import Loader from '../Loader/Loader';

const Menu = ({ data, isAlbum }) => (
  <nav className="menu">
    {
        data ? (
          <div className="menu__list">
            <ul>
              {
              data ? (
                data.map((el) => (
                  <li key={el.id}>
                    <NavLink
                      onClick={(event) => {
                        if (event.target.classList.contains('menu__link_active')) event.preventDefault();
                      }}
                      activeClassName="menu__link_active"
                      className="menu__link"
                      to={isAlbum ? `/albums/${el.id}/photos` : `/users/${el.id}/albums`}
                    >{el.name || el.title}
                    </NavLink>
                    <hr />
                  </li>
                ))
              ) : null
            }
            </ul>
          </div>
        ) : <Loader />
      }
  </nav>
);

Menu.defaultProps = {
  data: [],
  isAlbum: false,
};

Menu.propTypes = {
  data: PropTypes.oneOfType(PropTypes.array, PropTypes.object),
  isAlbum: PropTypes.bool,
};

export default connect()(Menu);

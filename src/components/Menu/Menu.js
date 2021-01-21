import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, useLocation, Link } from 'react-router-dom';
import './Menu.scss';
import Loader from '../Loader/Loader';

const Menu = ({ data, isAlbum }) => {
  const location = useLocation();

  return (
    <nav className="menu">
      {
        isAlbum ? <Link to="/users" className="menu__button">←</Link> : null
      }
      {
        data.length > 0 ? (
          <div className="menu__list">
            <ul>
              {
                data.map((el) => (
                  <li key={el.id}>
                    <NavLink
                      activeClassName="menu__link_active"
                      className="menu__link"
                      to={isAlbum ? `/users/${location.pathname.split('/')[2]}/albums/${el.id}/photos` : `/users/${el.id}/albums`}
                    >{el.name || el.title}
                    </NavLink>
                    <hr />
                  </li>
                ))
            }
            </ul>
          </div>
        ) : <Loader />
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

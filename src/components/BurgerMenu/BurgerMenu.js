import React from 'react';
import './BurgerMenu.scss';
import PropTypes from 'prop-types';

const BurgerMenu = ({ handleClick, isOpen }) => (
  <div
    role="presentation"
    onClick={() => {
      handleClick(!isOpen);
    }}
    className={`menu-btn ${isOpen ? 'menu-btn_open' : null}`}
  >
    <div className="menu-btn__burger" />
  </div>
);

BurgerMenu.defaultProps = {
  handleClick: () => {},
  isOpen: false,
};

BurgerMenu.propTypes = {
  handleClick: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default BurgerMenu;

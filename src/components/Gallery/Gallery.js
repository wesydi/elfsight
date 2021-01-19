import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Gallery.scss';

const mapStateToProps = (state) => ({
  photos: state.photos,
});

const Gallery = ({ photos }) => (
  <ul className="gallery">
    {
        photos.length > 0 ? photos.map((photo) => (
          <li key={photo.id}>
            <img className="gallery__photo" src={photo.thumbnailUrl} alt={photo.id} />
          </li>
        )) : null
      }
  </ul>
);

Gallery.defaultProps = {
  photos: [],
};

Gallery.propTypes = {
  photos: PropTypes.oneOfType(PropTypes.array, PropTypes.object),
};

export default connect(mapStateToProps)(Gallery);

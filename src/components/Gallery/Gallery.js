import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Gallery.scss';
import { Link, useLocation } from 'react-router-dom';
import Loader from '../Loader/Loader';
import galleryActions from '../../actions/galleryActions';

const mapStateToProps = (state) => ({
  photos: state.photos,
});

const Gallery = ({ photos, dispatch }) => {
  const [isLast, setIsLast] = useState(false);
  const location = useLocation();

  useEffect(() => () => {
    galleryActions(dispatch).addPhotos([]);
  }, []);

  useEffect(() => {
    if (photos.length > 0) {
      setIsLast(false);
    }
  }, [photos]);

  return (
    <div className="gallery">
      {!isLast ? <Loader /> : null}
      <ul className={`gallery__list ${!isLast ? 'gallery__list_empty' : null}`}>
        {
          photos.length > 0 ? photos.map((photo, index) => (
            <li key={photo.id}>
              <Link to={`${location.pathname}/${photo.id}`} className="gallery__photo">
                <img
                  onLoad={() => (index === photos.length - 1 ? setIsLast(true) : null)}
                  src={photo.thumbnailUrl}
                  alt={photo.id}
                />
              </Link>
            </li>
          )) : null
        }
      </ul>
    </div>
  );
};

Gallery.defaultProps = {
  photos: [],
  dispatch: () => {},
};

Gallery.propTypes = {
  photos: PropTypes.oneOfType(PropTypes.array, PropTypes.object),
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(Gallery);

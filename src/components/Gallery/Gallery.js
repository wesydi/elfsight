import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Gallery.scss';
import { Link, useLocation } from 'react-router-dom';
import Loader from '../Loader/Loader';

const mapStateToProps = (state) => ({
  photos: state.photos,
  currentAlbumId: state.currentAlbumId,
});

const Gallery = ({
  photos, currentAlbumId,
}) => {
  const [isLast, setIsLast] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLast(false);
  }, [currentAlbumId]);

  return (
    <div className="gallery">
      {!isLast ? <Loader /> : null}
      <ul className={`gallery__list ${!isLast ? 'gallery__list_empty' : null}`}>
        {
          photos.length > 0 ? photos.map((photo, index) => (
            <li key={photo.id}>
              <Link to={`${location.pathname}/fullscreen/${photo.id}`}>
                <img
                  className="gallery__photo"
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
  currentAlbumId: 0,
};

Gallery.propTypes = {
  photos: PropTypes.oneOfType(PropTypes.array, PropTypes.object),
  currentAlbumId: PropTypes.number,
};

export default connect(mapStateToProps)(Gallery);

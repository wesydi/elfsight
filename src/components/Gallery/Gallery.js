import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Gallery.scss';
import galleryActions from '../../actions/galleryActions';

const mapStateToProps = (state) => ({
  photos: state.photos,
});

const Gallery = ({ photos, dispatch }) => {
  const [isLast, setIsLast] = useState(false);

  useEffect(() => () => {
    galleryActions(dispatch).addPhotos([]);
  }, []);

  useEffect(() => {
    setIsLast(false);
  }, [photos]);

  return (
    <div className="gallery">
      <ul className={`gallery__list ${!isLast ? 'gallery__list_empty' : null}`}>
        {
          photos.length > 0 ? photos.map((photo, index) => (
            <li key={photo.id}>
              <div className="gallery__photo">
                <img onLoad={() => (index === photos.length - 1 ? setIsLast(true) : null)} src={photo.thumbnailUrl} alt={photo.id} />
              </div>
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

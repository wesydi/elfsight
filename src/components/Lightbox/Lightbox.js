import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import './Lightbox.scss';
import PropTypes from 'prop-types';

const mapStateToProps = (state) => ({
  photos: state.photos,
});

const Lightbox = ({ photos }) => {
  const [url, setUrl] = useState('');
  const location = useLocation().pathname.split('/');
  const history = useHistory();
  let currentIdPhoto = Number(location[location.length - 1]);

  useEffect(() => {
    if (photos.length > 0) {
      const currentPhoto = photos.find((photo) => photo.id === currentIdPhoto);
      setUrl(currentPhoto.url);
    }
  }, [photos, currentIdPhoto]);

  return (
    <div className="lightbox">
      <div className="lightbox__buttons">
        <button onClick={() => history.push(location.slice(0, 6).join('/'))} type="button" className="lightbox__button lightbox__button_close">×</button>
        <button
          onClick={() => {
            currentIdPhoto += 1;
            history.push(String(currentIdPhoto));
          }}
          type="button"
          className="lightbox__button lightbox__button_next"
          disabled={photos.length > 0 ? currentIdPhoto === photos[photos.length - 1].id : false}
        >→
        </button>
        <button
          onClick={() => {
            currentIdPhoto -= 1;
            history.push(String(currentIdPhoto));
          }}
          type="button"
          className="lightbox__button lightbox__button_prev"
          disabled={photos.length > 0 ? currentIdPhoto === photos[0].id : false}
        >←
        </button>
      </div>
      <div className="lightbox__content">
        {url.length > 0 ? <img alt="" src={url} /> : null}
      </div>
    </div>
  );
};

Lightbox.defaultProps = {
  photos: [],
};

Lightbox.propTypes = {
  photos: PropTypes.oneOfType(PropTypes.array, PropTypes.object),
};

export default connect(mapStateToProps)(Lightbox);

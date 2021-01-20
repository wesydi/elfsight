import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import './Lightbox.scss';
import PropTypes from 'prop-types';

const mapStateToProps = (state) => ({
  photos: state.photos,
});

const Lightbox = (props) => {
  const { photos } = props;
  const [url, setUrl] = useState(0);
  const location = useLocation().pathname.split('/');
  const history = useHistory();
  let currentIdPhoto = Number(location[location.length - 1]);

  useEffect(() => {
    const currentPhoto = photos.find((photo) => photo.id === currentIdPhoto);
    setUrl(currentPhoto.url);
  }, [currentIdPhoto]);

  return (
    <div className="lightbox">
      <div className="lightbox__buttons">
        <button onClick={() => history.push(location.slice(0, 4).join('/'))} type="button" className="lightbox__button lightbox__button_close">×</button>
        <button
          onClick={() => {
            currentIdPhoto += 1;
            history.push(String(currentIdPhoto));
          }}
          type="button"
          className="lightbox__button lightbox__button_next"
        >→
        </button>
        <button
          onClick={() => {
            currentIdPhoto -= 1;
            history.push(String(currentIdPhoto));
          }}
          type="button"
          className="lightbox__button lightbox__button_prev"
        >←
        </button>
      </div>
      <div className="lightbox__content">
        <img alt="" src={url} />
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

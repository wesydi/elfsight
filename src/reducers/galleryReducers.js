const INITIAL_STATE = {
  photos: {},
  currentAlbumId: 0,
};

const galleryReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_PHOTOS':
      return {
        ...state,
        photos: action.photos,
        currentAlbumId: action.photos[0] ? action.photos[0].albumId : 0,
      };
    default:
      return state;
  }
};

export default galleryReducers;

const INITIAL_STATE = {
  photos: {},
};

const galleryReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_PHOTOS':
      return {
        ...state,
        photos: action.photos,
      };
    default:
      return state;
  }
};

export default galleryReducers;

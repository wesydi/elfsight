const galleryActions = (dispatch) => ({
  addPhotos: (photos) => dispatch({ type: 'ADD_PHOTOS', photos }),
});

export default galleryActions;

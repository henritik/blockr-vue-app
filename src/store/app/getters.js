export default {
  getSignUpForm(state) {
    return state.signUpForm;
  },
  getCategories(state) {
    return state.categories;
  },
  getAlbumInfo(state) {
    return state.albumInfo;
  },
  getAlbums(state) {
    return state.albums;
  },
  getTags(state) {
    return state.tags;
  },
  getActiveTags(state) {
    return state.activeTags;
  },
  getPhotosTimeline(state) {
    return state.photosTimeline;
  },
  getSearchText(state) {
    return state.searchText;
  },
  getFilterSection(state) {
    return state.filterSection;
  },
  getAlbumsSectionOnMobile(state) {
    return state.albumsSectionOnMobile;
  },
  getBackdrop(state) {
    return state.backdrop;
  },
  getFetchStatus(state) {
    return state.fetchStatus;
  },
  getDarkmode(state) {
    return state.darkmode;
  },
  getUnsafe(state) {
    return state.unsafe;
  },
  getSafemode(state) {
    return state.safemode;
  },
  getOrder(state) {
    return state.order;
  },
  getMode(state) {
    return state.mode;
  },
  getAlbumState(state) {
    return state.albumState;
  },
  getInitialLoad(state) {
    return state.initialLoad;
  }
};

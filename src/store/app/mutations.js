export default {
  setAlbums(state, payload) {
    state.albums = payload;
  },
  setAlbumInfo(state, payload) {
    state.albumInfo = payload;
  },
  setCategories(state, payload) {
    state.categories = payload;
  },
  setTags(state, payload) {
    state.tags = payload;
  },
  setActiveTags(state, payload) {
    state.activeTags = payload;
  },
  setPhotosTimeline(state, payload) {
    state.photosTimeline = payload;
  },
  setSearchTimeline(state, payload) {
    state.photosTimeline = payload;
  },
  morePhotosTimeline(state, payload) {
    state.photosTimeline = [...state.photosTimeline, ...payload];
  },
  setSearchText(state, payload) {
    state.searchText = payload;
  },
  toggleFilterSection(state) {
    state.filterSection = !state.filterSection;
  },
  setAlbumsSectionOnMobile(state, payload) {
    state.albumsSectionOnMobile = payload;
  },
  toggleBackdrop(state) {
    state.backdrop = !state.backdrop;
  },
  setFetchStatus(state, payload) {
    state.fetchStatus = payload;
  },
  setUnsafe(state, payload) {
    state.unsafe = payload;
  },
  safemode(state, payload) {
    state.safemode = payload;
  },
  darkmode(state, payload) {
    state.darkmode = payload;
  },
  setOrder(state, payload) {
    state.order = payload;
  },
  setMode(state, payload) {
    state.mode = payload;
  },
  setAlbumState(state, payload) {
    state.albumState = payload;
  },
  setInitialLoad(state, payload) {
    state.initialLoad = payload;
  }
};

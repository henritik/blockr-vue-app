import Vue from "vue";
import Vuex from "vuex";
import getters from "./app/getters";
import mutations from "./app/mutations";
import actions from "./app/actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    albums: [],
    photosTimeline: [],
    unsafe: [],
    safemode: true,
    searchText: "",
    filterSection: false,
    albumsSectionOnMobile: false,
    backdrop: false,
    fetchStatus: false,
    darkmode: false,
    categories: [],
    albumState: false,
    tags: [],
    activeTags: [],
    albumInfo: [],
    order: "desc",
    mode: "",
    initialLoad: true
  },
  getters,
  mutations,
  actions,
  modules: {
  },
});

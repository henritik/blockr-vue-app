import Axios from "axios";

const baseURL = process.env.VUE_APP_WP_URL;
const apiURL = process.env.VUE_APP_API_URL;
const unsafeTag = process.env.VUE_APP_UNSAFE_TAG_ID;
const multiGalleryCat = process.env.VUE_APP_MULTI_GALLERY_CAT_ID;

let urlParameters = {
  order: "desc",
  page: 20,
  perPage: 1,
  totalPosts: null,
  endpoint: "media"
};

const urlGenerator = (newUrl) => {
  newUrl.forEach((item) => {
    const { type, value } = item;
    urlParameters = {
      ...urlParameters,
      [type]: value,
    };
  });

  let url =
    `${baseURL}/${apiURL}` +
    `/${urlParameters.endpoint}?per_page=${urlParameters.perPage}&page=${urlParameters.page}&order=${urlParameters.order}`;

  return url;
};

export default {
  async fetchAll({ getters, commit }) {
    commit("setFetchStatus", true);
    commit("setPhotosTimeline", null);
    commit("setMode", "fetchAll");
    commit("setAlbumState", false);
    commit("setInitialLoad", true);
    let albums = getters.getAlbums;
    let tags = getters.getTags;

    if ( !albums.length ) {
      try {  
        await Promise.all([
          Axios.get(
            urlGenerator([
              { type: "endpoint", value: "attachment_category" },
              { type: "perPage", value: 100 },
              { type: "page", value: 1 }
            ])
          ).then(({ data }) => {
            if (data.length) {
              if (multiGalleryCat) {
                data.forEach((element) => {
                  if (element.count > 0 && element.parent == multiGalleryCat) {         
                    albums.push({ [element.id]: element });
                  }
                });
              } else {
                data.forEach((element) => {
                  if (element.count > 0) {            
                    albums.push({ [element.id]: element });
                  }
                });
              }
            }
            albums.reverse();
            commit("setAlbums", albums);
          })
        ]);
      } catch (error) {
        console.log(error);
      }
    }
    if ( /\d/.test(unsafeTag) ) {
      try {  
        await Promise.all([
          Axios.get(
            `${baseURL}/${apiURL}/media?attachment_tag=${unsafeTag}&per_page=100`
          ).then(({ data }) => {          
            if (data.length) {
              commit("setUnsafe", data);
            }     
          }),
        ]);
      } catch (error) {
        console.log(error);
      }
    } 
    if (multiGalleryCat) {
      try {
        await Promise.all([    
          Axios.get(
            urlGenerator([
              { type: "endpoint", value: "media" },
              { type: "perPage", value: 20 },
              { type: "page", value: 1 },
              { type: "order", value: "desc" }
            ]) + `&attachment_category=${ getters.getAlbums.map(e => Object.keys(e)).toString() }`
          ).then(({ data, headers }) => {
            if (data.length) {
              if ( getters.getSafemode ) {
                getters.getUnsafe.forEach((element) => {
                  data = data.filter(e => e.id !== element.id);
                });
              }
              commit("setPhotosTimeline", data);     
              urlParameters.totalPosts = headers['x-wp-total'];
            }
          })
        ]);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await Promise.all([    
          Axios.get(
            urlGenerator([
              { type: "endpoint", value: "media" },
              { type: "perPage", value: 20 },
              { type: "page", value: 1 },
              { type: "order", value: getters.getOrder }
            ])
          ).then(({ data, headers }) => {
            if (data.length) {
              if ( getters.getSafemode ) {
                getters.getUnsafe.forEach((element) => {
                  data = data.filter(e => e.id !== element.id);        
                });
              } 
              commit("setPhotosTimeline", data);
              urlParameters.totalPosts = headers['x-wp-total'];
            }
          })
        ]);
      } catch (error) {
        console.log(error);
      }
    }
    if ( !tags.length ) {
      try {  
        await Promise.all([
          Axios.get(
            urlGenerator([
              { type: "endpoint", value: "attachment_tag" },
              { type: "perPage", value: 100 },
              { type: "page", value: 1 }
            ])
          ).then(({ data }) => {
            if (data.length) {
              if (multiGalleryCat) {
                let multiGalleryTags = [];
                getters.getPhotosTimeline.forEach((element) => {  
                  element.attachment_tag.map(e => multiGalleryTags.push(e));
                });
                data = data.filter((e) => multiGalleryTags.includes(e.id)); 
              }
              data.forEach((element) => {
                if (element.count > 0) {
                  tags.push(element);                 
                }       
              });
            }
            commit("setTags", tags);
          }),
        ]);
      } catch (error) {
        console.log(error);
      }
    }
    setTimeout(() => {
      commit("setFetchStatus", false);
    }, 500); 
  },

  async search({ getters, commit }, payload) {
    commit("setPhotosTimeline", null);
    commit("setActiveTags", []);
    commit("setSearchText", payload);
    commit("setMode", "search");
    commit("setInitialLoad", true);
    try {
      await Promise.all([
        Axios.get(
          urlGenerator([
            { type: "endpoint", value: "media/search/" + encodeURIComponent(payload) },
            { type: "perPage", value: 20 },
            { type: "page", value: 1 },
            { type: "order", value: getters.getOrder }
          ])
        ).then(({ data }) => {
          if (data.length) {
            if (multiGalleryCat) {            
              data = data.filter(e => e.attachment_category[0].parent == multiGalleryCat);
            }
            if ( getters.getSafemode ) {
              getters.getUnsafe.forEach((element) => {
                data = data.filter(e => e.id !== element.id);       
              });
            }
            if (data.length) {    
              commit("setPhotosTimeline", data);
              urlParameters.totalPosts = data.length;
            }
          }
        })
      ]);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      commit("setFetchStatus", false);
    }, 500); 
  },

  async album({ getters, commit }, payload) {
    commit("setPhotosTimeline", null);
    commit("setAlbumInfo", null);
    commit("setMode", "album");
    commit("setAlbumState", payload[0].value);
    commit("setInitialLoad", true);
    try {
      await Promise.all([
        Axios.get( 
          `${baseURL}/${apiURL}/attachment_category/${payload[0].value}`   
        ).then(({ data }) => {
          commit("setAlbumInfo", data);
        }),
        Axios.get( 
          urlGenerator([
            { type: "endpoint", value: "media" },
            { type: "perPage", value: 20 },
            { type: "page", value: 1 },
            { type: "order", value: "desc" }
        ]) + `&attachment_category=${payload[0].value}`    
        ).then(({ data, headers }) => {
          if (data.length) {
            if ( getters.getSafemode ) {
              getters.getUnsafe.forEach((element) => {
                data = data.filter(e => e.id !== element.id);
              });
            }
            commit("setPhotosTimeline", data);
            urlParameters.totalPosts = headers['x-wp-total'];
          }
        })
      ]);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      commit("setFetchStatus", false);
    }, 500); 
  },

  async setTags({ getters, commit }, payload) {
    commit("setPhotosTimeline", null);
    commit("setSearchText", null);
    commit("setInitialLoad", true);
    commit("setMode", "tags");
    try {
      await Promise.all([
        Axios.get(
          urlGenerator([
            { type: "endpoint", value: "media" },
            { type: "perPage", value: 20 },
            { type: "page", value: 1 },
            { type: "order", value: getters.getOrder }
          ]) + `&attachment_tag=${payload.toString()}`
        ).then(({ data, headers }) => {
          if (data.length) {
            if ( getters.getSafemode ) {
              getters.getUnsafe.forEach((element) => {
                data = data.filter(e => e.id !== element.id);       
              });
            }
            commit("setPhotosTimeline", data);
            urlParameters.totalPosts = headers['x-wp-total'];
          }
        })     
      ]);
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      commit("setFetchStatus", false);
    }, 500); 
  },

  async fetchMore({ getters, commit } ) {
    commit("setInitialLoad", false);
    if ( urlParameters.totalPosts > ( urlParameters.page * urlParameters.perPage ) && !getters.getBackdrop) {
      commit("setFetchStatus", true);
      if (getters.getMode === "fetchAll") {
        if (multiGalleryCat) {
          try {
            await Promise.all([
              Axios.get(
                urlGenerator([
                  { type: "endpoint", value: "media" },
                  { type: "page", value: urlParameters.page + 1 },
                  { type: "perPage", value: 20 },
                  { type: "order", value:  getters.getOrder }
                ]) + `&attachment_category=${ getters.getAlbums.map(e => Object.keys(e)).toString() }` 
              ).then(({ data }) => {
                if (data.length) {
                  if ( getters.getSafemode ) {
                    getters.getUnsafe.forEach((element) => {
                      data = data.filter(e => e.id !== element.id);
                    });
                  } 
                  commit("morePhotosTimeline", data);
                }
              })
            ]);
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            await Promise.all([
              Axios.get(
                urlGenerator([
                  { type: "endpoint", value: "media" },
                  { type: "page", value: urlParameters.page + 1 },
                  { type: "perPage", value: 20 },
                  { type: "order", value:  getters.getOrder }
                ])  
              ).then(({ data }) => {
                if (data.length) {
                  if ( getters.getSafemode ) {
                    getters.getUnsafe.forEach((element) => {
                      data = data.filter(e => e.id !== element.id);
                    });
                  } 
                  commit("morePhotosTimeline", data);
                }
              })
            ]);
          } catch (error) {
            console.log(error);
          }
        }
      } else if (getters.getMode === "album") {
        try {
          await Promise.all([
            Axios.get(
              urlGenerator([
                { type: "endpoint", value: "media" },
                { type: "page", value: urlParameters.page + 1 },
                { type: "perPage", value: 20 },
                { type: "order", value: "desc" }
              ]) + `&attachment_category=${getters.getAlbumState}`    
            ).then(({ data }) => {
              if (data.length) {
                if ( getters.getSafemode ) {
                  getters.getUnsafe.forEach((element) => {
                    data = data.filter(e => e.id !== element.id);
                  });
                } 
                commit("morePhotosTimeline", data);
              }
            })
          ]);
        } catch (error) {
          console.log(error);
        }
      } else if (getters.getMode === "tags") {
        try {
          await Promise.all([
            Axios.get(
              urlGenerator([
                { type: "endpoint", value: "media" },
                { type: "page", value: urlParameters.page + 1 },
                { type: "perPage", value: 20 },
                { type: "order", value:  getters.getOrder }
              ]) + `&attachment_tag=${getters.getActiveTags.toString()}`    
            ).then(({ data }) => {
              if (data.length) {
                if ( getters.getSafemode ) {
                  getters.getUnsafe.forEach((element) => {
                    data = data.filter(e => e.id !== element.id);
                  });
                } 
                commit("morePhotosTimeline", data);
              }
            })
          ]);
        } catch (error) {
          console.log(error);
        }
      } else if (getters.getMode === "search") {
        try {
          await Promise.all([
            Axios.get(  
              urlGenerator([
                { type: "endpoint", value: "media/search/" + getters.getSearchText },
                { type: "page", value: urlParameters.page + 1 },
                { type: "perPage", value: 20 },
                { type: "order", value:  getters.getOrder }
              ])
            ).then(({ data }) => {
              if (data.length) {
                if (multiGalleryCat) {            
                  data = data.filter(e => e.attachment_category[0].parent == multiGalleryCat);
                }
                if ( getters.getSafemode ) {
                  getters.getUnsafe.forEach((element) => {
                    data = data.filter(e => e.id !== element.id);
                  });
                } 
                commit("morePhotosTimeline", data);
              }
            })
          ]);
        } catch (error) {
          console.log(error);
        }
      }
    }
    setTimeout(() => {
      commit("setFetchStatus", false);
    }, 3000);
  },

  destroySearching({ commit, dispatch }) {
    commit("setSearchText", null);
    dispatch("fetchAll");
  },

  destroyTags({ commit, dispatch }) {
    commit("setActiveTags", []);
    dispatch("fetchAll");
  },

  setdarkmode({ commit }, payload) {
    commit("darkmode", payload);
  },

  setSafemode({ commit }, payload) {
    commit("safemode", payload);
  },
  
  setOrder({ commit }, payload) {
    commit("setOrder", payload);
  }
};

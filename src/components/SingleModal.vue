<template>
  <div class="fixed p-2" v-if="photo">
    <div class="ui-tips" v-show="getImageLoad">
      <p><span class="tip-icon"><font-awesome-icon :icon="['fas', 'fa-lightbulb']"/></span> Use your <span class="highlight"><font-awesome-icon :icon="['fas', 'fa-square-caret-left']"/></span> and <span class="highlight"><font-awesome-icon :icon="['fas', 'fa-square-caret-right']"/></span> 
        keys to navigate and <span class="highlight">ESC</span> or <span class="highlight"><font-awesome-icon :icon="['fas', 'fa-delete-left']"/></span> keys to close the window.</p>
    </div>
    <div class="single-layout col center">
      <div class="image-post">     
        <Loading v-show="!getImageLoad" single />
          <header class="row" v-show="getImageLoad">
            <div class="modal-control">
              <button type="button" class="modal-button"
                @click="openInNewTab(photo.source_url)"
                >Open original &#x1F86D; 
              </button>
              <div class="social row">
                <li
                @click="addLike"
                ><font-awesome-icon :icon="['fas', 'fa-heart']" size="xl"/>
                  {{ likes }}
                </li>
              </div>   
              <button type="button" class="modal-button" 
                @click="closeModal"
                >Close &#x2716; 
              </button>
            </div>
          </header>
        <div class="photo-container" v-show="getImageLoad">
          <div class="nav-arrow left">
            <label v-if="photos.length > 1" @click="nextPhoto('prev')">
              <font-awesome-icon :icon="['fas', 'fa-chevron-left']" size="xl"/>
            </label>
          </div>
        <img
          v-if="getImageInit"
          :src="getImgSrc"
          :alt="title"
          class="single-image"
          @load="imageLoad = true"
        />
          <div class="nav-arrow right">
            <label v-if="photos.length > 1" @click="nextPhoto('next')">
              <font-awesome-icon :icon="['fas', 'fa-chevron-right']" size="xl"/>
            </label>
          </div>
        </div>
      </div>
        <footer class="row justify-center" v-show="getImageLoad">
          <div v-if="title" class="title">{{ this.title }}</div>
          <div v-if="caption" class="caption">{{ this.caption }}</div>
          <div v-if="blockchain" class="blockchain">
          <p class="proofed"><strong>The truth is not out there. It's right here.</strong> This image is proofed in <a :href="'https://etherscan.io/tx/'+ blockchain.timestamps[1].transaction" target="_blank">Ethereum blockchain</a>.
          Please see more details in the proof below.</p>
          <button type="button" class="modal-button"
              @click="getProof(photo.id)"
              >Download proof (PDF) 
          </button>
          </div>
        </footer>
      </div>
  </div>
</template>
<script>

import Loading from "@/components/UI/Loading.vue";
import Axios from "axios";

const baseURL = process.env.VUE_APP_WP_URL;
const apiURL = process.env.VUE_APP_API_URL;
const endpoint = "media";

export default {
  name: "SingleModal",
  props: {
    photos: Array,
  },
  components: {
    Loading,
  },
  data() {
    return {
      photo: [],
      likes: null,
      blockchain: false,
      imageLoad: false,
      imageInit: false,
      title: null,
      caption: null
    };
  },
  computed: {
    getImageLoad() {
      return this.imageLoad;
    },
    getImageInit() {
      return this.imageInit;
    },
    getImgSrc() {
      if (this.photo.media_details.sizes.large) {
        return this.photo.media_details.sizes.large.source_url + process.env.VUE_APP_ADDITIONAL_FILE_EXTENSION_LARGE;    
      } else {
        return this.photo.source_url + process.env.VUE_APP_ADDITIONAL_FILE_EXTENSION_LARGE;
      }
    }
  },
  methods: {
    photoInit(id) {
      const index = this.photos.findIndex( (e) => e['id'] === id );  
      this.photo = this.photos[index];
      this.title = this.photos[index].title.rendered;
      this.caption = this.photos[index].caption.rendered.replace( /(<([^>]+)>)/ig, '');
      this.imageInit = true;
    },
    closeModal() {
      if (this.$store.getters.getMode === "album") {
        this.$router.push({ name: 'albumAfter', params: { album: this.$store.getters.getAlbumState } });
      } else {
        this.$router.push({ name: 'homeAfter'});
      }
    },
    nextPhoto(dir) {
      this.imageLoad = false;
      this.imageInit = false;
      const i = this.photos.findIndex( (e) => e['id'] === this.photo.id );
      let newIndex = null;
      if (dir === "prev") {
        i > 0 ? newIndex = i - 1 : newIndex = this.photos.length - 1;
      } else {
        this.photos.length > i + 1 ? newIndex = i + 1 : newIndex = 0;
      }
      this.$router.push({ name: 'photo', params: { id: this.photos[newIndex].id } });
      this.photoInit(this.photos[newIndex].id);
      this.getLikes(this.photos[newIndex].id);
      this.getBlockchain(this.photos[newIndex].id);
    },
    openInNewTab(url) {
      window.open(url, '_blank', 'noreferrer');
    },
    async addLike() {
      try {
        const response = await Axios.post(
          `${baseURL}/${apiURL}/${endpoint}/likes/${this.$route.params.id}`
        );
        if (response) {
          this.likes = response.data;
        } 
      } catch (error) {
        console.log(error);
      }
    },
    async getLikes(id) {
      try {
        const response = await Axios.get(
          `${baseURL}/${apiURL}/${endpoint}/likes/${id}`
        );
        if (response) {
          this.likes = response.data;
        } 
      } catch (error) {
        console.log(error);
      }
    },
    async getBlockchain(id) {
      try {
        const response = await Axios.get(
          `${baseURL}/${apiURL}/${endpoint}/blockchain/${id}`
        );
        if (response) {
          this.blockchain = response.data;
        } 
      } catch (error) {
        console.log(error);
      }
    },
    async getProof(id) {
      try {
        const response = await Axios.get(
            `${baseURL}/${apiURL}/${endpoint}/proof/${id}`    
        );
        if (response) {
          this.openInNewTab(response.data);
        } 
      } catch (error) {
        console.log(error);
      }
    }
  },
  async mounted(){ 
    const id = this.$route.params.id;  
    this.photoInit(id);
    this.getLikes(id);
    this.getBlockchain(id);
    
    this._keyListener = function(e) {
      if (this.$route.name === "photo") {
        if (e.key === "ArrowRight" && this.photos.length > 1) {
          e.preventDefault(); 
          this.nextPhoto("next");
        }
        else if (e.key === "ArrowLeft" && this.photos.length > 1) {
          e.preventDefault();
          this.nextPhoto("prev");
        }
        else if (e.key === "Escape" || e.key === "Backspace") {
          e.preventDefault();  
          this.closeModal();
        }
      }
    };
    document.addEventListener('keydown', this._keyListener.bind(this));
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this._keyListener);
  }
};
</script>

<style lang="scss" scoped>
.single-layout {
  height: 100%;

  color: white;
  .loading-container {
    margin: 0;
  }
  .single-image {
    width: calc(100% - 60px);
    max-width: 1024px;
    border-radius: 1rem;
    box-shadow: 0 3px 18px -5px #000;
    background-color: var(--main-background-color);
    max-height: calc(100vh - 280px);
  }
  .photo-container {
    display: flex;
    flex-wrap: nowrap;
  }
  .nav-arrow {
    width: 30px;
    align-items: center;
    display: flex;
    color: rgba(255, 255, 255, 0.5);
    transition: all 0.4s cubic-bezier(0.445, 0.05, 0.55, 0.95);
    &:hover {
      color: #fff;
    }
  }
      .nav-arrow.left {
      justify-content: flex-start;
    }
      .nav-arrow.right {
      justify-content: flex-end;
    }
}
.image-post {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
header {
  width: 100%;
  padding: 1rem 30px;
  text-align: center;
  flex-wrap: wrap;
  flex-direction: column;
}
footer {
  width: 100%;
  padding: 1rem;
  text-align: center;
  flex-wrap: wrap;
  flex-direction: column;
}
button {
  color: #fff;
  background-color: rgba(130, 130, 130, 0.5);
  
  &:hover {
  background-color: rgba(255, 255, 255, 0.5);
  }
}
header {
  .modal-control {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
  
  .social {
    align-items: center;
    li {
      list-style: none;
      padding: 0 10px;
      display: flex;
      align-items: center;
      gap: 10px;
      svg:hover {
        cursor: pointer;
        color: var(--dark-red-color);
        transition: all 0.4s cubic-bezier(0.445, 0.05, 0.55, 0.95);
      }
    }
  }
}
footer {
  justify-content: center;

  .title {
    font-size: 1em;
    font-weight: 600;
    width: 100%;
  }
  .caption {
    font-size: 0.85em;
    font-weight: 500;
    line-height: 2.5em;
  }
  .blockchain {
    display: block;
    font-weight: 500;
    width: 100%;
  }
}
.proofed {
  font-size: 0.85em;
  a {
    font-weight: 500;
    
  strong, .hash {
    display: block;
    font-weight: 500;
    }
  }
}
@keyframes backgroundChange {
  0% {
    background: var(--main-background-color);
  }
  50% {
    background: var(--four-background-color);
  }
}

@media screen and (max-width: 400px) {
  button {
      font-size: 0.85em;
      padding: 0.4em 0.8em;
    }
  svg {
      font-size: 1em;
  }
}
</style>

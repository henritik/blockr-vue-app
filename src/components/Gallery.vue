<template>
  <div class="gallery">
    <LoadingComponent v-show="!load" />
    <template v-if="load">
      <masonry-wall 
        v-if="load && getPhotosFromStorage"
        :items="getPhotosFromStorage" 
        :column-width="270" 
        :max-columns="5"
        :gap="15"
      >
      <template v-slot:default="{ item }">
        <CardComponent :data="item"/>
      </template>
      </masonry-wall>
      <!-- infinite scroll loading -->
      <span v-show="$store.getters.getFetchStatus" class="infinite-status">
        <font-awesome-icon
          class="loading-spinner"
          :icon="['fas', 'fa-spinner']"
          size="lg"
        />Loading...
      </span>
    </template>
    <InfoAlert
      v-if="load && !getPhotosFromStorage && $store.getters.getMode === 'search'"
      text="Ups... 😪 We couldn't find what you're looking for."
    />
    <SingleModal :photos="getPhotosFromStorage" v-if="$route.name === 'photo'" />    
  </div>
</template>
  
  <script>
  import MasonryWall from '@yeger/vue2-masonry-wall'
  import CardComponent from "@/components/UI/Card/Card.vue";
  import LoadingComponent from "@/components/UI/Loading.vue";
  import InfoAlert from "@/components/UI/Alert/Info.vue";
  import { nextTick } from "vue";
  import SingleModal from "@/components/SingleModal.vue";
  
  export default {
    name: "GalleryComponent",
    components: {
      CardComponent,
      MasonryWall,
      LoadingComponent,
      InfoAlert,
      SingleModal
    },
    data() {
      return {
        load: false,
      };
    },
    methods: {
      async fetchMore() {
        if (!this.$store.getters.getFetchStatus) {
          await this.$store.dispatch("fetchMore");
        }
      }
    },
    computed: {
      getPhotosFromStorage() {
        return this.$store.getters.getPhotosTimeline;
      }
    },
    async updated() {
      await nextTick();
      if (this.load) {
        window.onscroll = () => {
          const div = document.querySelector(".content-inner");
          if (window.innerHeight + window.scrollY >= div.offsetHeight) {
            this.fetchMore();
          }
        };
      }
    },
    watch: {
      async getPhotosFromStorage(last) {
        if (last === null || last === []) {
          this.load = false;
        } else {
          setTimeout(() => {
            this.load = true;
          }, 500);
        }
        setTimeout(() => {
          this.load = true;
        }, 5000);
      },
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .infinite-status {
    display: flex;
    justify-content: center;
    padding: 2rem;
    font-size: 1rem;
    align-items: center;
    svg {
      margin-right: 1rem;
    }
  }
  </style>
  

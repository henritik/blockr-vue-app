<template>
  <LayoutComponent sidebar footer header>
    <div class="row">
      <div 
        class="col flex-1 py-1 md-pl-1 mb-5"
        :class="{ hide: albumsOnMobile && $store.getters.getMode !== 'album'}"
      >
        <TimelineHeader 
          v-if="$store.getters.getMode !== 'album'"
        />
        <AlbumsHeader 
          v-if="$store.getters.getMode === 'album'" 
        /> 
        <GalleryComponent />
      </div>
      <AlbumsComponent v-if="$store.getters.getMode !== 'album'" :albums="getAlbumsFromStorage" /> 
    </div>
  </LayoutComponent>
</template>

<script>
import GalleryComponent from "@/components/Gallery.vue";
import LayoutComponent from "@/components/Layout.vue";
import AlbumsComponent from "@/components/UI/Widget/Albums.vue";
import TimelineHeader from "@/components/UI/TimelineHeader.vue";
import AlbumsHeader from "@/components/UI/AlbumsHeader.vue";

export default {
  components: {
    GalleryComponent,
    LayoutComponent,
    AlbumsComponent,
    TimelineHeader,
    AlbumsHeader
  },
  methods: {
    scrollToTop() {
      if(this.$store.getters.getInitialLoad) {
        window.scrollTo(0, 0);
      }
    }
  },
  computed: {
    getAlbumsFromStorage() {
      return this.$store.getters.getAlbums;
    },
    albumsOnMobile() {
      return this.$store.getters.getAlbumsSectionOnMobile;
    }
  },
  beforeRouteEnter(to, from, next) {
    switch (to.name) {
              
      case "home":
        next((vm) => {
          vm.$store.dispatch("fetchAll");
          vm.scrollToTop(); 
        });
        break;
      
      case "album":
        next((vm) => {     
          vm.$store.dispatch("album", [{ type: "album", value: vm.$route.params.album}]);
          vm.scrollToTop();
        });
      break;

      case "photo":
        next((vm) => {
          vm.$store.commit("toggleBackdrop");
        });
        break;

      default:
        next();
        break;
    }
  },
  beforeRouteLeave(to, from, next) {
    if (from.name === "photo") {
      this.$store.commit("toggleBackdrop");
      next();
    }
    if (to.name === "album" || to.name === "info") {
      this.$store.commit("setSearchText", null);
      this.$store.commit("setActiveTags", []);
      this.$store.commit("setInitialLoad", true);
      next();
    }
    next();
  }
};
</script>

<style lang="scss" scoped>
.mb-5 {
  margin-bottom: 5rem;
}
.hide {
    display: none;
}
</style>

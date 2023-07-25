<template>
    <div v-if="getInfoFromStorage" class="album-header">
          <h2 class="album-name">{{ getInfoFromStorage.name }}</h2>
          <p class="album-count">({{ getInfoFromStorage.count }} photos)</p>
          <p class="album-description">{{ getInfoFromStorage.description }}</p>   
    </div>
</template>
  
<script>
export default {
    name: "AlbumsHeader",
    computed: {
        getInfoFromStorage() {
            return this.$store.getters.getAlbumInfo;  
        }
    }
};
</script>
  
<style lang="scss" scoped>
.album-header {
    margin-top: 0;
    margin-bottom: 2em;
}
.album-name {
    font-size: 2em;
    line-height: normal;
    margin-bottom: 0;
}
.album-count {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 2em;
    margin-top: 0.5em;
}
</style>
  
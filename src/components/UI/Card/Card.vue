<template>
  <div class="card"
  :class="{ initial: getLoadState }"  
  >
    <router-link :to="{ name: 'photo', params: { id: data.id } }">
      <div class="thumbnail">
        <img :src="data.media_details.sizes.medium.source_url + getAdditionalExt" class="img" loading="lazy"  />
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "CardComponent",
  props: {
    data: [] || null
  },
  data() {
    return {
      load: false,
    };
  },
  computed: {
    getLoadState() {
      return this.$store.getters.getInitialLoad;
    },
    getAdditionalExt() {
      return process.env.VUE_APP_ADDITIONAL_FILE_EXTENSION_THUMB;
    },
  },
  mounted() {
    setTimeout(() => {
      this.load = true;
    }, 250);
  },
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;

  .thumbnail {
    border-radius: 5px;
    overflow: hidden;
    background-color: var(--second-background-color);
    &:hover {
      .img {
        transition: all 0.3s ease;
        transform: scale(1.15);
      }
    }
    .img {
      width: 100%;
      border-radius: 5px;
      transition: all 0.3s ease;
      display: flex;
    }
  }
}
.initial {
  animation: fromTopWithFade 0.5s ease;
}

@keyframes backgroundChange {
  0% {
    background: var(--main-background-color);
  }
  50% {
    background: var(--second-background-color);
  }
}
</style>

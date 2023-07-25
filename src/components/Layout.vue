<template>
  <div
    class="page"
  >
    <div class="container">
      <Aside />
      <div
        class="content col"
        :class="{ center: center }"
      >
        <Header v-if="header" />
        <div
          class="content-inner"
          :class="{ heightAuto: heightAuto }"      
        >
          <slot />
        </div>
      </div>
    </div>
    <div
      class="backdrop-on-filters"
      v-show="filterSection"
      @click="$store.commit('toggleFilterSection')"
    ></div>
    <div
      class="backdrop-on-modal"
      v-show="backdrop"
      @click="closeModal()"
    ></div>
  </div>
</template>

<script>
import Aside from "@/components/Aside.vue";
import Header from "@/components/Header.vue";

export default {
  name: "LayoutComponent",
  components: {
    Aside,
    Header,
  },
  props: {
    header: {
      type: Boolean,
    },
    center: {
      type: Boolean,
      default: false,
    },
    heightAuto: Boolean,
  },
  computed: {
    filterSection() {
      return this.$store.getters.getFilterSection;
    },
    backdrop() {
      return this.$store.getters.getBackdrop;
    },
  },
  methods: {
    closeModal() {
      if (this.$store.getters.getMode === "album") {
        this.$router.push({ name: 'albumAfter', params: { album: this.$store.getters.getAlbumState } });
      } else {
        this.$router.push({ name: 'homeAfter'});
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  background-color: var(--main-background-color);
  min-height: 100vh;
  @media screen and (min-width: 600px) {
    background-color: var(--main-background-color);
  }
  .container {
    display: flex;
    flex: 1;
    .content {
      flex: 1;
      display: flex;
      &.h100 {
        height: 100vh;
      }
      .content-inner {
        flex: 1;
        padding: 0 1rem;
        min-height: 120vh;
        border-top: 1px solid var(--second-background-color);
        &.heightAuto {
          min-height: auto;
        }
      }
    }
    @media screen and (min-width: 600px) {
      .center {
        padding: 2rem;
      }
    }
  }
}
</style>

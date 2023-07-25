<template>
  <aside :class="{ openOnMobile: getFilterSection }">
    <div class="y-auto col">
      <div class="ui-tips">
        <p><span class="tip-icon"><font-awesome-icon :icon="['fas', 'fa-lightbulb']"/></span> 
        Use your <span class="highlight">ESC</span> key to close or show the filter section.</p>
      </div>
      <FilterWidget />
    </div>
  </aside>
</template>

<script>
import FilterWidget from "@/components/UI/Widget/Filter/Filter.vue";

export default {
  name: "AsideComponent",
  components: {
    FilterWidget
  },
  data() {
    return {};
  },
  computed: {
    getFilterSection() {
      return this.$store.getters.getFilterSection;
    },
  }
};
</script>

<style lang="scss" scoped>
  aside {
    width: 100%;
    max-width: 370px;
    display: flex;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    background-color: var(--main-background-color);
    transform: translateX(-100%);
      &.openOnMobile {
        transform: translateX(0);

      @media screen and (max-width: 370px) {
        max-width: 90%;
      }
    }
  .y-auto {
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
}

* {
  scrollbar-width: auto;
  scrollbar-color: var(--third-background-color) #ffffff;
}

*::-webkit-scrollbar {
  width: 5px;
}

*::-webkit-scrollbar-track {
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background-color: var(--third-background-color);
  border: 0px solid #ffffff;
}
</style>

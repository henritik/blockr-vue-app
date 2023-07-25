<template>
  <div class="filter-area px-2 col">
    <h3>Filter</h3>

    <TagsFilter @changeActive="changeActive" :tags="getTags" :active="getActiveTags"/>
    <SafeSearchFilter @changeActive="changeActive" :active="getSafemode" />

    <div class="flex row mt-1">
      <button
        type="button"
        aria-label="Filter"
        class="apply-btn"
        @click="filter"
      >
        Apply
      </button>
      <button type="button" aria-label="rest" class="reset" @click="reset">
        Reset
      </button>
    </div>
  </div>
</template>

<script>
import TagsFilter from "@/components/UI/Widget/Filter/Tags.vue";
import SafeSearchFilter from "@/components/UI/Widget/Filter/SafeSearch.vue";

export default {
  name: "FilterWidget",
  components: {
    TagsFilter,
    SafeSearchFilter
  },
  computed: {
    getSafemode() {
      return this.$store.getters.getSafemode;
    },
    getTags() {
      return this.$store.getters.getTags;
    },
    getActiveTags() {
      return this.$store.getters.getActiveTags;
      
    }
  },
  methods: {
    safemode(status) {
      this.$store.dispatch("setSafemode", status);
    },
    setActiveTags(status) {
      let activeTags = this.$store.getters.getActiveTags;
      if ( ! activeTags.includes(status) ) {
        activeTags.push(status);
        this.$store.commit("setActiveTags", activeTags);
      }
    },
    filter() {
      let activeTags = this.$store.getters.getActiveTags;
        if (activeTags.length > 0) {
          this.$store.dispatch("setTags", this.getActiveTags);
        } else {
          this.$store.dispatch("fetchAll");
        }
        this.$store.commit("toggleFilterSection");
    },
    reset() {
      this.safemode(true);
      this.$store.dispatch("destroyTags");
      this.$store.commit("toggleFilterSection");
    },
    changeActive(type, active) {
      if (type === "safesearch") {
        this.safemode(active);
      }
      if (type === "tags") {
        this.setActiveTags(active);
      }
      this.scrollToTop();
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  }
};
</script>

<style lang="scss">
.filter-area {
  margin-top: 2.5em;
  margin-bottom: 2.5em;
  h3 {
    color: var(--logo-color);
    font-weight: 500;
    font-size: 1.1rem;
    margin-bottom: 0;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--second-background-color);
  }
  .filter-item {
    flex: 0;
    padding: 1rem 0;
    border-bottom: 1px solid var(--second-background-color);
    label {
      margin-bottom: 10px;
      padding: 0;
      font-size: 13px;
    }
    .layout {
      display: flex;
      flex-wrap: wrap;
      .row {
        flex-wrap: wrap;
      }
      button {
        margin-right: 7px;
        margin-bottom: 7px;
        padding: 6px 1rem;
        font-size: 13px;
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        transition: all 0.1s ease;
        &:hover {
          background-color: var(--four-background-color);
          .status {
            background-color: var(--logo-color);
          }
        }
        .status {
          background-color: var(--four-background-color);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 7px;
          box-shadow: 0 0 0 -0 transparent;
          transition: all 0.2s ease;
        }
        &.active {
          .status {
            background-color: var(--logo-color);
            box-shadow: 0 0 9px -1px var(--button-color);
          }
        }
      }
    }
    .color-layout {
      display: flex;
      flex-direction: column;

      .colors {
        width: 80%;
        margin-top: 10px;
        flex-wrap: wrap;
      }
    }
  }
  .apply-btn {
    flex: 2;
   
    background-color: var(--button-background-color);
    
    font-size: 14px;
    padding: 1rem;
    margin-right: 7px;
    transition: all 0.4s cubic-bezier(0.445, 0.05, 0.55, 0.95);
    &:hover {
      background-color: var(--four-background-color);
    }
    &:focus {
      box-shadow: none;
      transform: translateY(1px);
    }
  }
  .reset {
    flex: 1;
    background-color: var(--button-background-color);
    font-size: 14px;
    padding: 1rem;
    &:hover {
      background-color: var(--four-background-color);
    }
  }
}
</style>

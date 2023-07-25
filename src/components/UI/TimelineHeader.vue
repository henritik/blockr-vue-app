<template>
  <div class="row items-center justify-between mb-1">
    <button
      type="button"
      class="filter-button"
      @click="$store.commit('toggleFilterSection')"
    >
    <font-awesome-icon :icon="['fas', 'fa-filter']" size="sm" />
      Filter
    </button>
    <div
      class="timeline-labels"
      v-if="getSearchTextFromStorage && getSearchTextFromStorage !== ''"
    >
      <button
        type="button"
        class="remove-btn"
        @click="$store.dispatch('destroySearching')"
      >
        <font-awesome-icon :icon="['fas', 'fa-xmark']" size="sm" />
      </button>
      <label class="active-label">{{ getSearchTextFromStorage }}<span> searching...</span></label>      
    </div>
    <div
      class="timeline-labels"
      v-if="getActiveTagsFromStorage"
    >
      <button
        type="button"
        class="remove-btn"
        @click="$store.dispatch('destroyTags')"
      >
        <font-awesome-icon :icon="['fas', 'fa-xmark']" size="sm" />
      </button>
      <span>Active tags:</span>
      <label
        type="button"
        v-for="(item, key) in getTagsFromStorage"
        :key="key"
        :aria-label="`Tags ${item.name}`"
      >
        <span class="active-label" v-if="getActiveTagsFromStorage.includes(item.id)">{{ item.name }}</span>
      </label>
    </div>
    <div class="order">
      <button
        type="button"
        :class="{active: getOrderFromStorage == 'desc'}"
        @click="toggleOrder('desc')"
      >
        <span class="status"></span>Default order
      </button>
      <button
        type="button"
        :class="{active: getOrderFromStorage == 'asc'}"
        @click="toggleOrder('asc')"
      >
        <span class="status"></span> Ascending Order
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimelineHeader",
  computed: {
    getSearchTextFromStorage() {
      return this.$store.getters.getSearchText;
    },
    getOrderFromStorage() {
      return this.$store.getters.getOrder;
    },
    getActiveTagsFromStorage() {
      return this.$store.getters.getActiveTags.toString();
    },
    getTagsFromStorage() {
      return this.$store.getters.getTags;
    },
  },
  methods: {
    toggleOrder(status) {
      this.$store.dispatch("setOrder", status);
      if (this.$store.getters.getMode === "fetchAll") {
        this.$store.dispatch("fetchAll");
      } else if (this.$store.getters.getMode === "search") {
        this.$store.dispatch("search", this.$store.getters.getSearchText);
      } else if (this.$store.getters.getMode === "tags") {
        this.$store.dispatch("setTags", this.$store.getters.getActiveTags);
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.remove-btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  padding: 0;
  margin-right: 10px;
  transition: all 0.2s ease;
  &:hover {
    background-color: var(--four-background-color);
    color: white;
  }
}
.filter-button {
  display: block;
  background: var(--button-background-color);
  font-size: 13px;
}
.order {
  display: inline-block;
    @media screen and (max-width: 800px) {
      order: 2;
    }
  button:first-child {
    margin-right: 7px;
  }
  a {
    color: var(--logo-color);
    font-weight: 500;
    font-size: 13px;
    border-radius: 5px;
    &.router-link-exact-active {
      background: rgba(130, 130, 130, 0.2);
      color: white;
      transition: all 0.4s cubic-bezier(0.445, 0.05, 0.55, 0.95);
    &.router-link-exact-active:hover {
      background-color: rgba(255, 255, 255, 0.2);
      }
    }
  }
}
  .timeline-labels {
    font-size: 12px;
      @media screen and (max-width: 800px) {
        flex-basis: 100%;
        order: 3;
      }
    label {
      cursor: text;
    }
    span {
      padding-right: 10px;
      color: #a5a5a5;
    }
    .active-label {
      display: inline-block;
      font-weight: 600;
      color: var(--logo-color);
    }
  }

button {
        margin-bottom: 7px;
        padding: 6px 1rem;
        border-radius: 5px;
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
</style>

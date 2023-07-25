<template>
  <div class="filter-item col">
    <label>Safe Search</label>
    <div class="layout">
      <button
        type="button"
        v-for="(item, key) in safesearch"
        :key="key"
        :class="{
          active: active == item,
        }"
        :aria-label="`Safe search ${item}`"
        @click="$emit('changeActive', 'safesearch', item)"
      >
        <span class="status"></span> {{ item ? "Yes" : "No" }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SafeSearch",
  props: {
    active: Boolean,
  },
  data() {
    return {
      safesearch: [false, true],
    };
  },
};
</script>

<style lang="scss" scoped></style>

<template>
  <div class="filter-item col">
    <label>Tags</label>
    <div class="layout color-layout">
      <div class="row">
        <button
          type="button"
          v-for="(item, key) in tags"
          :key="key"
          :class="{
          active: active.includes(item.id),
        }"
        :aria-label="`Tags ${item.name}`"
        @click="$emit('changeActive', 'tags', item.id)"
        >
          <span class="status"></span> {{ item.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TagsFilter",
  props: {
    active: Array,
    tags: Array,
  },
};
</script>

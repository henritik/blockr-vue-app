<template>
  <div class="card">
    <router-link
      :to="{
        name: 'album',
        params: { album: Object.keys(this.album)[0] },
      }"
    >
      <div
        class="covers center"
        :class="{ row: !load, grid: load, padding: load }"
      >
        <Loading v-show="!load" noHeight small />
        <div
          class="cover"
          :style="{
            backgroundImage: `url(${Object.values(this.album)[0].category_image})`,
          }"
          v-show="load"
        ></div>
      </div>
      <label>
        {{ Object.values(this.album)[0].name }}
      </label>
    </router-link>
  </div>
</template>

<script>
import Loading from "@/components/UI/Loading.vue";

export default {
  name: "AsideCard",
  props: {
    album: [] || null,
  },
  components: {
    Loading,
  },
  data() {
    return {
      load: false,
    };
  },
  mounted() {
    setTimeout(() => {
      this.load = true;
    }, 500);
  },
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  animation: fromTopWithFade 0.5s ease;
  .covers {
    display: flex;
    gap: 0.5rem;
    background-color: var(--second-background-color);
    border-radius: 5px;
    background-position: 50%;
    margin-bottom: 5px;
    &.padding {
      padding: 0px;
    }
    &.row {
      height: auto;
      font-size: 1rem;
    }
    &:hover {
      background-color: var(--third-background-color);
      .cover {
        filter: saturate(1);
        transition: all 0.3s ease;
      }
    }
    .cover {
      flex: 100%;
      min-height: 80px;
      background-size: cover;
      border-radius: 5px;
      filter: saturate(0);
      transition: all 0.3s ease;
    }
  }
  label {
    font-size: 13px;
    text-align: center;
    padding: 6px 0;
    font-weight: 500;
  }
  a {
      line-height: 1rem;
    }
}
</style>

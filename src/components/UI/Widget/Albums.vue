<template>
  <div class="albums" :class="{ closed: closed }">
    <div class="col py-1 sticky-albums">
      <button
        type="button"
        aria-label="Close albums section"
        class="close-section right"
        @click="toggleSection"
      >
        <font-awesome-icon :icon="['fas', 'fa-right-from-bracket']" size="sm" />
      </button>
      <div class="col closeable">
        <label class="pl-2 pt-1">
          <font-awesome-icon :icon="['fas', 'fa-images']" />Albums
        </label>
        <div :v-if="!closed" class="grid py-1 px-1">
          <AsideCard v-for="item in albums" :key="item.id" :album="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AsideCard from "@/components/UI/Card/AsideCard.vue";

export default {
  name: "AlbumsComponent",
  props: {
    albums: Array,
  },
  data() {
    return {
      closed: false,
    };
  },
  components: {
    AsideCard,
  },
  mounted() {
    const showAlbumSection = JSON.parse(
      localStorage.getItem("showAlbumSection")
    );
    if (window.innerWidth < 800) {
      this.closed = true;
    }
    else if (showAlbumSection) {
      this.closed = Boolean(showAlbumSection);
    }
    this.$store.commit("setAlbumsSectionOnMobile", false);
    this.resizeListener();
  },
  methods: {
    toggleSection() {
      this.closed = !this.closed;
      localStorage.setItem("showAlbumSection", JSON.stringify(this.closed));
      if (!this.closed && window.innerWidth < 800) {
        this.$store.commit("setAlbumsSectionOnMobile", true);
      } else {
        this.$store.commit("setAlbumsSectionOnMobile", false);
      }
      this.resizeListener();
    },
    onResize() { 
      if (window.innerWidth < 800) {
        this.closed = true;
        this.$store.commit("setAlbumsSectionOnMobile", false);
      } 
    },
    resizeListener() {
      if (!this.closed && window.innerWidth > 800) {
        window.addEventListener("resize", this.onResize);
      } else {
        window.removeEventListener('resize', this.onResize);
      }
    }
  },
  beforeDestroy() { 
    window.removeEventListener('resize', this.onResize); 
  },
};
</script>

<style lang="scss" scoped>
.albums {
  width: 420px;
  margin-left: 2rem;
  border-left: 1px solid var(--second-background-color);
  transition: all 0.1s ease;
  
  @media screen and (max-width: 1450px) {
    width: 310px;
  }

  @media screen and (max-width: 800px) {
    margin-left: 1rem;
  }
 
  .closeable {
    overflow: hidden;
    transition: all 0.1s ease;
    opacity: 1;
  }
  &.closed {
    width: 0;
    transition: all 0.3s ease;

    @media screen and (max-width: 800px) {
      margin-left: 2rem;
    }
    .closeable {
      width: 0;
      opacity: 0;
    }
  }

  .sticky-albums {
    position: sticky;
    top: 73px;
    max-height: calc(100vh - 50px);
  }
  label {
    display: flex;
    align-items: center;
    color: var(--logo-color);
    font-weight: 500;
    font-size: 1.1rem;
    padding-top: 10px;
    svg {
      margin-right: 10px;
    }
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    max-height: 100%;
    background: var(--main-background-color);
    overflow-y: auto;
    padding-left: 2rem;
    @media screen and (max-width: 1450px) {
      grid-template-columns: 1fr 1fr;
    }
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
  border: 0px;
}
</style>

<template>
  <div id="app">
    <KeepAlive>
      <router-view />
    </KeepAlive>
  </div>
</template>

<script>
export default {
  methods: {
    switchDarkmodeClass(status) {
      if (status) {
        document.body.setAttribute("data-theme", "dark");
      } else {
        document.body.setAttribute("data-theme", "light");
      }
    },
  },
  beforeCreate() {
    const darkmode = localStorage.getItem("darkmode");
    if (JSON.parse(darkmode)) {
      document.body.setAttribute("data-theme", "dark");
      this.$store.commit("darkmode", true);
    } else if (!JSON.parse(darkmode)) {
      document.body.setAttribute("data-theme", "light");
      this.$store.commit("darkmode", false);
    } else {
      document.body.removeAttribute("data-theme");
      this.$store.commit("darkmode", null);
    }
  },
  computed: {
    getDarkmode() {
      return this.$store.getters.getDarkmode;
    }
  },
  watch: {
    getDarkmode(oldmode, newmode) {
      if (newmode) {
        localStorage.setItem("darkmode", false);
        this.switchDarkmodeClass(false);
      } else {
        localStorage.setItem("darkmode", true);
        this.switchDarkmodeClass(true);
      }
    }
  },
  mounted() {
    this._keyListener = function(e) {
      if (this.$route.path === "/") {
        if (e.key === "Escape") {
        e.preventDefault();
        this.$store.commit('toggleFilterSection');
        }
      } else if (this.$route.path.includes("/album") || this.$route.path === "/info") {
        if (e.key === "Escape" || e.key === "Backspace") {
          e.preventDefault();
          this.$router.push('/');
        }
      }
    };
    document.addEventListener('keydown', this._keyListener.bind(this));
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this._keyListener);
  }
};
</script>

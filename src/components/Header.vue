<template>
  <header>
    <div class="row p-1 px-1 md-px-2">
      <div class="logo-wrapper">
        <Logo />
      </div>
      <div class="hamburger">   
        <DropdownNav>
          <template slot="toggler">
            <button
            type="button"
            class="selector"  
            >
            <font-awesome-icon :icon="['fas', 'fa-bars']" size="xl" />
            </button>
          </template>      
        <DropdownContent class="dropdow-vertical">       
          <DropdownItem class="navi-link"> 
            <router-link to="/">
              Homepage
            </router-link>
          </DropdownItem>
          <DropdownItem class="navi-link">
            <router-link to="/info">
              Info
            </router-link>
          </DropdownItem>      
        </DropdownContent>    
      </DropdownNav>
      </div>
      <div class="search">
        <input v-if="$route.name === 'home' || $route.name === 'homeAfter'"
          type="search"
          placeholder="Search for photos..."
          ref="search"
          tabindex="1"
          aria-label="Search for photos..."
          spellcheck="false"
          v-model="search"
        />     
      </div>
      <div v-if="$route.name !== 'home' && $route.name !== 'homeAfter'" class="header-return">
        <div class="back-arrow">
          <router-link to="/">
            <label><font-awesome-icon :icon="['fas', 'fa-arrow-left']" size="xl"/></label>
          </router-link>
        </div>
        <div class="ui-tips relative">
          <p><span class="tip-icon"><font-awesome-icon :icon="['fas', 'fa-lightbulb']"/></span> Use your 
          <span class="highlight">ESC</span> or <span class="highlight"><font-awesome-icon :icon="['fas', 'fa-delete-left']"/></span> keys to return the home view.</p>
        </div>
      </div>
      <div class="options-dropdown ml-1">
      <DropdownNav>
        
        <template slot="toggler">
          <button
          type="button"
          class="options-btn"
        >
          <font-awesome-icon
            :icon="['fas', 'fa-ellipsis-vertical']"
            size="xl"
          />
          </button>
        </template>
        <DropdownContent>
            <ul class="main">
              <li>
                <label>Switch Theme</label>
                <ul>
                  <li>
                    <button
                      type="button"
                      :class="{activeTheme: activeTheme(true)}"
                      aria-label="Dark theme"
                      @click="toggleDarkmode(true)"
                    >
                      <font-awesome-icon :icon="['fas', 'fa-moon']" size="lg" />
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      :class="{activeTheme: activeTheme(false) }"
                      aria-label="Light theme"
                      @click="toggleDarkmode(false)"
                    >
                      <font-awesome-icon :icon="['fas', 'fa-sun']" size="lg" />
                    </button>
                  </li>
                </ul>
              </li>
            </ul>  
        </DropdownContent>
      </DropdownNav>
      </div>
    </div>
  </header>
</template>

<script>
import Logo from "@/components/Logo.vue";
import DropdownNav from "@/components/UI/Dropdown/DropdownNav.vue";
import DropdownContent from "@/components/UI/Dropdown/DropdownContent.vue";
import DropdownItem from "@/components/UI/Dropdown/DropdownItem.vue";

export default {
  name: "HeaderComponent",
  props: {},
  components: {
    Logo,
    DropdownNav,
    DropdownContent,
    DropdownItem
  },
  data() {
    return {
      showAlbum: false,
      showOptions: false,
    };
  },
  computed: {
    getActiveTheme() {
      return this.$store.getters.getDarkmode;
    },
    search: {
      get: function () {
          return this.$store.getters.getSearchText;
      },
      set: function (e) {
          if (e === "" || !/\S/.test(e)) {
            this.$store.dispatch("destroySearching");
          } else {
            this.$store.dispatch("search", e);
          } 
      }
    }
  },
  methods: {
    toggleDarkmode(status) {
      this.$store.dispatch("setdarkmode", status);
    },
    removeDarkmode() {
      document.body.removeAttribute("data-theme");
      localStorage.removeItem("darkmode");
    },
    activeTheme(type) {
      if(this.getActiveTheme == type) {
        return true
      }
      return false
    }
  },
};
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  position: sticky;
  top: 0;
  height: 72px;
  display: flex;
  z-index: 1000;
  background: var(--header-background-color);
  backdrop-filter: blur(25px);
  .row {
    flex: 1;
    align-items: center;
  }
  .header-return {
    display: flex;
    justify-content: center;
    width: 100%;
    flex-wrap: nowrap;
    align-items: center;
    padding: 0 1em;
  }
  .logo-wrapper {
    display: block;
  }
  .search {
    flex: 1;
    height: 48px;
    input {
      height: 100%;
      width: 100%;
      border: none;
      padding: 0 1rem;
      border-radius: 5px;
      background-color: var(--second-background-color);
      color: var(--login-form-label-color);
      outline: 0;
      &:focus {
        background-color: var(--third-background-color);
      }
    }
  }
  .hamburger {
    position: relative;
    margin-right: 1rem;
    
    @media screen and (max-width: 600px) {
    margin-right: 0.5rem;
  }
    .selector {
      font-size: 16px;
      font-weight: 600;
      padding: 0.9rem 0.5rem;
      background: transparent;
      border-radius: 5px;
      color: #a5a5a5;
      background-size: 150% 100%;
      transition: all 0.4s ease;
      position: relative;
      &:hover {
        color: var(--button-color);
      }
    }  
     .dropdow-vertical {
      min-width: 200px;
      top: 62.3px;
      left: 0px;
      position: absolute;
      display: flex;
      flex-direction: column;
      background: var(--second-background-color);
      box-shadow: 0 2px 10px -10px #000;
      border-radius: 0px 0px 5px 5px;
      padding: 1rem;
      .navi-link {
        border-bottom: 1px solid var(--four-background-color);
        padding-bottom: 5px;
        margin-bottom: 5px;
        font-size: 14px;
        .router-link-exact-active {
          color: var(--button-color);
        }
      }
    }
  }
  .options-dropdown {
    position: relative;
    display: flex;
    flex-direction: column;
    .options-btn {
      background-color: transparent;
      padding: 1rem;
      color: #a5a5a5;
      &:hover {
        color: var(--button-color);
      }
    }
    ul.main {
      position: fixed;
      right: 2rem;
      top: 56px;
      background: var(--second-background-color);
      z-index: 999;
      padding: 1rem;
      width: 100%;
      max-width: calc(420px - 3rem);
      min-height: 170px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 2px 10px -10px #000;
      border-radius: 0px 0px 5px 5px;

      @media screen and (max-width: 1450px) {
        max-width: calc(310px - 3rem);
      }
      li {
        display: flex;
        flex-direction: column;

        label {
          font-size: 14px;
          border-bottom: 1px solid var(--four-background-color);
          padding: 10px 0;
          text-align: center;
          font-weight: 500;
          cursor: default;
        }
        button {
          color: var(--button-color);
          background-color: var(--third-background-color);
          transition: all 0.1s ease;
          &:hover {
            background-color: var(--four-background-color);
          }
        }
        ul {
          display: flex;
          padding: 0;
          margin: 0;
          gap: 10px;
          margin: 1rem 0;
          justify-content: center;        
          li {
            font-size: 13px;
            border: none;
            .activeTheme {
              color: var(--button-color);
              background-color: var(--four-background-color);
            }
          }
        }
      }
    }
  }
}
</style>

<template> 
  <label @click="homepage" class="logo p-1">BLOCKR</label>
</template>
  
  <script>
  export default {
    name: "LogoComponent",
    props: {},
    methods: {
      homepage() {
        if (this.$route.name === "home") {
          this.$store.dispatch("fetchAll");
        } else {
          this.$router.push('/');
        }     
      }
    }
  };
  </script>

  <style lang="scss" scoped>
  
  label {
    padding: 1.5rem 2rem;
    @media screen and (max-width: 600px) {  
      padding: 1.5rem 1rem;
    }
  }
  .logo {
    display: flex;
    align-items: center;
    color: var(--logo-color);
    font-weight: 500;
    font-size: 1.8rem;
    letter-spacing: 5px;
    transition: all 0.3s ease;
    @media screen and (max-width: 1024px) {  
      font-size: 1.3rem;
    @media screen and (max-width: 600px) {
      font-size: 1rem;
    }
    }
    &:hover {
      background-color: var(--main-color);
      color: white;
    }
    svg {
      margin-right: 10px;
    }
  }
  
  </style>
  
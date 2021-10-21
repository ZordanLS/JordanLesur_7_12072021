<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    let fontAwesome = document.createElement("script");
    fontAwesome.setAttribute("src", "https://kit.fontawesome.com/cc06608881.js");
    fontAwesome.setAttribute("crossorigin", "anonymous");
    document.head.appendChild(fontAwesome);
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.nav-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  height: 3rem;
}
.nav {
  padding: 10px 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #ff7070;
    }
  }
}
</style>

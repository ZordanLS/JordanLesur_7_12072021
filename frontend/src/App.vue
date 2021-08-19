<template>
  <div>
    <div class="nav-container">
    <div class="nav">
      <router-link to="/">Accueil</router-link>
    </div>
    <div class="nav">
      <router-link to="/login">Se connecter</router-link> |
      <router-link to="/Signup">S'inscrire</router-link>
    </div>
    </div>
    <router-view />
  </div>
</template>

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

<template>
    <div id="navcontainer" class="nav-container">
      <div class="nav">
        <router-link to="/">Accueil</router-link>
      </div>
      <div class="nav">
        <a id="profilelink"> Mon profil</a>
        <a href="#" id="logoutbutton"> Déconnexion</a>
      </div>
    </div>
</template>

<script>
export default {
    name: "Navbar",
  props: {
    msg: String,
  },
  mounted() {

    let userId = localStorage.groupomaniauserid;
    let profileLink = document.getElementById("profilelink");
    profileLink.setAttribute("href", "http://localhost:8080/#/Profile?id=" + userId);

    function logout() {
      localStorage.removeItem("groupomaniauserid");
      localStorage.removeItem("groupomaniatoken");
      window.location.replace("#");
    }
    let logoutButton = document.getElementById("logoutbutton");
    logoutButton.addEventListener("click", logout);
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

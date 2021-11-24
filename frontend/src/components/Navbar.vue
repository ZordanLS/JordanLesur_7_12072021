<template>
  <div id="navcontainer" class="nav-container">
    <div class="nav">
      <router-link to="/"><img src="../assets/header-logo.png" alt="Logo Groupomania" class="headerlogo" id="logobig"/></router-link>
      <router-link to="/"><img src="../assets/icon.png" alt="Logo Groupomania" class="headerlogo" id="logosmall"/></router-link>
    </div>
    <div class="nav">
      <a id="profilelink"><i class="fas fa-user iconlink" /><span class="textlink">Mon profil</span></a>
      <a href="#" id="logoutbutton"><i class="fas fa-sign-out-alt iconlink" /><span class="textlink">Déconnexion</span></a>
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
    profileLink.setAttribute("href", "#/Profile?id=" + userId);

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
.headerlogo {
  height: 2.3rem;
  margin-top: -9px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.nav-container {
  padding-bottom: 10px;
  position: -webkit-sticky;
  position: sticky;
  top: 0px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  height: 3rem;
  background-color: white;
  filter: drop-shadow(0px 1px 5px grey);
  z-index: 1;
}
.nav {
  display: flex;
  a {
    display: flex;
    white-space: nowrap;
    font-weight: bold;
    font-size: 1.1rem;
    color: #2c3e50;
    padding: 0.6rem;
    text-decoration: none;
  }
  .iconlink {
    display: none;
  }
}
    #logosmall {
          display: none;
    }
@media screen and (max-width: 545px) {
  .nav {
    .iconlink {
      display: flex;
      font-size: 2rem;
      margin-top: -9px;
    }
  }
  .textlink {
    display: none;
  }
}
@media screen and (max-width: 390px) {
  #logosmall {
    display: flex;
  }
  #logobig {
    display: none;
  }
}
</style>

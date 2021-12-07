<template>
  <main>
    <Navbar />
    <div>
      <h1>Profil</h1>
      <div id="profile"></div>
    </div>
    <ProfileFeed />
  </main>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import ProfileFeed from "@/components/ProfileFeed.vue";

export default {
  name: "Profile",
  components: {
    Navbar,
    ProfileFeed,
  },
  props: {
    msg: String,
  },
  mounted() {
    fetch(`http://localhost:3000/api/users/${this.$route.query.id}`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Basic " + localStorage.getItem("groupomaniatoken"),
      }),
    })
      .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function(user) {
        injectHtml(user);
      });

    function injectHtml(user) {
      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

      let container = document.getElementById("profile");

      let leftSide = document.createElement("div");
      let rightSide = document.createElement("div");
      rightSide.setAttribute("class", "rightside");

      // Création de l'image de profil
      let userPic = document.createElement("img");
      userPic.setAttribute("class", "profileuserpic");
      userPic.setAttribute("alt", "User profile picture");
      userPic.setAttribute("src", user.picture);

      // Création du nom d'utilisateur
      let userNameContainer = document.createElement("div");
      userNameContainer.setAttribute("class", "usernamecontainer");
      let firstName = capitalizeFirstLetter(user.first_name);
      let lastName = capitalizeFirstLetter(user.last_name);
      userNameContainer.innerText = firstName + " " + lastName;

      // Création de l'adresse mail
      let userMail = document.createElement("div");
      userMail.setAttribute("class", "usermail");
      userMail.innerText = user.email;

      // Création de la structure parent/enfants de la page des produits
      container.appendChild(leftSide);
      container.appendChild(rightSide);
      leftSide.appendChild(userPic);
      leftSide.appendChild(userNameContainer);
      rightSide.appendChild(userMail);

      let userId = localStorage.getItem("groupomaniauserid");

      if (userId == user.id) {
        let updateProfileLink = document.createElement("a");
        updateProfileLink.setAttribute("href", "#/UpdateProfile?id=" + userId);
        updateProfileLink.innerText = "Modifier mon profil";
        leftSide.appendChild(updateProfileLink);
      }
    }
  },
};
</script>

<style>
h1 {
  text-align: left;
  margin: 40px 0 0;
  margin-left: 3rem;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #df7070;
  text-decoration: none;
  font-weight: bold;
  font-size: 14pt;
}
.imgcontainer {
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo {
  object-fit: cover;
  height: 20vh;
  overflow: hidden;
}

button:hover {
  opacity: 0.8;
}

span.psw {
  float: right;
  padding-top: 16px;
}

@media screen and (max-width: 550px) {
  input[type="text"],
  input[type="password"] {
    width: 90%;
  }
}
@media screen and (max-width: 870px) {
  .card {
    width: 90%;
  }
}


.username {
  text-align: left;
  padding-left: 1rem;
  font-weight: bold;
  font-size: 1.2rem;
}

.carduser {
  display: flex;
}

.profileuserpic {
  height: 10rem;
  width: 10rem;
  border-radius: 10px;
  object-fit: cover;
  object-position: center;
}

.postdate {
  margin-left: auto;
  padding-right: 1rem;
  padding-top: 0.3rem;
}

.usernamecontainer {
  font-weight: bold;
  font-size: 2rem;
}

#profile {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.rightside {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2vmax;
}
.deletebutton {
  border-bottom-left-radius: 30px;
  font-size: 1.2rem;
  height: 3.5rem;
}

</style>

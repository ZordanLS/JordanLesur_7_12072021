<template>
  <main>
    <Navbar />
    <div>
      <h1>Profil</h1>
      <div id="profile"></div>
    </div>
    <form id="updateform" onsubmit="return(false)">
      <div class="container">
        <label for="firstname"><b>Prénom</b></label>
        <input type="text" placeholder="Entrez votre prénom" name="firstname" required />

        <label for="lastname"><b>Nom</b></label>
        <input type="text" placeholder="Entrez votre nom" name="lastname" required />

        <label for="password"><b>Mot de passe</b></label>
        <input type="password" placeholder="Entrez votre mot de passe" name="password" required />

        <label for="password"><b>Vérification du mot de passe</b></label>
        <input type="password" placeholder="Entrez à nouveau votre mot de passe" name="confirmpassword" required />

        <span class="texterror hidden" id="confirmpassworderror">Les mots de passe ne sont pas identiques<br /><br /></span>

        <label for="profilepic"><b>Photo de profil</b></label>
        <input type="file" placeholder="Choisissez une photo de profil (facultatif)" name="profilepic" id="profilepic" />

        <button id="updatebutton" type="button">Modifier mes informations</button>
      </div>
    </form>
  </main>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Update Profile",
  components: {
    Navbar,
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

    function update() {
      let updateProfilePic = document.getElementById("profilepic").files[0];
      let updateForm = document.forms["updateform"];
      let updateFormData = new FormData(updateForm);
      document.getElementById("confirmpassworderror").className = "texterror hidden";
      if (updateForm.password.value != updateForm.confirmpassword.value) {
        document.getElementById("confirmpassworderror").className = "texterror";
        return;
      }
      let updateData = new FormData();
      updateData.append("email", updateFormData.get("email"));
      updateData.append("firstname", updateFormData.get("firstname"));
      updateData.append("lastname", updateFormData.get("lastname"));
      updateData.append("password", updateFormData.get("password"));

      if (document.getElementById("profilepic").files.length > 0) {
        updateData.append("image", updateProfilePic);
      }
      fetch("http://localhost:3000/api/users", {
        method: "PUT",
        body: updateData,
      })
        .then((res) => {
          if (!res.ok) {
            res.json().then((res) => {
              alert(res.message);
            });
            throw new Error();
          }
        })
        .then(() => {
          window.location.replace("/login");
        });
    }
    let signupButton = document.getElementById("signupbutton");
    signupButton.addEventListener("click", update);

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
    }
  },
};
</script>

<style>
input[type="file"],
input[type="text"],
input[type="password"] {
  width: 30rem;
  padding: 12px 20px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 1rem;
  display: flex;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  background-color: #ff7070;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 20rem;
}

button:hover {
  opacity: 0.8;
}

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
  color: #ff7070;
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

  button {
    width: 60%;
  }
}

.usercard {
  display: flex;
  flex-direction: row;
  margin: 3rem;
  width: 50rem;
  margin-right: auto;
  margin-left: auto;
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
  max-height: 10rem;
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
  justify-content: space-around;
}

.rightside {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
}
</style>

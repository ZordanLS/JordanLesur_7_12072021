<template>
  <main>
    <Navbar />
    <div>
      <h1>Profil</h1>
      <div id="profile"></div>
    </div>
    <form id="updateform" onsubmit="return(false)" autocomplete="off">
      <div class="container">
        <label for="firstname"><b>Prénom</b></label>
        <input type="text" id="firstname" placeholder="Entrez votre prénom" name="firstname" />

        <label for="lastname"><b>Nom de famille</b></label>
        <input type="text" id="lastname" placeholder="Entrez votre nom" name="lastname" />

        <label for="password"><b>Nouveau mot de passe</b></label>
        <input type="password" id="password" placeholder="Entrez votre nouveau mot de passe" name="password" />

        <label for="confirmpassword"><b>Vérification du nouveau mot de passe</b></label>
        <input type="password" id="confirmpassword" placeholder="Entrez à nouveau votre mot de passe" name="confirmpassword" />

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
      userPic.setAttribute("alt", "User profile pic");
      userPic.setAttribute("src", user.picture);

      // Création du nom d'utilisateur
      let userNameContainer = document.createElement("div");
      userNameContainer.setAttribute("class", "usernamecontainer");
      let firstName = capitalizeFirstLetter(user.firstName);
      let lastName = capitalizeFirstLetter(user.lastName);
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

      // Création de la fonction de suppression de compte

      function askDelete(ev) {
        let e = ev.target;
        function resetDeleteIcon() {
          e.className = "far fa-trash-alt";
          e.parentElement.onclick = askDelete;
        }
        if (e.tagName == "BUTTON") {
          e = e.children[0];
        }
        e.className = "fas fa-check";
        window.setTimeout(resetDeleteIcon, 2000);
        e.parentElement.onclick = deleteUser;
      }

      function deleteUser() {
        fetch(`http://localhost:3000/api/users/${user.id}`, {
          method: "DELETE",
          headers: new Headers({
            Authorization: "Basic " + localStorage.getItem("groupomaniatoken"),
            "Content-Type": "application/json",
          }),
        }).then((res) => res.json(localStorage.removeItem("groupomaniauserid"), localStorage.removeItem("groupomaniatoken"), window.location.replace("#")));
      }

      //Création conditionnelle du bouton de suppression
      let loggedUserId = localStorage.getItem("groupomaniauserid");
      let deleteButton = document.createElement("button");
      deleteButton.setAttribute("class", "profiledeletebutton");
      deleteButton.setAttribute("aria-label", "Bouton de suppression du compte");
      let deleteIcon = document.createElement("i");
      deleteIcon.setAttribute("class", "far fa-trash-alt");
      deleteButton.onclick = askDelete;

      if (user.id === parseInt(loggedUserId)) {
        rightSide.appendChild(deleteButton);
        deleteButton.appendChild(deleteIcon);
      }
    }

    function update() {
      let updateProfilePic = document.getElementById("profilepic").files[0];
      let updateForm = document.forms["updateform"];
      let updateFormData = new FormData(updateForm);
      document.getElementById("confirmpassworderror").className = "texterror hidden";
      if (updateForm.password.value != updateForm.confirmpassword.value) {
        document.getElementById("confirmpassworderror").className = "texterror";
        return;
      }
      let userId = localStorage.getItem("groupomaniauserid");
      let updateData = new FormData();
      updateData.append("id", userId);
      if (updateFormData.get("firstname").length > 0) {
        updateData.append("firstname", updateFormData.get("firstname"));
      }
      if (updateFormData.get("lastname").length > 0) {
        updateData.append("lastname", updateFormData.get("lastname"));
      }
      if (updateFormData.get("password").length > 0) {
        updateData.append("password", updateFormData.get("password"));
      }
      if (document.getElementById("profilepic").files.length > 0) {
        updateData.append("image", updateProfilePic);
      }
      fetch(`http://localhost:3000/api/users/${userId}`, {
        method: "PUT",
        body: updateData,
        headers: new Headers({
          Authorization: "Basic " + localStorage.getItem("groupomaniatoken"),
        }),
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
          window.location.replace("/profile?id=29");
        });
    }
    let signupButton = document.getElementById("updatebutton");
    signupButton.addEventListener("click", update);
  },
};
</script>

<style scoped>
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
  border-radius: 30px;
}

button {
  background-color: #df7070;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 20rem;
  border-radius: 30px;
  font-size: 14pt;
  font-weight: bold;
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
  color: #df7070;
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
  input[type="file"],
  input[type="text"],
  input[type="password"] {
    width: 90%;
  }
  #updatebutton {
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
</style>
<style>
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
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  font-size: 2vmax;
}
.profileuserpic {
  max-height: 10rem;
}

.profiledeletebutton {
  margin-left: 0.5rem;
  border-radius: 30px;
  font-size: 1.2rem;
}
.hidden {
  display: none;
}
.texterror {
  font-family: Arial;
  font-size: 14pt;
  font-weight: bold;
  color: red;
}
</style>

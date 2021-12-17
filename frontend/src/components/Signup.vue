<template>
  <div>
    <h1 class="imgcontainer">
      <img src="../assets/icon-above-font.png" alt="Groupomania" class="logo" />
    </h1>
    <form id="signupform" onsubmit="return(false)" autocomplete="off">
      <div class="container">

        <span class="texterror hidden" id="signuperror">Veuillez vous assurer que les champs sont remplis correctement<br /><br /></span>

        <label for="email"><b>Adresse email</b></label>
        <input type="text" id="email" placeholder="Entrez votre adresse email" name="email" required />

        <label for="firstname"><b>Prénom</b></label>
        <input type="text" id="firstname" placeholder="Entrez votre prénom" name="firstname" required />

        <label for="lastname"><b>Nom de famille</b></label>
        <input type="text" id="lastname" placeholder="Entrez votre nom de famille" name="lastname" required />

        <label for="password"><b>Mot de passe</b></label>
        <input type="password" id="password" placeholder="Entrez votre mot de passe" name="password" required />

        <label for="confirmpassword"><b>Confirmation du mot de passe</b></label>
        <input type="password" id="confirmpassword" placeholder="Entrez à nouveau votre mot de passe" name="confirmpassword" required />

        <span class="texterror hidden" id="confirmpassworderror">Les mots de passe ne sont pas identiques<br /><br /></span>

        <label for="profilepic"><b>Photo de profil (facultatif)</b></label>
        <input type="file" name="profilepic" id="profilepic" />

        <button id="signupbutton" type="button">S'inscrire</button>
      </div>
      <div class="container">
        <span class="psw loginlink">Déjà inscrit ? <router-link to="/Login">Connectez vous</router-link> </span>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  mounted() {
    function signup() {
      let profilePic = document.getElementById("profilepic").files[0];
      let signupForm = document.forms["signupform"];
      let signupFormData = new FormData(signupForm);
      document.getElementById("confirmpassworderror").className = "texterror hidden";
      if (signupForm.password.value != signupForm.confirmpassword.value) {
        document.getElementById("confirmpassworderror").className = "texterror";
        return;
      }
      let signupData = new FormData();
      signupData.append("email", signupFormData.get("email"));
      signupData.append("firstName", signupFormData.get("firstname"));
      signupData.append("lastName", signupFormData.get("lastname"));
      signupData.append("password", signupFormData.get("password"));

      if (document.getElementById("profilepic").files.length > 0) {
        signupData.append("image", profilePic);
      }

      fetch("http://localhost:3000/api/users", {
        method: "POST",
        body: signupData,
      })
        .then((res) => {
          if (!res.ok) {
            res.json().then(() => {
            document.getElementById("signuperror").className = "texterror";
            });
            throw new Error();
          }
        })
        .then(() => {
          window.location.replace("/login");
        });
    }
    let signupButton = document.getElementById("signupbutton");
    signupButton.addEventListener("click", signup);
  },
};
</script>

<style scoped>
.loginlink {
font-size: 14pt;
font-weight: bold;
}
h3 {
  margin: 40px 0 0;
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
  border: none;
  margin: 8px auto;
  cursor: pointer;
  width: 20rem;
  border-radius: 30px;
  font-size: 14pt;
  font-weight: bold;
  min-width: 160px;
}

button:hover {
  opacity: 0.8;
}

.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

img.avatar {
  width: 40%;
  border-radius: 50%;
}

.container {
  padding: 16px;
}

span.psw {
  float: right;
  padding-top: 16px;
}

@media screen and (max-width: 550px) {
  input[type="text"],
  input[type="password"],
  input[type="file"] {
    width: 90%;
  }

  button {
    width: 60%;
  }
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

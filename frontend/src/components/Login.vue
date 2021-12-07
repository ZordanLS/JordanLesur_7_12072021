<template>
  <div>
    <h1 class="imgcontainer">
      <img src="../assets/icon-above-font.png" alt="Groupomania" class="logo" />
    </h1>
    <form id="loginform" onsubmit="return(false)">
      <div class="container">
        <label for="email"><b>Adresse email</b></label>
        <input id="email" type="text" name="email" required />

        <label for="password"><b>Mot de passe</b></label>
        <input id="password" type="password" name="password" required />

        <button id="loginbutton" type="button">Se connecter</button>
      </div>

      <div class="container">
        <span class="psw signuplink"
          >Pas encore inscrit ?
          <router-link to="/Signup">Créez votre compte</router-link>
        </span>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  mounted() {
    function login() {
      let loginForm = document.forms["loginform"];
      let loginFormData = new FormData(loginForm);
      let loginData = {
        email: loginFormData.get("email"),
        password: loginFormData.get("password"),
      };
      fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((json) => {
          localStorage.setItem("groupomaniatoken", json.token);
          localStorage.setItem("groupomaniauserid", json.userId);
          localStorage.setItem("groupomaniarole", json.role);
        })
        .then(() => {
          window.location.replace("#");
        });
    }
    let loginButton = document.getElementById("loginbutton");
    loginButton.addEventListener("click", login);
  },
};
</script>

<style scoped>
.signuplink {
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
  float: center;
  padding-top: 16px;
}

@media screen and (max-width: 550px) {
  input[type="text"],
  input[type="password"] {
    width: 90%;
  }
  #loginbutton {
    width: 60%;
  }
}
</style>

<template>
  <div>
    <div class="imgcontainer">
      <img src="../assets/icon-above-font.png" alt="Groupomania" class="logo" />
    </div>
    <form id="loginform" action="auth" method="POST">
      <div class="container">
        <label for="email"><b>Adresse email</b></label>
        <input type="text" placeholder="Entrez votre adresse email" name="email" required />

        <label for="password"><b>Mot de passe</b></label>
        <input type="password" placeholder="Entrez votre mot de passe" name="password" required />

        <button id="loginbutton" type="submit">Se connecter</button>
        <div>
        <label class="button-label"> <input type="checkbox" checked="checked" name="remember" /> Se souvenir de moi </label>
        </div>
      </div>

      <div class="container">
        <span class="psw">Pas encore inscrit ? <a href="#">Créez votre compte</a></span>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  mounted() {
    function login() {
      let loginForm = document.getElementById("loginform");
      let loginData = new FormData(loginForm);
      fetch("http://localhost:3000/api/auth/login", { method: "POST", body: JSON.stringify(loginData), headers: { "Content-Type": "application/json" } })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
        });
    }
    let loginButton = document.getElementById("loginbutton");
    loginButton.addEventListener("click", login());
  },
};

</script>

<style scoped>
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
  border: none;
  margin: 8px auto;
  cursor: pointer;
  width: 20rem;
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

button {
  width: 60%;
}
}
</style>

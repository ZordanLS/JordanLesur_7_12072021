<template>
  <div>
    <div class="imgcontainer">
      <img src="../assets/icon-above-font.png" alt="Groupomania" class="logo" />
    </div>
    <form action="" method="post" id="signupform">
      <div class="container">
        <label for="email"><b>Adresse email</b></label>
        <input type="text" placeholder="Entrez votre adresse email" name="email" required />

        <label for="firstname"><b>Prénom</b></label>
        <input type="text" placeholder="Entrez votre prénom" name="firstname" required />

        <label for="lastname"><b>Nom</b></label>
        <input type="text" placeholder="Entrez votre nom" name="lastname" required />

        <label for="password"><b>Mot de passe</b></label>
        <input type="password" placeholder="Entrez votre mot de passe" name="password" required />

        <label for="passwordconfirm"><b>Confirmez votre mot de passe</b></label>
        <input type="password" placeholder="Confirmez votre mot de passe" name="password" required />

        <button id="signupbutton" type="submit">S'inscrire</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
import Auth from "../services/Auth.js";
export default {
  name: "Signup",
  data() {
    return {
      pseudo: "",
      email: "",
      password: "",
      errorMessage: null,
      message: null,
      isValid: true,
      hasSignedUp: false,
      emailRules: [
        (v) => !!v || "L'email est obligatoire",
        (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "L'email doit être valide",
      ],
      pseudoRules: [
        (v) => v.length <= 30 || "Entre 3 et 30 caractères, sans symboles",
      ],
      passwordRules: [
        (v) =>
          v.length <= 30 ||
          "Le mot de passe doit être de 8 lettres minimum, majuscules et minucules, pas de symboles",
      ],
    };
  },
  methods: {
    async signup() {
      try {
        const response = await Auth.signup({
          pseudo: this.pseudo,
          email: this.email,
          password: this.password,
        });
        this.message = response.data.message;
        this.$store.dispatch("setToken", response.data.token);
        this.$store.dispatch("setUser", response.data.user);
        this.$store.dispatch("getUserById", response.data.user.id);

        let router = this.$router;
        setTimeout(function() {
          router.push("/posts");
        }, 1500);
      } catch (error) {
        this.errorMessage = error.response.data.error;
        setTimeout(() => {
          this.errorMessage = "";
        }, 1500);
      }
    },
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
  margin: 8px 0;
  border: none;
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
</style>

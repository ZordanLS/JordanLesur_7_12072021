<template>
  <main>
    <div>
      <h1>Les derniers posts :</h1>
      <div id="posts"></div>
    </div>
  </main>
</template>

<script>
export default {
  name: "Feed",
  props: {
    msg: String,
  },
  mounted() {
    fetch("http://localhost:3000/api/posts", {
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
      .then(function(array) {
        injectHtml(array);
      });

    // Pour chaque produit, crée une carte et l'intègre au HTML
    function injectHtml(array) {
      array.map(function(post) {
        let container = document.getElementById("posts");

        // Création de l'architecture de la page

        // Création de la div card avec la classe card
        let card = document.createElement("div");
        card.setAttribute("class", "card");

        // Création de la partie utilisateur de la carte
        let cardUser = document.createElement("div");
        cardUser.setAttribute("class", "carduser");

        // Création de l'image de profil
        let cardUserPic = document.createElement("img");
        cardUserPic.setAttribute("class", "userpic");
        cardUserPic.setAttribute("src", "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg");

        function capitalizeFirstLetter(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
        }

        // Creation du nom d'utilisateur
        let cardUserName = document.createElement("p");
        cardUserName.setAttribute("class", "username");
        let firstName = capitalizeFirstLetter(post.first_name);
        let lastName = capitalizeFirstLetter(post.last_name);
        cardUserName.innerText = firstName + " " + lastName;

        // Creation de la date
        let cardPostDate = document.createElement("p");
        cardPostDate.setAttribute("class", "postdate");
        cardPostDate.innerText = "Date du post";

        // Création de la div cardBody avec la classe card-body
        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "");

        // Création de la description
        let cardDescription = document.createElement("p");
        cardDescription.setAttribute("class", "");
        cardDescription.innerText = post.content;

        // Création de la structure parent/enfants de la page des produits
        container.appendChild(card);
        card.appendChild(cardUser);
        cardUser.appendChild(cardUserPic);
        cardUser.appendChild(cardUserName);
        cardUser.appendChild(cardPostDate);
        card.appendChild(cardBody);
        cardBody.appendChild(cardDescription);
      });
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

.card {
  border: solid;
  border-color: #ff7070;
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

.userpic {
  max-height: 3.5rem;
}

.postdate {
  margin-left: auto;
  padding-right: 1rem;
  padding-top: 0.3rem;
}
</style>

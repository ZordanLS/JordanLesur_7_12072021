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
    fetch("http://localhost:3000/api/posts")
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

        // Création de la div cardBody avec la classe card-body
        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "");

        // Création de la description
        let cardDescription = document.createElement("p");
        cardDescription.setAttribute("class", "");
        cardDescription.innerText = post.content;

        // Création de la structure parent/enfants de la page des produits
        container.appendChild(card);
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
</style>

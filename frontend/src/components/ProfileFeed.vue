<template>
    <div>
      <h2>Ses posts :</h2>
      <div id="profileposts"></div>
    </div>
</template>

<script>
export default {
  name: "ProfileFeed",
  props: {
    msg: String,
  },
  mounted() {
    fetch(`http://localhost:3000/api/posts/user/${this.$route.query.id}`, {
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
        function twoDigitFormat(x) {
          if (typeof x == "string") {
            x = parseInt(x);
          }
          if (isNaN(x)) {
            x = 0;
          }
          return (x < 10 ? "0" : "") + x.toString();
        }

        function postDateFormat(d) {
          if (typeof d == "string") {
            d = new Date(d);
          }
          return (
            twoDigitFormat(d.getDate()) +
            "/" +
            twoDigitFormat(d.getMonth() + 1) +
            "/" +
            d.getFullYear() +
            " " +
            twoDigitFormat(d.getHours()) +
            ":" +
            twoDigitFormat(d.getMinutes())
          );
        }

        let container = document.getElementById("profileposts");

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
        cardUserPic.setAttribute("alt", "User profile picture");
        cardUserPic.setAttribute("src", post.user_picture);

        function capitalizeFirstLetter(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
        }

        // Creation du nom d'utilisateur
        let cardUserName = document.createElement("a");
        cardUserName.setAttribute("class", "username");
        cardUserName.setAttribute("href", "http://localhost:8080/#/Profile?id=" + post.user_id);

        let firstName = capitalizeFirstLetter(post.first_name);
        let lastName = capitalizeFirstLetter(post.last_name);
        cardUserName.innerText = firstName + " " + lastName;

        // Creation de la date
        let cardPostDate = document.createElement("p");
        cardPostDate.setAttribute("class", "postdate");
        cardPostDate.innerText = postDateFormat(post.createdAt);

        // Création de la div cardBody avec la classe card-body
        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "cardbody");

        // Création de la description
        let cardDescription = document.createElement("p");
        cardDescription.setAttribute("class", "carddescription");
        cardDescription.innerText = post.content;

        // Création de la div cardBottom
        let cardBottom = document.createElement("div");
        cardBottom.setAttribute("class", "cardbottom");

        // Création de la div postInfoContainer
        let postInfoContainer = document.createElement("div");
        postInfoContainer.setAttribute("class", "postinfocontainer");

        // Création du nombre de commentaires
        let commentCount = document.createElement("p");
        commentCount.setAttribute("class", "commentcount");
        if (post.comments_count === 0) {
          commentCount.innerText = "Aucun commentaire";
        } else if (post.comments_count > 1) {
          commentCount.innerText = post.comments_count + " " + "commentaires";
        } else if (post.comments_count < 2) {
          commentCount.innerText = post.comments_count + " " + "commentaire";
        }

        //Création du lien vers le post
        let postLink = document.createElement("a");
        postLink.setAttribute("class", "postlink");
        postLink.setAttribute("aria-label", "Lien vers le post " + post.id);
        postLink.setAttribute("href", "http://localhost:8080/#/Post?id=" + post.id);
        postLink.innerText = "Ouvrir le post !";

        // Création de la structure parent/enfants de la page des produits
        container.appendChild(card);
        card.appendChild(cardUser);
        cardUser.appendChild(cardUserPic);
        cardUser.appendChild(postInfoContainer);
        postInfoContainer.appendChild(cardUserName);
        postInfoContainer.appendChild(cardPostDate);
        card.appendChild(cardBody);
        cardBody.appendChild(cardDescription);
        card.appendChild(cardBottom);
        cardBottom.appendChild(commentCount);
        cardBottom.appendChild(postLink);

        if (post.picture != null) {
          // Création de l'image de post
          let postContentPicture = document.createElement("img");
          postContentPicture.setAttribute("class", "postcontentpic");
          postContentPicture.setAttribute("alt", "Picture of the post");
          postContentPicture.setAttribute("src", post.picture);
          cardBody.appendChild(postContentPicture);
        }

        // Création de la fonction de suppression de post

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
          e.parentElement.onclick = deletePost;
        }

        function deletePost() {
          fetch(`http://localhost:3000/api/posts/${post.id}`, {
            method: "DELETE",
            headers: new Headers({
              Authorization: "Basic " + localStorage.getItem("groupomaniatoken"),
              "Content-Type": "application/json",
            }),
          }).then((res) => res.json(location.reload()));
        }

        //Création conditionnelle du bouton de suppression
        let loggedUserId = localStorage.getItem("groupomaniauserid");
        let userRole = localStorage.getItem("groupomaniarole");
        let deleteButton = document.createElement("button");
        deleteButton.setAttribute("class", "deletebutton");
        deleteButton.setAttribute("aria-label", "Suppression du post");
        let deleteIcon = document.createElement("i");
        deleteIcon.setAttribute("class", "far fa-trash-alt");
        deleteButton.onclick = askDelete;

        if (post.user_id === parseInt(loggedUserId)) {
          cardUser.appendChild(deleteButton);
          deleteButton.appendChild(deleteIcon);
        } else if (parseInt(userRole) === 1) {
          cardUser.appendChild(deleteButton);
          deleteButton.appendChild(deleteIcon);
        }
      });
    }
  },
};
</script>

<style>
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
  input[type="text"],
  input[type="password"] {
    width: 90%;
  }
}

.card {
  border: solid;
  border-color: #df7070;
  margin: 3rem;
  width: 50rem;
  margin-right: auto;
  margin-left: auto;
}

.username {
  text-decoration: none;
  text-align: left;
  padding-top: 1rem;
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

.cardbody {
  display: flex;
  flex-direction: column;
}

.postdate {
  margin-left: auto;
  padding-right: 1rem;
  padding-top: 0.3rem;
}
.postlink {
  margin-right: 0.5rem;
  margin-left: auto;
  padding-bottom: 0.5rem;
}
.postinfocontainer {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
</style>

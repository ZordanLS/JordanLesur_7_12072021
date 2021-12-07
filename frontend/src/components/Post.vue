<template>
  <main>
    <Navbar />
    <div>
      <div id="posts"></div>
      <form id="commentform">
        <div class="container">
          <label class="commentlabel" for="commentcontent">Vous voulez répondre ?</label>
          <textarea
            class="newcommenttext"
            onfocus="this.style.height='150px'"
            onblur="if(this.value==''){this.style.height=''}"
            id="commentcontent"
            type="text"
            placeholder="Tapez ici !"
            name="commentcontent"
            required
            maxlength="255"
          />
          <button id="commentbutton" type="button">Publier !</button>
        </div>
      </form>
      <Comment />
    </div>
  </main>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Comment from "@/components/Comment.vue";
export default {
  name: "Post",
  components: {
    Navbar,
    Comment,
  },
  props: {
    msg: String,
  },
  mounted() {
    fetch(`http://localhost:3000/api/posts/${this.$route.query.id}`, {
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
      .then(function(post) {
        injectHtml(post);
      });

    function injectHtml(post) {
      post.map(function(post) {
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

        function capitalizeFirstLetter(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
        }

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
        cardUserPic.setAttribute("src", post.user_picture);
        cardUserPic.setAttribute("alt", "User profile picture");


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

        // Création de la structure parent/enfants de la carte du post
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
          let body = JSON.stringify({ userid: post.user_id });
          fetch(`http://localhost:3000/api/posts/${post.id}`, {
            method: "DELETE",
            headers: new Headers({
              Authorization: "Basic " + localStorage.getItem("groupomaniatoken"),
              "Content-Type": "application/json",
            }),
            body: body,
          }).then((res) => res.json(window.history.back()));
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
    function comment(urlPostId) {
      let commentForm = document.forms["commentform"];
      let commentFormData = new FormData(commentForm);
      let commentText = commentFormData.get("commentcontent");
      let commentData = {
        commentcontent: commentText,
        usertoken: localStorage.getItem("groupomaniatoken"),
        post_id: urlPostId,
      };
      fetch("http://localhost:3000/api/comments", {
        method: "POST",
        body: JSON.stringify(commentData),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());
      location.reload();
    }
    let commentButton = document.getElementById("commentbutton");
    commentButton.addEventListener("click", comment.bind(event, this.$route.query.id));
  },
};
</script>

<style>
.commentlabel {
  font-size: 14pt;
  font-weight: bold;
}
#commentcontent,
input[type="text"],
input[type="password"] {
  width: 50rem;
  padding: 12px 20px;
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 1rem;
  display: flex;
  border: 1px solid #ccc;
  box-sizing: border-box;
  resize: none;
}

#commentbutton {
  background-color: #df7070;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  margin-left: 50%;
  border: none;
  cursor: pointer;
  width: 12rem;
  border-radius: 30px;
  font-size: 14pt;
  font-weight: bold;
}

#commentbutton:hover {
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
  input[type="text"],
  input[type="password"] {
    width: 90%;
  }
  #commentbutton {
    width: 35%;
  }
}
@media screen and (max-width: 870px) {
  .card {
    width: 90%;
  }
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

.postdate {
  margin-left: auto;
  padding-right: 1rem;
  padding-top: 0.3rem;
}
.newcommenttext {
  width: 49rem;
  max-width: 80%;
  height: 3rem;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1rem;
  -webkit-font-smoothing: antialiased;
  padding: 15px;
  border-radius: 30px;
}
.deletebutton {
  border-bottom-left-radius: 30px;
  font-size: 1.2rem;
  height: 3.5rem;
}
.postinfocontainer {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
</style>

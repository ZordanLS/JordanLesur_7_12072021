<template>
  <div>
    <form id="postform" enctype="multipart/form-data">
      <div class="container">
        <label class="postlabel" for="postcontent">Qu'avez-vous à dire ?</label><br>
        <textarea
          class="newposttext"
          onfocus="this.style.height='150px'"
          onblur="if(this.value==''){this.style.height='20px'}"
          placeholder="Tapez ici !"
          id="postcontent"
          type="text"
          name="postcontent"
          required
          maxlength="255"
        />
      </div>
      <div class="uploadcontainer">
        <input type="file" id="postpicture" name1="postpicture" />
        <button id="postbutton" type="button">Publier !</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "NewPost",
  props: {
    msg: String,
  },
  mounted() {
    function post() {
      let picture = document.getElementById("postpicture").files[0];
      let postForm = document.forms["postform"];
      let postFormData = new FormData(postForm);
      let postData = new FormData();
      if (document.getElementById("postpicture").files.length > 0) {
        postData.append("image", picture);
      }
      postData.append("postcontent", postFormData.get("postcontent"));
      postData.append("usertoken", localStorage.getItem("groupomaniatoken"));
      fetch("http://localhost:3000/api/posts", {
        method: "POST",
        body: postData,
      }).then((res) => res.json(location.reload()));
    }
    let postButton = document.getElementById("postbutton");
    postButton.addEventListener("click", post);
  },
};
</script>

<style scoped>
.postlabel {
  font-weight: bold;
  font-size: 14pt;
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

button {
  background-color: #df7070;
  color: white;
  padding: none;
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

.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

img.avatar {
  width: 40%;
  border-radius: 50%;
}

.container {
  padding-top: 10px;
}

span.psw {
  float: right;
  padding-top: 16px;
}
.newposttext {
  width: 49rem;
  max-width: 80%;
  height: 20px;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1rem;
  -webkit-font-smoothing: antialiased;
  padding: 15px;
  border-radius: 30px;
}

@media screen and (max-width: 550px) {
  input[type="text"],
  input[type="password"] {
    width: 90%;
  }
  button {
    width: 60%;
    min-width: 160px;
  }
}
.uploadcontainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
input[type="file"] {
  margin-top: auto;
  margin-bottom: auto;
}
</style>

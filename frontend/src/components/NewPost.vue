<template>
  <div>
    <form id="postform">
      <div class="container">
        <textarea
          onfocus="this.style.height='250px'"
          onblur="if(this.value==''){this.style.height=''}"
          id="postcontent"
          type="text"
          placeholder="Qu'avez-vous à dire?"
          name="postcontent"
          required
          maxlength="255"
        />
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
      //let picture = document.getElementById("postpicture").files[0];
      //let imageFormData = new FormData();
      //imageFormData.append("picture", picture);
      //console.log(imageFormData);
      let postForm = document.forms["postform"];
      let postFormData = new FormData(postForm);
      let postData = {
        postcontent: postFormData.get("postcontent"),
        //  postimage: postFormData.get("postpicture"),
        usertoken: localStorage.getItem("groupomaniatoken"),
      };
      fetch("http://localhost:3000/api/posts", {
        method: "POST",
        body: JSON.stringify(postData),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());
      location.reload();
    }
    let postButton = document.getElementById("postbutton");
    postButton.addEventListener("click", post);
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
#postcontent,
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
  background-color: #ff7070;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  margin-left: 14rem;
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

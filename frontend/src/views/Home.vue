<template>
  <div class="home">
    <Navbar />
    <NewPost />
    <Feed />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import NewPost from "@/components/NewPost.vue";
import Feed from "@/components/Feed.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    NewPost,
    Feed,
  },
};
</script>

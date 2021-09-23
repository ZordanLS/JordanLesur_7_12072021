<template>
  <div class="home">
    <NewPost />
    <Feed />
  </div>
</template>

<script>
// @ is an alias to /src
import NewPost from "@/components/NewPost.vue";
import Feed from "@/components/Feed.vue";

export default {
  name: "Home",
  components: {
    NewPost,
    Feed,
  },
};
</script>

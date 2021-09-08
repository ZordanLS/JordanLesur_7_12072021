<template>
  <div class="home">
    <NewPost/>
  </div>
</template>

<script>
// @ is an alias to /src
import NewPost from '@/components/NewPost.vue'

export default {
  name: 'Home',
  components: {
    NewPost
  }
}
</script>

<template>
  <v-app>
    <v-main class="mb-4">
      <AddPost @addedPost="addedPost" />
      <Cards :posts="posts" @deletePost="deletePost" />
    </v-main>
  </v-app>
</template>

<script>
import AddPost from "@/components/AddPost.vue";
import Cards from "@/components/Cards.vue";

export default {
  name: "App",
  components: {
    AddPost,
    Cards,
  },
  data: () => ({
    posts: [],
    deletedPosts: [],
  }),
  methods: {
    addedPost(post) {
      this.posts.push(post);
    },
    deletePost(post) {
      this.deletedPosts.push(post);
      const deletedIndex = this.posts.indexOf(post);
      this.posts.splice(deletedIndex, 1);
    },
  },
};
</script>

<style>
body {
  font-family: Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  min-height: 100vh;
  min-width: 100vw;
}
</style>

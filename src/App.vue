<template>
  <v-app>
    <v-main class="mb-4 mt-6">
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
  mounted() {
    if (localStorage.getItem("posts")) {
      this.posts = JSON.parse(localStorage.getItem("posts"));
    }
    if (localStorage.getItem("deletedPosts")) {
      this.deletedPosts = JSON.parse(localStorage.getItem("deletedPosts"));
    }
  },
  watch: {
    posts: {
      handler: function (newPosts) {
        localStorage.setItem("posts", JSON.stringify(newPosts));
        newPosts.sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
        );
      },
      deep: true,
    },
    deletedPosts: {
      handler: function (newPosts) {
        localStorage.setItem("deletedPosts", JSON.stringify(newPosts));
      },
      deep: true,
    },
  },
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

.v-row {
  margin: 0;
}
</style>

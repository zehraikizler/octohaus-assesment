<template>
  <v-row justify="center">
    <v-col cols="10" sm="8" md="4" lg="4" class="pt-0">
      <Card
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @deletePost="deletePost"
      />
    </v-col>
  </v-row>
</template>

<script>
import Card from "./Card.vue";
export default {
  name: "Cards",
  components: {
    Card,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  methods: {
    deletePost(post) {
      this.$emit("deletePost", post);
    },
  },
};
</script>

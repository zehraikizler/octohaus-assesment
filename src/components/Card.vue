<template>
  <v-card
    class="mt-3"
    :elevation="isEditing ? 18 : 0"
    :class="[isEditing ? 'selected-card' : 'unselected-card']"
  >
    <v-card-text class="d-flex flex-no-wrap justify-start align-start">
      <v-avatar size="40">
        <img alt="user" width="40" height="40" src="../assets/user.png" />
      </v-avatar>

      <div class="text-container ms-2 w-100">
        <span class="post-date">
          {{
            post.editedDate
              ? "edited at " +
                dayjs(post.editedDate).format("DD.MM.YYYY - HH:mm")
              : dayjs(post.createdDate).format("DD.MM.YYYY - HH:mm")
          }}
        </span>
        <p class="card-text">
          <span class="text-primary font-weight-bold me-1">Jane Doe</span>
          <span v-if="!isEditing">{{ post.content }}</span>
          <AddPost
            isEditing
            :post="post"
            @cancelled="() => (isEditing = false)"
            @updatedPost="() => (isEditing = false)"
            v-else
          />
        </p>
        <v-sheet v-if="post.image && !isEditing" class="position-relative">
          <v-img max-width="100%" height="100%" class="ma-2" :src="post.image">
          </v-img>
        </v-sheet>
      </div>
    </v-card-text>

    <v-divider></v-divider>
    <v-card-actions class="card-actions py-0 mx-1">
      <v-sheet>
        <v-btn
          size="small"
          :color="isLiked ? '#9B59B6' : '#c1c8ce'"
          icon
          elevation="0"
          @click="likePost"
        >
          <LikeIcon :color="isLiked ? '#9B59B6' : '#c1c8ce'" />
          <span class="ms-1">{{ post.likeCount }}</span>
        </v-btn>
        <v-btn
          size="small"
          icon
          elevation="0"
          :color="isDisLiked ? 'black' : '#c1c8ce'"
          @click="dislikePost"
        >
          <DislikeIcon :color="isDisLiked ? 'black' : '#c1c8ce'" />
          <span class="ms-1">{{ post.dislikeCount }}</span>
        </v-btn>
      </v-sheet>
      <v-spacer></v-spacer>
      <v-sheet>
        <v-btn
          size="small"
          density="compact"
          icon
          elevation="0"
          @click="isEditing = !isEditing"
        >
          <EditIcon />
        </v-btn>
        <v-btn
          size="small"
          density="compact"
          icon
          elevation="0"
          @click="deletePost"
        >
          <DeleteIcon />
        </v-btn>
      </v-sheet>
    </v-card-actions>
  </v-card>
</template>

<script>
import dayjs from "dayjs";
import AddPost from "./AddPost.vue";
export default {
  name: "Card",
  components: {
    AddPost,
  },
  data: () => ({
    dayjs,
    isEditing: false,
    isLiked: false,
    isDisLiked: false,
  }),
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    likePost() {
      const dislikedIds = JSON.parse(localStorage.getItem("dislikedIds"));
      const isAlreadyDisliked = dislikedIds?.filter(
        (item) => item == this.$props.post.id
      );
      if (isAlreadyDisliked && isAlreadyDisliked.length > 0) {
        this.dislikePost();
      }
      const likedIds = JSON.parse(localStorage.getItem("likedIds"));
      const isAlreadyLiked = likedIds?.filter(
        (item) => item == this.$props.post.id
      );
      if (isAlreadyLiked && isAlreadyLiked.length > 0) {
        this.isLiked = false;
        this.$props.post.likeCount--;
        const index = likedIds.indexOf(this.$props.post.id);
        likedIds.splice(index, 1);
        localStorage.setItem("likedIds", JSON.stringify(likedIds));
      } else {
        this.isLiked = true;
        this.$props.post.likeCount++;
        if (likedIds && likedIds.length > 0) {
          localStorage.setItem(
            "likedIds",
            JSON.stringify([...likedIds, this.$props.post.id])
          );
        } else {
          localStorage.setItem(
            "likedIds",
            JSON.stringify([this.$props.post.id])
          );
        }
      }
    },
    dislikePost() {
      const likedIds = JSON.parse(localStorage.getItem("likedIds"));
      const isAlreadyLiked = likedIds?.filter(
        (item) => item == this.$props.post.id
      );
      if (isAlreadyLiked && isAlreadyLiked.length > 0) {
        this.likePost();
      }
      const dislikedIds = JSON.parse(localStorage.getItem("dislikedIds"));
      const isAlreadyDisliked = dislikedIds?.filter(
        (item) => item == this.$props.post.id
      );
      if (isAlreadyDisliked && isAlreadyDisliked.length > 0) {
        this.isDisLiked = false;
        this.$props.post.dislikeCount--;
        const index = dislikedIds.indexOf(this.$props.post.id);
        dislikedIds.splice(index, 1);
        localStorage.setItem("dislikedIds", JSON.stringify(dislikedIds));
      } else {
        this.isDisLiked = true;
        this.$props.post.dislikeCount++;
        if (dislikedIds && dislikedIds.length > 0) {
          localStorage.setItem(
            "dislikedIds",
            JSON.stringify([...dislikedIds, this.$props.post.id])
          );
        } else {
          localStorage.setItem(
            "dislikedIds",
            JSON.stringify([this.$props.post.id])
          );
        }
      }
    },
    deletePost() {
      this.$emit("deletePost", this.$props.post);
    },
  },
  mounted() {
    const likedIds = JSON.parse(localStorage.getItem("likedIds"));
    const isAlreadyLiked = likedIds?.filter(
      (item) => item == this.$props.post.id
    );

    if (isAlreadyLiked && isAlreadyLiked.length > 0) {
      this.isLiked = true;
    }

    const dislikedIds = JSON.parse(localStorage.getItem("dislikedIds"));
    const isAlreadyDisliked = dislikedIds?.filter(
      (item) => item == this.$props.post.id
    );
    if (isAlreadyDisliked && isAlreadyDisliked.length > 0) {
      this.isDisLiked = true;
    }
  },
};
</script>

<style>
.post-date {
  font-size: 8px;
  color: #99a4ae;
}

.card-actions {
  min-height: auto;
}

.card-text {
  line-height: 1.2;
  margin-top: -4px;
  color: #5d6d7e;
  letter-spacing: 0;
}

.text-container {
  margin-top: -4px;
}

.selected-card {
  transform-origin: top;
  transform: scaleY(1.1);
  z-index: 99;
  transition: 0.3s;
}

.unselected-card {
  transform: scaleY(1);
  transition: 0.3s;
}
</style>

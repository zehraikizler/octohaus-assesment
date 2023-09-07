<template>
  <v-row justify="center">
    <v-col
      :cols="isEditing ? 12 : 10"
      :sm="isEditing ? 12 : 8"
      :md="isEditing ? 12 : 4"
      :lg="isEditing ? 12 : 4"
    >
      <v-card elevation="0">
        <v-card-text :class="{ 'pa-0': isEditing }">
          <v-sheet class="ma-0 pa-0">
            <textarea
              placeholder="Your text here"
              class="post-input w-100 h-auto mb-3"
              v-model="postContent"
            ></textarea>
            {{ selectedImage }}
            <v-sheet v-if="selectedImage" class="position-relative">
              <v-btn
                icon
                size="x-small"
                position="absolute"
                class="remove-image bg-primary"
                @click="selectedImage = null"
                >x</v-btn
              >
              <v-img
                max-width="100%"
                height="100%"
                class="ma-2"
                :src="selectedImage"
              >
              </v-img>
            </v-sheet>
          </v-sheet>
          <v-sheet class="d-flex pb-3">
            <v-sheet>
              <v-file-input
                class="d-none"
                :id="'fileInput' + post?.id"
                accept="image/png, image/gif, image/jpeg"
                type="file"
                @change="onChange"
              >
              </v-file-input>
              <v-btn
                size="x-small"
                icon
                elevation="0"
                style="rotate: -45deg"
                @click="openFileInput('fileInput' + post?.id)"
              >
                <vue-feather
                  size="18"
                  stroke="#00000029"
                  type="paperclip"
                ></vue-feather>
              </v-btn>
              <v-btn size="x-small" icon elevation="0">
                <vue-feather
                  size="18"
                  stroke="#00000029"
                  type="smile"
                ></vue-feather>
              </v-btn>
            </v-sheet>
            <v-spacer></v-spacer>
            <v-sheet v-if="isEditing">
              <v-btn
                color="secondary"
                variant="plain"
                size="small"
                @click="$emit('cancelled')"
              >
                CANCEL
              </v-btn>
              <v-btn color="primary" size="small" @click="updatePost">
                UPDATE
              </v-btn>
            </v-sheet>

            <v-btn color="primary" @click="addPost" v-else> SUBMİT </v-btn>
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "AddPost",
  props: {
    isEditing: {
      type: Boolean,
      default: false,
    },
    post: {
      type: Object,
    },
  },
  mounted() {
    if (this.$props.isEditing) {
      this.postContent = this.$props.post?.content || null;
      this.selectedImage = this.$props.post?.image || null;
    }
  },
  data: () => ({
    postContent: "",
    selectedImage: null,
  }),
  methods: {
    openFileInput(id) {
      document.getElementById(id).click();
    },
    onChange(event) {
      const file = event.target.files[0];
      this.selectedImage = URL.createObjectURL(file);
    },

    addPost() {
      const randomId = Math.random().toString(36).substring(2, 8);
      const data = {
        id: randomId,
        content: this.postContent,
        createdDate: new Date(),
        likeCount: 0,
        dislikeCount: 0,
        image: this.selectedImage,
      };
      this.postContent = "";
      this.selectedImage = null;
      this.$emit("addedPost", data);
    },
    updatePost() {
      this.$props.post.content = this.postContent;
      this.$props.post.editedDate = new Date();
      this.$props.post.image = this.selectedImage;
      this.$emit("updatedPost");
    },
  },
};
</script>

<style>
.post-input {
  opacity: 1;
  padding: 8px;
  margin: 4px 0;
  resize: none;
}

.post-input:focus-visible {
  outline: 0;
  border-style: none;
}

.remove-image {
  top: -10px;
  right: 0;
  z-index: 1;
}
</style>

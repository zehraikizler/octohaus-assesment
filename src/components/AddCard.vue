<template>
  <v-row justify="center" class="mt-5">
    <v-col cols="10" sm="8" md="4" lg="4">
      <v-card>
        <v-card-text>
          <v-sheet class="ma-0 pa-0">
            <textarea
              placeholder="Your text here"
              class="post-input w-100 h-auto"
              rows="4"
            ></textarea>
            <v-sheet v-if="uploadedImage" class="position-relative">
              <v-btn
                icon
                size="x-small"
                position="absolute"
                class="remove-image bg-primary"
                @click="uploadedImage = null"
                >x</v-btn
              >
              <v-img
                max-width="100%"
                height="100%"
                class="ma-2"
                :src="uploadedImage"
              >
              </v-img>
            </v-sheet>
          </v-sheet>
          <v-sheet class="d-flex">
            <v-sheet>
              <v-file-input
                class="d-none"
                id="fileInput"
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
                @click="openFileInput('fileInput')"
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
            <v-btn color="primary"> Submit </v-btn>
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "AddCard",
  data: () => ({
    posts: [],
    uploadedImage: null,
  }),
  methods: {
    openFileInput(id) {
      document.getElementById(id).click();
    },
    onChange(event, post = null) {
      const file = event.target.files[0];

      if (post) {
        post.image = URL.createObjectURL(file).toString();
      } else {
        this.uploadedImage = URL.createObjectURL(file);
      }
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

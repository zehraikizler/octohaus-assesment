<template>
  <v-card class="mt-3">
    <v-card-text>
      <v-row>
        <v-col cols="2"
          ><v-avatar color="primary" size="40" class="mt-1">
            <img alt="user" width="40" height="40" src="../assets/user.png" />
          </v-avatar>
        </v-col>
        <v-col class="text-container py-2" cols="10">
          <span class="post-date"> 01.01.2000 13:24 </span>
          <p class="card-text">
            <span class="text-primary font-weight-bold">Jane Doe</span>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </p>
        </v-col>
      </v-row>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="card-actions py-0 mx-1">
      <v-sheet>
        <v-btn size="small" icon elevation="0">
          <LikeIcon />
          <span class="ms-1" style="color: #00000029">0</span>
        </v-btn>
        <v-btn size="small" icon elevation="0">
          <UnlikeIcon />
          <span class="ms-1" style="color: #00000029">0</span>
        </v-btn>
      </v-sheet>
      <v-spacer></v-spacer>
      <v-sheet>
        <v-btn size="small" density="compact" icon elevation="0">
          <EditIcon />
        </v-btn>
        <v-btn size="small" density="compact" icon elevation="0">
          <DeleteIcon />
        </v-btn>
      </v-sheet>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {};
</script>

<style>
.post-date {
  font-size: 8px;
  color: #99a4ae;
}

.card-actions {
  min-height: auto;
}

.text-container {
  margin-left: 0;
  padding-left: 10px;
}

.card-text {
  line-height: 1.2;
  margin-top: -5px;
  color: #5d6d7e;
  letter-spacing: 0;
}

@media only screen and (min-width: 992px) {
  .text-container {
    margin-left: -0.2rem;
    padding-left: 0;
  }
}
</style>

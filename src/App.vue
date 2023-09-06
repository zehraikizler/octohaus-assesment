<template>
  <v-app>
    <v-main>
      <AddCard />
      <Cards />
    </v-main>
  </v-app>
</template>

<script setup>
import AddCard from "@/components/AddCard.vue";
import Cards from "@/components/Cards.vue";
</script>

<style>
body {
  font-family: Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif;
  min-height: 100vh;
  min-width: 100vw;
}
</style>

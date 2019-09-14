<template>
  <v-app id="inspire">
    <navbar />
    <main-content />
    <v-overlay :value="loading" color="grey lighten-2" :opacity="1">
      <v-progress-circular
        indeterminate
        color="primary"
        size="64"
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import MainContent from "./components/MainContent";
import Navbar from "./components/Navbar";
export default {
  components: { Navbar, MainContent },
  data: () => ({
    loading: true
  }),
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
};
</script>

<style lang="sass">
@import "@/sass/app.sass"
</style>

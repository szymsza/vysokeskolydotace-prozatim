<template>
  <v-app id="inspire">
    <navbar @select-option="selectOption" :selected="selected" />
    <main-content :selected="selected" />
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
    loading: true,
    selected: []
  }),
  created() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  methods: {
    selectOption(option) {
      this.selected.push(option);
    }
  }
};
</script>

<style lang="sass">
@import "@/sass/app.sass"
</style>

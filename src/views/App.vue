<template>
  <v-app id="inspire">
    <navbar
      @select-option="selectOption"
      :schools="schools"
      :selected="selected"
    />
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
    selected: {},
    schools: {}
  }),
  created() {
    this.axios("https://api.myjson.com/bins/1f9ut9").then(res => {
      this.schools = res.data;
      this.loading = false;
    });
  },
  methods: {
    selectOption(option) {
      this.$set(this.selected, option.ico, option);
    }
  }
};
</script>

<style lang="sass">
@import "@/sass/app.sass"
</style>

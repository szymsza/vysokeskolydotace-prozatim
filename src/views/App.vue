<template>
  <v-app id="inspire">
    <navbar
      @select-option="selectOption"
      @toggle-statistics="showStatistics = !showStatistics"
      :schools="schools"
      :selected="selected"
    />
    <statistics v-if="showStatistics" />
    <main-content v-else :selected="selected" @remove-option="removeOption" />
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
import Statistics from "./components/Statistics";
export default {
  components: { Statistics, Navbar, MainContent },
  data: () => ({
    loading: true,
    selected: {},
    schools: {},
    showStatistics: false
  }),
  created() {
    this.axios("https://api.myjson.com/bins/1f9ut9").then(res => {
      this.schools = res.data;
      this.loading = false;
    });
  },
  methods: {
    selectOption(option) {
      if (Object.keys(this.selected).length >= 15) return false;

      this.$set(this.selected, option.ico, option);
    },
    removeOption(ico) {
      this.$delete(this.selected, ico);
    }
  }
};
</script>

<style lang="sass">
@import "@/sass/app.sass"
</style>

<template>
  <v-app id="inspire">
    <navbar
      @select-option="selectOption"
      :schools="schools"
      :faculties="faculties"
      :selected="selected"
    />
    <main-content :selected="selected" @remove-option="removeOption" />
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
    loading: 2,
    selected: {},
    schools: {},
    faculties: {}
  }),
  created() {
    // Schools
    this.axios("https://api.myjson.com/bins/1f9ut9").then(res => {
      this.schools = res.data;
      this.loading--;
    });

    // Faculties
    this.axios("https://api.myjson.com/bins/bptdp").then(res => {
      this.faculties = res.data;

      // Assign faculties to schools
      for (let orjk in this.faculties) {
        let faculty = this.faculties[orjk];
        let ico = parseInt(faculty.school_ico);
        if (!this.schools[ico].faculties) this.schools[ico].faculties = {};

        this.schools[ico].faculties[orjk] = faculty;
      }

      this.loading--;
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

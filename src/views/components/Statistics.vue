<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row>
        <v-row align="center" justify="center"> </v-row>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: "Statistics.vue",
  props: {
    schools: Object,
    faculties: Object
  },
  data: () => ({}),
  mounted() {
    console.log(this.schools);
  },
  methods: {}
};
</script>

<style scoped></style>

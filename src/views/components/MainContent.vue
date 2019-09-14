<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        {{ selected }}
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: "MainContent",
  props: {
    selected: Array
  }
};
</script>

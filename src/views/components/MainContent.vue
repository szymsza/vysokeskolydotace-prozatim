<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-row
          v-if="Object.keys(selected).length"
          v-bind:key="JSON.stringify(selected)"
        >
          <chart
            @select="removeOption"
            name="Počet projektů"
            :data="selected"
            property="projects"
          />
          <chart
            @select="removeOption"
            name="Peníze z projektů (tis. Kč)"
            :data="selected"
            property="total"
          />
          <chart
            @select="removeOption"
            name="Počet projektů"
            :data="selected"
            property="projects"
          />
          <chart
            @select="removeOption"
            name="Peníze z projektů (tis. Kč)"
            :data="selected"
            property="total"
          />
        </v-row>
        <h1 v-else>
          Vyhledejte školu, fakultu nebo obor v políčku výše...
        </h1>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import Chart from "./Chart";

export default {
  name: "MainContent",
  components: { Chart },
  props: {
    selected: Object
  },
  data: () => ({}),
  mounted() {},
  methods: {
    removeOption(row) {
      let ico = row[3].v;

      this.$emit("remove-option", ico);
    }
  }
};
</script>

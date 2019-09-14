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
            name="Počet projektů celkem"
            :data="selected"
            property="projects"
            yLabel="celkem / 10 let"
          />
          <chart
            @select="removeOption"
            name="Peníze z projektů celkem"
            :data="selected"
            property="total"
            yLabel="v tisících Kč / 10 let"
          />
          <chart
            @select="removeOption"
            name="Peníze na studenta a rok"
            :data="selected"
            :width="100"
            :property="
              item => {
                return item.total / 10 / item.students;
              }
            "
            yLabel="v tisíčích Kč / rok"
          />
        </v-row>
        <h1 v-else>
          Vyhledejte školu nebo fakultu v políčku výše...
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

<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row>
        <v-row align="center" justify="center">
          <chart
            name="Úspěšnost projektů (dle TAČRu)"
            :data="tacrChartData"
            :property="
              item => {
                return (
                  parseFloat(
                    item['tacr_success'] /
                      (item['tacr_fail'] + item['tacr_success'])
                  ).toFixed(4) * 100
                );
              }
            "
          />
        </v-row>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import Chart from "./Chart";

export default {
  name: "Statistics.vue",
  components: { Chart },
  props: {
    schools: Object,
    faculties: Object
  },
  data: () => ({
    tacrChartData: []
  }),
  created() {
    let schools = this.schools;
    let tacrStats = [];
    for (let i in schools) {
      if (schools[i]["tacr_fail"] + schools[i]["tacr_success"] > 10)
        tacrStats.push(
          schools[i]["tacr_success"] /
            (schools[i]["tacr_fail"] + schools[i]["tacr_success"])
        );
    }
    tacrStats = tacrStats.sort(function(a, b) {
      return b - a;
    });
    for (let i = 0; i < 5; i++) {
      for (let j in schools) {
        if (schools[j]["projects"] > 10) {
          if (
            schools[j]["tacr_success"] /
              (schools[j]["tacr_fail"] + schools[j]["tacr_success"]) ===
            tacrStats[i]
          ) {
            this.tacrChartData.push(schools[j]);
          }
        }
      }
    }
    console.log(this.tacrChartData);
  },
  mounted() {}
};
</script>

<style scoped></style>

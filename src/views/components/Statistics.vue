<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row>
        <div class="col-12" align="center" justify="center">
          <chart
            name="Úspěšnost projektů (dle TAČRu)"
            :data="tacrChartData"
            :width="100"
            yLabel="v procentech"
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
        </div>
        <div class="col-12" align="center" justify="center">
          <chart
            name="Počet projektů na školu"
            :data="byProjectChartData"
            :width="100"
            property="projects"
          />
        </div>
        <div class="col-12" align="center" justify="center">
          <chart
            name="Finance z projektů na školu"
            :data="byMoneyChartData"
            :width="100"
            property="total"
            yLabel="v tis. Kč"
          />
        </div>
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
    tacrChartData: {},
    byProjectChartData: {},
    byMoneyChartData: {}
  }),
  created() {
    let schools = this.schools;
    //TACR data
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
            this.tacrChartData[Object.keys(this.tacrChartData).length] =
              schools[j];
          }
        }
      }
    }

    //top #5 projects
    let schoolStats = [];
    for (let i in schools) {
      schoolStats.push(schools[i]["projects"]);
    }
    schoolStats = schoolStats.sort(function(a, b) {
      return b - a;
    });
    for (let i = 0; i < 5; i++) {
      for (let j in schools) {
        if (parseInt(schools[j]["projects"]) === parseInt(schoolStats[i])) {
          this.byProjectChartData[Object.keys(this.byProjectChartData).length] =
            schools[j];
        }
      }
    }

    //top #5 money
    schoolStats = [];
    for (let i in schools) {
      schoolStats.push(schools[i]["total"]);
    }
    schoolStats = schoolStats.sort(function(a, b) {
      return b - a;
    });
    for (let i = 0; i < 5; i++) {
      for (let j in schools) {
        if (parseInt(schools[j]["total"]) === parseInt(schoolStats[i])) {
          this.byMoneyChartData[Object.keys(this.byMoneyChartData).length] =
            schools[j];
        }
      }
    }
  },
  mounted() {}
};
</script>

<style scoped></style>

<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        {{ selected }}
        <div id="chart1" style="width: 100%; height: 500px"></div>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { GoogleCharts } from "google-charts";

export default {
  name: "MainContent",
  props: {
    selected: Object
  },
  data: () => ({}),
  mounted() {
    GoogleCharts.load(drawChart, { packages: ["bar"] });

    function drawChart() {
      var data = GoogleCharts.api.visualization.arrayToDataTable([
        ["Year", "Sales", "Expenses", "Profit"],
        ["2014", 1000, 400, 200],
        ["2015", 1170, 460, 250],
        ["2016", 660, 1120, 300],
        ["2017", 1030, 540, 350]
      ]);

      var options = {
        /*chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2014-2017"
        }*/
      };

      var chart = new GoogleCharts.api.charts.Bar(
        document.getElementById("chart1")
      );

      chart.draw(data, GoogleCharts.api.charts.Bar.convertOptions(options));
    }
  }
};
</script>

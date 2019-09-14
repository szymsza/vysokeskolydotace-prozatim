<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <div v-show="Object.keys(selected).length">
          <h1 class="col-12 text-center">Počet projektů</h1>
          <v-card id="chart1" style="height: 500px"></v-card>
        </div>
        <h1 v-show="!Object.keys(selected).length">
          Vyhledejte školu, fakultu nebo obor v políčku výše
        </h1>
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
    GoogleCharts.load(this.drawChart, { packages: ["bar"] });
  },
  methods: {
    drawChart() {
      if (!Object.keys(this.selected).length) return;

      let data = [["Škola", "Počet projektů", { role: "style" }]];

      let colors = ["#1565C0", "#F44336", "#FFC107", "#4CAF50", "#9C27B0"];

      let i = 0;
      let minValue;
      let maxValue;
      for (let ico in this.selected) {
        let school = this.selected[ico];
        let value = school.projects;
        data.push([school.name, value, colors[i++]]);

        if (value < minValue || !minValue) minValue = value;

        if (value > maxValue || !maxValue) maxValue = value;
      }

      // eslint-disable-next-line
      var formatter = new google.visualization.NumberFormat({
        decimalSymbol: ",",
        groupingSymbol: " ",
        fractionDigits: 0
      });

      data = GoogleCharts.api.visualization.arrayToDataTable(data);
      formatter.format(data, 1);
      var view = new GoogleCharts.api.visualization.DataView(data);
      view.setColumns([
        0,
        1,
        {
          calc: "stringify",
          sourceColumn: 1,
          type: "string",
          role: "annotation"
        },
        2
      ]);

      let options = {
        width: 800,
        height: 500,
        legend: { position: "none" },
        vAxis: {
          scaleType: minValue * 3 < maxValue && maxValue > 100 ? "log" : null
        },
        hAxis: { minValue: 100 },
        bar: { groupWidth: "90%" },
        theme: "material",
        tooltip: {
          isHtml: true
        }
      };

      let chart = new GoogleCharts.api.visualization.ColumnChart(
        document.getElementById("chart1")
      );

      chart.draw(view, options);
    }
  },
  watch: {
    selected() {
      this.drawChart();
    }
  }
};
</script>

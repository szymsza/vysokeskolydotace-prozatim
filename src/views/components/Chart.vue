<template>
  <div class="col" ref="chart-parent">
    <h1 class="col-12 text-center">{{ name }}</h1>
    <v-card :id="'chart-' + _uid" style="height: 500px"></v-card>
  </div>
</template>

<script>
import { GoogleCharts } from "google-charts";
export default {
  name: "Chart",
  props: {
    name: String,
    property: String,
    data: Object
  },
  data() {
    return {
      chart: null,
      chartData: null
    };
  },
  mounted() {
    GoogleCharts.load(this.draw, { packages: ["bar"] });
  },
  methods: {
    optionSelected() {
      let item = this.chart.getSelection()[0];
      let rowObject = this.chartData.wg[item.row].c;

      this.$emit("select", rowObject);
    },
    draw() {
      let table = [["Instituce", this.name, { role: "style" }, " "]];

      let colors = [
        "#1565C0",
        "#F44336",
        "#FFC107",
        "#1B5E20",
        "#9C27B0",
        "#4E342E",
        "#29B6F6",
        "#FF4081",
        "#8BC34A",
        "#EF6C00",
        "#37474F",
        "#000000",
        "#BDBDBD",
        "#76FF03",
        "#F8BBD0"
      ];

      let i = 0;
      let minValue;
      let maxValue;
      for (let ico in this.data) {
        let school = this.data[ico];
        let value = school[this.property];
        table.push([school.name, value, colors[i++], ico]);

        if (value < minValue || !minValue) minValue = value;

        if (value > maxValue || !maxValue) maxValue = value;
      }

      // eslint-disable-next-line
      var formatter = new google.visualization.NumberFormat({
        decimalSymbol: ",",
        groupingSymbol: " ",
        fractionDigits: 0
      });

      this.chartData = GoogleCharts.api.visualization.arrayToDataTable(table);
      formatter.format(this.chartData, 1);

      var view = new GoogleCharts.api.visualization.DataView(this.chartData);
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
        width: document.querySelector("body").offsetWidth / 2 - 50,
        height: 500,
        legend: { position: "none" },
        vAxis: {
          scaleType: minValue * 3 < maxValue && maxValue > 100 ? "log" : null,
          viewWindow: {
            min: 0
          }
        },
        bar: { groupWidth: "90%" },
        theme: "material",
        tooltip: {
          isHtml: true
        }
      };

      this.chart = new GoogleCharts.api.visualization.ColumnChart(
        document.getElementById("chart-" + this._uid)
      );

      this.chart.draw(view, options);

      GoogleCharts.api.visualization.events.addListener(
        this.chart,
        "select",
        this.optionSelected
      );
    }
  }
};
</script>

<style scoped></style>

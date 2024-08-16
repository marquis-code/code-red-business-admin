<template>
  <div class="w-full">
    <client-only>
      <div class="chart-wrapper md:w-full overflow-x-auto w-full">
        <apexchart
          class="md:w-full overflow-x-auto w-full"
          width="100%"
          height="200"
          type="bar"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartOptions: {
        chart: {
          id: "vuechart-example",
          toolbar: { show: false },
          type: "bar",
        },
        dataLabels: {
          enabled: false,
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            horizontal: false,
            borderRadiusApplication: "around",
            columnWidth: "50%",
            barHeight: "100%",
          },
        },
        xaxis: {
          categories: [
            1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1996, 1997, 1998,
            1991, 1992, 1993, 1994,
          ],
        },
        colors: [
          function ({ value, seriesIndex, w }) {
            if (value > 50) {
              return "#000000";
            } else {
              return "#000000";
            }
          },
        ],
        tooltip: {
          theme: "light",
          fillSeriesColor: false,
        },
      },
      series: [
        {
          name: "series-1",
          data: [100, 40, 35, 100, 49, 60, 70, 60, 40, 75, 50, 49, 40, 35, 100],
        },
      ],
    };
  },
};
</script>

<style scoped>
div.chart-wrapper {
  width: "90%";
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>

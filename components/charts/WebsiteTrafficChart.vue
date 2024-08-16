<template>
  <div class="border border-gray-100 shadow-sm rounded-xl">
    <div class="md:flex space-y-6 md:space-y-0 items-center justify-between px-3 md:px-7 py-4">
      <div class="">
        <h1 class="font-medium text-lg text-gray-900 py-0 my-0">
          Website Traffic
        </h1>
        <p class="text-gray-400 py-0 my-0 text-sm md:text-base">
          Comparison of source of website traffic
        </p>
      </div>
      <select class="text-sm font-medium bg-gray-100 rounded-md px-2.5 py-2 outline-none">
        <option>This year</option>
      </select>
    </div>
    <div class="chart-wrapper w-full overflow-x-auto pb-3">
      <client-only>
        <apexchart class="md:w-full md:hidden overflow-x-auto" width="500" height="242" type="pie"
          :options="chartOptions" :series="series"></apexchart>
        <apexchart class="md:w-full hidden md:block overflow-x-auto" width="500" type="pie" :options="chartOptions"
          :series="series"></apexchart>
      </client-only>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      series: [80, 20],
      chartOptions: {
        labels: ["Google search ", "Others"],
        dataLabels: {
          enabled: true,
        },
        legend: {
          show: true,
          showForSingleSeries: false,
          showForNullSeries: true,
          showForZeroSeries: true,
          position: "bottom",
          horizontalAlign: "center",
          fontSize: "16px",
          fontFamily: "Helvetica, Arial",
          fontWeight: 500,
          itemMargin: {
            horizontal: 15,
            vertical: 0,
          },
        },
        fill: {
          colors: ["#BDBDBD", "#000000"],
        },
        colors: ["#BDBDBD", "#000000"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "center",
                show: false,
              },
            },
          },
        ],
      },
    };
  },
};
</script>

<style scoped>
div.chart-wrapper {
  width: "100%";
  height: "100%";
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>

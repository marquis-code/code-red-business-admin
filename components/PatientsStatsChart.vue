<script setup lang="ts">
import { ref } from 'vue';

const chartOptions = ref({
    chart: {
        id: "hospital-stats-chart",
        toolbar: { show: false },
        type: "bar",
        // stacked: false,
    },
    plotOptions: {
           bar: {
      horizontal: false,
      borderRadius: 4,
      columnWidth: '40%',
      barHeight: '40%',
      endingShape: 'rounded',
      dataLabels: {
        position: 'top',
      },
    },
        // bar: {
        //     borderRadius: 8,
        //     horizontal: false,
        //     columnWidth: "45%",
        // },
    },
    dataLabels: {
        enabled: true,
    formatter: function (val: number) {
      return val.toString();
    },
    style: {
      colors: ['#000'],
    },
    offsetX: -10,
    offsetY: -20,
    textAnchor: "start"
        // enabled: true,
        // style: {
        //     colors: ['#000000'],
        //     fontSize: '14px',
        //     fontWeight: 'bold'
        // }
    },
    colors: ["#3b766f", "#f0c669"], // Matching the colors from the uploaded image
    xaxis: {
        categories: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        labels: {
            style: {
                fontSize: '14px',
                fontWeight: 500
            }
        },
    },
    yaxis: {
        title: {
            text: 'Count',
            style: {
                fontSize: '14px',
                fontWeight: 600
            }
        },
        labels: {
            formatter: (value) => value.toFixed(0),
            style: {
                fontSize: '14px',
                fontWeight: 500
            }
        },
        min: 0,
        max: 1000,
        tickAmount: 5,
    },
    tooltip: {
        theme: "light",
    },
    legend: {
        position: 'top',
        horizontalAlign: 'center',
        labels: {
            colors: ['#3b766f', '#f0c669'],
            useSeriesColors: true
        }
    },
    grid: {
        show: true,
        borderColor: '#e0e0e0',
    }
});

const series = ref([
    {
        name: "Patient",
        data: [950, 792, 501, 800, 500, 500, 280],
    },
    {
        name: "Inpatient",
        data: [480, 493, 150, 523, 150, 150, 100],
    }
]);
</script>

<template>
  <div class="">
    <p class="font-medium pl-8">Patient Statistics</p>
    <apexchart type="bar" height="400" :options="chartOptions" :series="series" />
  </div>
</template>

<style scoped>
/* Customize your styles here if needed */
</style>

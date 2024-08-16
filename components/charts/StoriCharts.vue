<template>
    <div class="bg-[#F3F2F2] space-y-3">
        <div class="md:flex space-y-4 md:space-y-0 justify-between items-center">
            <div>
                <p class="text-[#ACAFAE] py-0 my-0 text-sm md:text-lg font-medium">
                    Today, 9 January
                </p>
                <h1 class="py-0 my-0 text-xl">3h 50m</h1>
            </div>
            <div class="flex items-center gap-x-3">
                <select class="text-sm outline-none font-medium bg-gray-100 rounded-md px-2.5 py-2 w-full">
                    <option>Daily</option>
                    <option>Monthly</option>
                </select>
            </div>
        </div>
        <client-only>
            <div class="chart-wrapper md:w-full overflow-x-auto">
                <apexchart class="md:w-full overflow-x-auto" width="1000" height="200" type="bar"
                    :options="chartOptions" :series="series"></apexchart>
            </div>
        </client-only>
    </div>
</template>

<script setup lang="ts">
const chartOptions = ref({
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
    colors: [
        function ({ value, seriesIndex, w }) {
            if (value > 50) {
                return "#000000";
            } else {
                return "#000000";
            }
        },
    ],
    xaxis: {
        categories: [
            1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1996, 1997, 1998,
            1991, 1992, 1993, 1994,
        ],
    },
    tooltip: {
        theme: "light",
        fillSeriesColor: false,
    },
})
const series = ref([
    {
        name: "series-1",
        data: [100, 40, 35, 100, 49, 60, 70, 60, 40, 75, 50, 49, 40, 35, 100],
    },
])
</script>

<style scoped></style>
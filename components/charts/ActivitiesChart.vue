<template>
  <div class="bg-white shadow rounded-md p-6 md:p-6 space-y-3">
    <div class="md:flex space-y-4 md:space-y-0 justify-between items-center">
      <div class="flex justify-end items-end">
        <div class="flex">
          <div>
            <fieldset>
              <legend class="sr-only">Notifications</legend>
              <div class="space-y-5">
                <div class="relative flex items-start">
                  <div class="flex h-6 items-center">
                    <input :checked="showAll" :value="showAll" v-model="showAll" id="comments"
                      aria-describedby="comments-description" name="comments" type="checkbox"
                      class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600">
                  </div>
                  <div class="ml-3 text-sm leading-6">
                    <label for="comments" class="font-medium text-gray-900"
                      alt="Get all statistics data across storipod.">Show All</label>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
          <div>
            <CoreDateInput :disabled="showAll" v-model="dateFilter" range placeholder="Filter by date"
              :disabled-date="() => null" clearable />
          </div>
        </div>
      </div>
      <div class="flex items-center gap-x-3">
        <select v-model="metaObj.userType" @change="updateChartData"
          class="text-sm outline-none font-medium bg-gray-100 rounded-md px-2.5 py-2 w-full">
          <option value="signups">Signup</option>
          <option value="active">Active</option>
        </select>
        <select v-model="metaObj.datePart" @change="updateChartData"
          class="text-sm outline-none font-medium bg-gray-100 rounded-md px-2.5 py-2 w-full">
          <option value="day">Daily</option>
          <option value="week">Weekly</option>
          <option value="month">Monthly</option>
          <option value="year">Yearly</option>
        </select>
      </div>
    </div>
    <client-only>
      <div class="chart-wrapper md:w-full overflow-x-auto hide-scrollbar">
        <apexchart v-if="!loading" class="md:w-full" width="1000" height="330" type="bar" :options="chartOptions"
          :series="series"></apexchart>
        <div v-else class="rounded-md bg-slate-300 h-96 w-full animate-pulse"></div>
      </div>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { useFetchUserChartData } from '@/composables/user/fetchChartData'

// Initialize composable
const { fetchChartData, chartDataObj, loading, setChartData, metaObj } = useFetchUserChartData();
const dateFilter = ref<any>(null);
const showAll = ref<boolean>(true);
// Function to update chart data based on metaObj
const updateChartData = () => {
  fetchChartData();
}

onMounted(() => {
  updateChartData();
});

watch([dateFilter, showAll, () => metaObj.value.datePart, () => metaObj.value.userType], () => {
  const payload = {
    startDate: dateFilter?.value?.[0] || metaObj.value.startDate,
    endDate: dateFilter?.value?.[1] || metaObj.value.endDate,
    showAll: showAll.value,
    datePart: metaObj.value.datePart,
    userType: metaObj.value.userType
  };
  setChartData(payload);
  fetchChartData();
}, { deep: true });

// Helper function to get the first and last day of the current month
const getCurrentMonthRange = () => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { firstDay, lastDay };
};

// Initialize startDate and endDate to the first and last day of the current month
const { firstDay, lastDay } = getCurrentMonthRange();
metaObj.value.startDate = firstDay.toISOString().split('T')[0];
metaObj.value.endDate = lastDay.toISOString().split('T')[0];

const chartOptions = ref({
  chart: {
    id: "vuechart-example",
    // stacked: true,
    fontFamily: "'Plus Jakarta Sans', sans-serif;",
    toolbar: { show: false },
    height: 380,
    type: "bar"
  },
  dataLabels: {
    enabled: true,
    formatter: function (val: number) {
      // return val.toString().concat('%');
      return val.toString();
    },
    style: {
      colors: ['#000'],
    },
    offsetX: -10,
    offsetY: -20,
    textAnchor: "start"
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
    categories: [], // Will be updated dynamically
  },
  tooltip: {
    theme: "light",
    fillSeriesColor: false,
  },
});

const series = ref([
  {
    name: "Number of Users",
    data: [], // Will be updated dynamically
  },
]);

// Watch for changes in chartDataObj and update chart configuration
watch(chartDataObj, (newData) => {
  if (newData && newData.labels && newData.datasets) {
    chartOptions.value.xaxis.categories = newData.labels;
    series.value = newData.datasets.map(dataset => ({
      name: dataset.label,
      data: dataset.data,
    }));
  }
}, { immediate: true });
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, and Opera */
}
</style>

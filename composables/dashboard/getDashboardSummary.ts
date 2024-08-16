import { dashboardApiFactory } from "@/apiFactory/dashboard";
import { ref, watch } from "vue";

export const useFetchDashboardSummary = () => {
  const dashboardSummary = ref({}) as Record<string, any>;
  const metaObj = ref({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().substr(0, 10),
    endDate: new Date().toISOString().substr(0, 10),
    showAll: true,
  });
  const loading = ref(false);

  const fetchDashboardSummary = async () => {
    loading.value = true;
    try {
      const response = await dashboardApiFactory.getDashboardSummary(metaObj.value);
      console.log(response, 'res here');
      if (response && response.data) {
        dashboardSummary.value = response.data;
      }
    } catch (error) {
      useNuxtApp().$toast.error(error.message, {
        autoClose: 5000,
        dangerouslyHTMLString: true,
      });
      return error;
    } finally {
      loading.value = false;
    }
  };

  const setFilterData = (data: any) => {
    metaObj.value.startDate = data.startDate || new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().substr(0, 10);
    metaObj.value.endDate = data.endDate || new Date().toISOString().substr(0, 10);
    metaObj.value.showAll = data.showAll || false;
  };

  // Watch for changes in startDate and endDate and fetch data accordingly
  watch([metaObj.value.startDate, metaObj.value.endDate, metaObj.value.showAll], () => {
    fetchDashboardSummary();
  });

  return {
    fetchDashboardSummary,
    dashboardSummary,
    loading,
    metaObj,
    setFilterData,
  };
};

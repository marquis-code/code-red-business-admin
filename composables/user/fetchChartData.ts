import { ref } from 'vue';
import { userApiFactory } from "@/apiFactory/users";

export const useFetchUserChartData = () => {
  const chartDataObj = ref([]) as any;
  const loading = ref(false);
  const metaObj = ref({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().substr(0, 10),
    showAll: true,
    endDate: new Date().toISOString().substr(0, 10),
    datePart: 'month',
    userType: ''
  });

  const fetchChartData = async () => {
    loading.value = true;
    try {
      const response = await userApiFactory.getUserChartData(metaObj.value);
      chartDataObj.value = response?.data ?? {};
    } catch (error: any) {
      useNuxtApp().$toast.error(error.message, {
        autoClose: 5000,
        dangerouslyHTMLString: true,
      });
      return error;
    } finally {
      loading.value = false;
    }
  };

  const setChartData = (data) => {
    metaObj.value.startDate = data.startDate || new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().substr(0, 10);;
    metaObj.value.endDate = data.endDate || new Date().toISOString().substr(0, 10);;
    metaObj.value.datePart = data.datePart;
    metaObj.value.userType = data.userType || 'signups';
    metaObj.value.showAll = data.showAll || false
  };

  // Helper function to get the first and last day of the current month
  const getCurrentMonthRange = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { firstDay, lastDay };
  };

  // Initialize metaObj with default start and end dates
  const { firstDay, lastDay } = getCurrentMonthRange();
  metaObj.value.startDate = firstDay.toISOString().split('T')[0];
  metaObj.value.endDate = lastDay.toISOString().split('T')[0];
  metaObj.value.datePart = 'month';
  metaObj.value.userType = 'signups';

  return { fetchChartData, chartDataObj, loading, setChartData, metaObj };
};

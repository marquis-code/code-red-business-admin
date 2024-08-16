import { reportsApiFactory } from "@/apiFactory/reports";

export const useFetchReportedStories = () => {
  const reportedStoriesList = ref([]);
  const loading = ref(false);
  const fetchReportedStories = async () => {
    loading.value = true;
    try {
      const response = await reportsApiFactory.getReportedStories();
      reportedStoriesList.value = response.data;
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

  return { fetchReportedStories, reportedStoriesList, loading };
};

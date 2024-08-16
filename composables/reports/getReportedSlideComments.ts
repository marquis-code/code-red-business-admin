import { reportsApiFactory } from "@/apiFactory/reports";

export const useFetchReportedSlideComments = () => {
  const reportedSlideCommentsList = ref([]);
  const loading = ref(false);
  const fetchReportedSlideComments = async () => {
    loading.value = true;
    try {
      const response = await reportsApiFactory.getReportedSlideComments();
      reportedSlideCommentsList.value = response.data;
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

  return { fetchReportedSlideComments, reportedSlideCommentsList, loading };
};

import { reportsApiFactory } from "@/apiFactory/reports";

export const useCreateReport = () => {
  const loading = ref(false);
  const payload = ref({});
  const createReport = async () => {
    loading.value = true;
    try {
      const response = await reportsApiFactory.createReport(payload);
      return response
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

  return { createReport, payload, loading };
};

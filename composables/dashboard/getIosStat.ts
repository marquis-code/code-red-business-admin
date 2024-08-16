import { dashboardApiFactory } from "@/apiFactory/dashboard";

export const useFetchIosStat = () => {
  const iosStatObj = ref({});
  const loading = ref(false);
  const fetchIosStat = async () => {
    loading.value = true;
    try {
      const response = await dashboardApiFactory.getIosStat();
      iosStatObj.value = response?.data ?? {};
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
  return { fetchIosStat, iosStatObj, loading };
};

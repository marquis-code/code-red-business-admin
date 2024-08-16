import { adminApiFactory } from "@/apiFactory/admin";

export const useCreateAdmin = () => {
  const loading = ref(false);
  const payload = ref({});
  const createAdmin = async () => {
    loading.value = true;
    try {
      const response = await reportsApiFactory.adminApiFactory(payload);
      return response;
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

  return { createAdmin, payload, loading };
};

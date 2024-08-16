import { storyApiFactory } from "@/apiFactory/story";

export const useFetchStorySummary = () => {
  const storySummary = ref([]);
  const loading = ref(false);
  const fetchUserSummary = async () => {
    loading.value = true;
    try {
      const response = await storyApiFactory .getAllStorySummary();
      storySummary.value = response.data;
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

  return { fetchUserSummary, storySummary, loading };
};

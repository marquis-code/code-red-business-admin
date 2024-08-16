import { storyApiFactory } from "@/apiFactory/story";

export const useFetchStoryEngagementSummary = () => {
  const storyEngagementSummary = ref([]);
  const loading = ref(false);
  const fetchStoryEngagementSummary = async () => {
    loading.value = true;
    try {
      const response = await storyApiFactory .getAllStorySummary();
      storyEngagementSummary.value = response.data;
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

  return { fetchStoryEngagementSummary, storyEngagementSummary, loading };
};

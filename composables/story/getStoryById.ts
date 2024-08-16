import { storyApiFactory } from "@/apiFactory/story";

export const useFetchStoryById = () => {
  const story = ref([]);
  const storyId = useRoute().params.id;
  const loading = ref(false);
  const fetchStory = async () => {
    loading.value = true;
    try {
      const response = await storyApiFactory.getAllStoryById(storyId);
      story.value = response.data;
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

  onMounted(() => {
    fetchStory()
  })

  return { fetchStory, story, loading };
};

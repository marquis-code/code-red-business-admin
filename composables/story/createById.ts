import { storyApiFactory } from "@/apiFactory/story";
import { ref, computed } from "vue";
import { useRouter, useRoute } from 'vue-router';
const loading = ref(false);
const payload = ref({
  isPublished: true,
  title: "",
  tags: "",
  userId: "",
  coverImage: "",
  storyCategories: [],
  slides: [],
}) as any;
const descriptionLength = ref(700) as any;
const router = useRouter();
const route = useRoute();

export const useCreateUserStory = () => {
  const createUserStory = async () => {
    loading.value = true;
    try {
      const response = await storyApiFactory.createUserStory(payload.value);
      useNuxtApp().$toast.success("Story was published successfully", {
        autoClose: 5000,
        dangerouslyHTMLString: true,
      })
      // location.href = '/dashboard/users'
      // router.push({ path: `/dashboard/users/${route.params.id}` });
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

  const disabled = computed(() => {
    return !(payload.value.title && payload.value.slides.length);
  });

  const setPayload = (data: any) => {
    payload.value.isPublished = data.isPublished;
    payload.value.title = data.title;
    payload.value.tags = data.tags;
    payload.value.userId = data.userId;
    payload.value.storyCategories = data.storyCategories;
    payload.value.slides = data.slides;
    payload.value.coverImage = data.coverImage;
  };

  return {
    createUserStory,
    payload,
    loading,
    disabled,
    descriptionLength,
    setPayload,
  };
};

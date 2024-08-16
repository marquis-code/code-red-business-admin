import { notificationApiFactory } from "@/apiFactory/notification";

export const useFetchNotificationList = () => {
  const notificationList = ref({});
  const loading = ref(false);
  const fetchNotificationList = async () => {
    loading.value = true;
    try {
      const response = await notificationApiFactory.getNotificationList();
      notificationList.value = response.data;
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

  return { fetchNotificationList, notificationList, loading };
};

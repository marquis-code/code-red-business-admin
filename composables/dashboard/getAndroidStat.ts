import { ref } from 'vue';
import { dashboardApiFactory } from '@/apiFactory/dashboard';
import { useNuxtApp } from '#app';

export const useFetchAndroidStat = () => {
  const androidStatObj = ref({});
  const loading = ref(false);

  const fetchAndroidStat = async () => {
    loading.value = true;
    try {
      const response = await dashboardApiFactory.getAndroidStat();
      console.log(response.data.download, 'here');
      androidStatObj.value = response?.data ?? {}
    } catch (error: any) {
      useNuxtApp().$toast.error(error.message, {
        autoClose: 5000,
        dangerouslyHTMLString: true,
      });
    } finally {
      loading.value = false;
    }
  };

  return { fetchAndroidStat, androidStatObj, loading };
};

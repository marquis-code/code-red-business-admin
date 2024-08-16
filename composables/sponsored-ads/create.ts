import { adsApiFactory } from "@/apiFactory/ads";

export const useCreateSponsoredAds = () => {
  const loading = ref(false);
  const payload = ref({
    clientName: "",
    imageUrl: "",
    targetLink: "",
    startDate: "",
    endDate: "",
    status: "",
  });
  const createSponsoredAds = async () => {
    loading.value = true;
    try {
      const response = await adsApiFactory.$_create_ads(payload.value);
      useNuxtApp().$toast.success('Add was created successfully', {
        autoClose: 5000,
        dangerouslyHTMLString: true,
      });
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

  const setSponsoredAds = (data: any) => {
    payload.value.clientName = data.clientName 
    payload.value.imageUrl = data.imageUrl
    payload.value.targetLink = data.targetLink
    payload.value.startDate  = data.startDate
    payload.value.endDate  = data.endDate
    payload.value.status  = data.status
  }

  return { createSponsoredAds, payload, loading, setSponsoredAds };
};

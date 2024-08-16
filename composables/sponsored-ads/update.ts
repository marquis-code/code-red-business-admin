import { adsApiFactory } from "@/apiFactory/ads";
const route = useRoute()
export const useUpdateSponsoredAds = () => {
  const loading = ref(false);
  const payload = ref({
    clientName: "",
    imageUrl: "",
    targetLink: "",
    startDate: "",
    endDate: "",
    status: "",
  });
  const updateSponsoredAds = async () => {
    loading.value = true;
    try {
      const response = await adsApiFactory.$_update_ads(route.query.id, payload.value);
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


  const setSponsoredAdsUpdate = (data: any) => {
    payload.value.clientName = data.clientName 
    payload.value.imageUrl = data.imageUrl
    payload.value.targetLink = data.targetLink
    payload.value.startDate  = data.startDate
    payload.value.endDate  = data.endDate
    payload.value.status  = data.status
  }

  return { updateSponsoredAds, payload, loading, setSponsoredAdsUpdate };
};

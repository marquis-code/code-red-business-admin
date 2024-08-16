import { axiosInstance } from "./axios.config";

export const adsApiFactory = {
  $_create_ads(payload: Record<string, any>) {
    return axiosInstance.post("/adverts", payload);
  },

  $_update_ads(id: string | number, payload: Record<string, any>) {
    return axiosInstance.patch(`/adverts/${id}`, payload);
  },

  $_fetch_ads() {
    return axiosInstance.get("/adverts");
  },

  $_fetch_ads_by_id(id: string | number) {
    return axiosInstance.get(`/adverts/${id}`);
  },

  $_delete_ads(id: string | number) {
    return axiosInstance.delete(`/adverts/${id}`);
  },
};

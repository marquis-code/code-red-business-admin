import { axiosInstance } from "./axios.config";

export const notificationApiFactory = {
  getNotificationList() {
    return axiosInstance.get('/notification?page=1&limit=10');
  },
};

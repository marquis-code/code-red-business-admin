import { axiosInstance } from "./axios.config";

export const reportsApiFactory = {
  createReport(payload: any) {
    return axiosInstance.post("/report/", payload);
  },
  getReportedUsers() {
    return axiosInstance.get(`/report/users?page=1&perpage=10`);
  },
  getReportedStories() {
    return axiosInstance.get(`/report/stories?sortBy&reported=true&page=1&limit=10`);
  },
  getReportedSlideComments() {
    return axiosInstance.get(`/report/slide-comments?sortBy&reported=true&page=1&limit=10`);
  },
};

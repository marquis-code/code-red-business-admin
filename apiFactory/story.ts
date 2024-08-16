import { axiosInstance } from "./axios.config";

export const storyApiFactory = {
  getAllStories(queryObj: {sortBy: string, orderBy: string}, metadata: { page: number; perPage: number }) {
    return axiosInstance.get(
      `/story?sortBy=${queryObj.sortBy}:${queryObj.orderBy}&page=${Number(metadata.page)}&perPage=${Number(metadata.perPage)}`
    );
  },
  getStoryByUserId(userId: string | number, queryObj: {sortBy: string, orderBy: string}, metadata: { page: number; perPage: number }) {
    return axiosInstance.get(`/story?userId=${userId}&sortBy=${queryObj.sortBy}:${queryObj.orderBy}&page=${Number(metadata.page)}&perPage=${Number(metadata.perPage)}`);
  },
  getAllStoryById(id: string) {
    return axiosInstance.get(`/story/${id}`);
  },
  getAllStorySummary() {
    return axiosInstance.get("/story/summary");
  },
  getAllStoryEngagementSummary() {
    return axiosInstance.get("/story/engagement-summary");
  },
  getStorySideComments(slideId: string) {
    return axiosInstance.get(
      `/slide-comment?page=1&limit=10&slideId=${slideId}&search=`
    );
  },
  createUserStory(payload: any) {
    return axiosInstance.post('/story', payload);
  },
  deleteUserStory(id: string | number) {
    return axiosInstance.delete(`/story/${id}`);
  },
  getUserStoryChartData(metaData: any){
    const url = `/story/chart/count?showAll=${metaData.showAll}&startDate=${metaData.startDate}&endDate=${metaData.endDate}&datePart=${metaData.datePart}&userType=${metaData.userType}`
    return axiosInstance.get(url);
  }
};

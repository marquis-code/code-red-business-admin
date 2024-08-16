import { axiosInstance, storipodAxiosInstance } from "./axios.config";

export const userApiFactory = {
  getUsersList(metadata: { page: number; perPage: number }, searchQuery: any, sortBy?: string) {
    let endpoint = `/user/all?page=${metadata.page}&perPage=${metadata.perPage}`;
    if (searchQuery && searchQuery.trim() !== "") {
      endpoint += `&search=${encodeURIComponent(searchQuery.trim())}`;
    }
    if (sortBy && sortBy.trim() !== "") {
      endpoint += `&sort=${encodeURIComponent(sortBy.trim())}`; //DESC or ASC
    }
    return axiosInstance.get(endpoint);
  },
  getUserById(id: string) {
    return axiosInstance.get(`/user/${id}`);
  },
  getActiveUsers() {
    return axiosInstance.get("/user/active-users-summary");
  },
  getSignupSummary() {
    return axiosInstance.get("/user/signup-summary");
  },
  getTopUsers() {
    return axiosInstance.get("/user/top-users");
  },
  getUserProfile() {
    return axiosInstance.get("/user/profile");
  },
  getUserFollowers(userId: string, metadata: { page: number; perPage: number }) {
    return axiosInstance.get(`/user/${userId}/followers?page=${metadata.page}&perPage=${metadata.perPage}`);
  },
  getUserFollowing(userId: string, metadata: { page: number; perPage: number }) {
    return axiosInstance.get(`/user/${userId}/following?page=${metadata.page}&perPage=${metadata.perPage}`);
  },
  getUserFollowersCount(userId: string) {
    return axiosInstance.get(`/users/${userId}/followers/count`);
  },
  getUserFollowingCount(userId: string) {
    return axiosInstance.get(`/users/${userId}/followings/count`);
  },
  getUserSummary(userId: string) {
    return axiosInstance.get(`/user/${userId}/summary`);
  },
  deactivateUser(userId: string, payload: any) {
    return axiosInstance.post(`/user/${userId}/status`, payload);
  },
  removeUser(id: string | number) {
    const url = `/users/${id}`;
    return axiosInstance.delete(url);
  },
  editUser(id: string | number, payload: any) {
    const url = `/users/${id}/edit`;
    return axiosInstance.patch(url, payload);
  },
  createUser(payload: any) {
    return axiosInstance.post("/user/create-user", payload);
  },
  getUserInterests(metadata: { page: number; perPage: number, search?: string }) {
    return storipodAxiosInstance.get(`/categories/all?page=${metadata.page}&perPage=${metadata.perPage}&hasStories=false&search=${metadata.search}`);
  },
  // getUserInterestsBySearch(metadata: { page: number; perPage: number, search: string }) {
  //   return storipodAxiosInstance.get(`/categories?page=${metadata.page}&perPage=${metadata.perPage}&search=${metadata.search}`);
  // },
  getMostRecentUsers(id: string) {
    return axiosInstance.get(`/user/${id}`);
  },
  getTotalUsers() {
    let endpoint = `/user/all`;
    return axiosInstance.get(endpoint);
  },
  getUserChartData(metaData: any){
    const userType = metaData.userType || 'signups';
    const url = `/user/chart/count?showAll=${metaData.showAll}&startDate=${metaData.startDate}&endDate=${metaData.endDate}&datePart=${metaData.datePart}&userType=${userType}`;
    return axiosInstance.get(url);
  }
};

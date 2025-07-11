import axiosInstance from "../utils/axiosInstance";

export const createShortUrl = async (url) => {
  const response = await axiosInstance.post("/api/create", {
    url,
  });
  return response.data.short_url;
};

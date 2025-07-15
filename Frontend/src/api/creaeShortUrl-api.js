import axiosInstance from "../utils/axiosInstance";

export const createShortUrl = async (url, slug) => {
  const response = await axiosInstance.post("/api/url/create", {
    url,
    slug,
  });
  return response.data.short_url;
};

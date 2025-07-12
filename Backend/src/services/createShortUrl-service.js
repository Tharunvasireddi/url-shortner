import { saveShortUrl } from "../dao/short_url.js";
import { generateNanoId } from "../utils/helper.js";

const createShortUrlWithoutUser = async (url) => {
  const short_url = await generateNanoId(7);
  if (!short_url) throw new Error("short URL not generated");
  await saveShortUrl(short_url, url);
  return short_url;
};

const createShortUrlWithUser = async (url, userId) => {
  const short_url = await generateNanoId(7);
  await saveShortUrl(short_url, url, userId);
  return short_url;
};

export { createShortUrlWithoutUser, createShortUrlWithUser };

import { getCustomShortUrl, saveShortUrl } from "../dao/short_url.js";
import { generateNanoId } from "../utils/helper.js";

const createShortUrlWithoutUser = async (url) => {
  const short_url = generateNanoId(7);
  if (!short_url) throw new Error("short URL not generated");
  await saveShortUrl(short_url, url);
  return short_url;
};

const createShortUrlWithUser = async (url, userId, slug = null) => {
  const short_url = slug ? slug : generateNanoId(7);
  const exists = await getCustomShortUrl(slug);
  if (exists) throw new Error("This is already existed");
  await saveShortUrl(short_url, url, userId);
  return short_url;
};

export { createShortUrlWithoutUser, createShortUrlWithUser };

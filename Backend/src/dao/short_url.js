import { shortUrl } from "../models/shorturlmodel.js";
import { ConflictError } from "../utils/errorhandler.js";

const saveShortUrl = async (short_url, full_url, userId) => {
  try {
    const newUrl = new shortUrl({
      full_url: full_url,
      short_url: short_url,
    });
    if (userId) {
      newUrl.user = userId;
    }
    await newUrl.save();
  } catch (error) {
    console.log("this is a new error", error);
    if (error.code == 11000) {
      throw new ConflictError("short url already exist");
    }
    throw new Error(error);
  }
};

const getShortUrl = async (short_url) => {
  const url = await shortUrl.findOneAndUpdate(
    { short_url },
    { $inc: { clicks: 1 } }
  );
  return url;
};

const getCustomShortUrl = async (slug) => {
  return await shortUrl.findOne({ short_url: slug });
};

export { saveShortUrl, getShortUrl, getCustomShortUrl };

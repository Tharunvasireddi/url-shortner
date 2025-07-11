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
  await  newUrl.save();
  } catch (error) {
    console.log("this is a new error",error);
    if (error.code == 11000) {
      throw new ConflictError("short url already exist");
    }
    console.log("hi i am doa error");
    throw new Error(error);
  }
};

const getShortUrl = async (short_url) => {
  console.log(short_url);
  const url = await shortUrl.findOneAndUpdate(
    { short_url },
    { $inc: { clicks: 1 } }
  );
  return url;
};

export { saveShortUrl, getShortUrl };

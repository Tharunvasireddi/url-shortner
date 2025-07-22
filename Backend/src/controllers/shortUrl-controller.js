import { getShortUrl } from "../dao/short_url.js";
import dotenv from "dotenv";
dotenv.config();
import {
  createShortUrlWithoutUser,
  createShortUrlWithUser,
} from "../services/createShortUrl-service.js";
import wrapAsync from "../utils/tryCatchWrafer.js";
import { shortUrl } from "../models/shorturlmodel.js";
const shortUrlController = wrapAsync(async (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json({
      status: false,
      message: "url is not found",
    });
  }

  let short_url;
  console.log(req.user);
  if (req.user) {
    short_url = await createShortUrlWithUser(data.url, req.user._id, data.slug);
  } else {
    short_url = await createShortUrlWithoutUser(data.url);
  }
  res.status(200).json({ short_url: short_url });
});

const redirectFromShortUrlController = wrapAsync(async (req, res) => {
  console.log(req.params.id);
  const short_url = req.params.id;
  const url = await getShortUrl(short_url);
  res.redirect(url.full_url);
});
export { shortUrlController, redirectFromShortUrlController };

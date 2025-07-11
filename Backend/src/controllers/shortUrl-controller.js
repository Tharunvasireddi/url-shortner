import { getShortUrl } from "../dao/short_url.js";
import dotenv from "dotenv";
dotenv.config();
import {
  createShortUrlWithoutUser,
  createShortUrlWithUser,
} from "../services/createShortUrl-service.js";
import wrapAsync from "../utils/tryCatchWrafer.js";
const shortUrlController = wrapAsync(async (req, res) => {
  const url = req.body.url;
  if (!url) {
    return res.status(400).json({
      status: false,
      message: "url is not found",
    });
  }
  const short_url = await createShortUrlWithoutUser(url);
  console.log("hi hello i am no error", short_url);
  console.log("jhpief", process.env.APP_URL + short_url);
  res
    .status(200)
    .json({ short_url: process.env.APP_URL + "/api/" + short_url });
});

const redirectFromShortUrlController = wrapAsync(async (req, res) => {
  console.log("hi this redirect controller");
  const short_url = req.params.id;
  console.log(short_url);
  const url = await getShortUrl(short_url);
  console.log(url);
  res.redirect(url.full_url);
});
export { shortUrlController, redirectFromShortUrlController };

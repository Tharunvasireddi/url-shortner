import { deleteUrl, getAllUrls } from "../dao/user_doa.js";
import wrapAsync from "../utils/tryCatchWrafer.js";

const getUrlsController = wrapAsync(async (req, res) => {
  const id = req.user._id;
  const urls = await getAllUrls(id);
  if (!urls) {
    return res.status(400).json({
      success: false,
      message: "failed to fetch the urls",
    });
  }
  res.status(200).json({
    success: true,
    message: "successfully fetched the urls",
    data: urls,
  });
});

const deleteUrlController = wrapAsync(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const url = await deleteUrl(id);
  if (!url) {
    return res.status(400).json({
      success: false,
      message: "failed to delete url",
    });
  }
  res.status(200).json({
    success: true,
    message: "successfully deleted the url",
  });
});

export { getUrlsController, deleteUrlController };

import React, { useEffect, useState } from "react";
import { createShortUrl } from "../api/creaeShortUrl-api";
import { deleteUrl, getUserUrls } from "../api/userapi.js";

export const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [allUrls, setAllUrls] = useState([]);
  const [copiedMap, setCopiedMap] = useState({});

  const BASE_URL = "http://localhost:3000/api";


  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const data = await getUserUrls();
        setAllUrls(data.data.data || []);
      } catch (error) {
        console.error("Failed to fetch URLs:", error);
      }
    };
    fetchUrls();
  }, []);

  const handleSubmit = async () => {
    if (!url.trim()) return;
    try {
      const short = await createShortUrl(url,customSlug);
      setShortUrl(short);
      setCopied(false);
      setUrl("");
      setCustomSlug("");

      const data = await getUserUrls();
      setAllUrls(data.data.data || []);
    } catch (error) {
      console.error("Error creating short URL:", error);
    }
  };

  const handleCopy = (text, id = null) => {
    navigator.clipboard.writeText(text);
    if (id) {
      setCopiedMap((prev) => ({ ...prev, [id]: true }));
      setTimeout(() => {
        setCopiedMap((prev) => ({ ...prev, [id]: false }));
      }, 2000);
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDelete = async (id) => {
    await deleteUrl(id);
    const updated = await getUserUrls();
    setAllUrls(updated.data.data || []);
  };

  return (
    <div className="max-w-3xl w-full mx-auto px-4 py-6 sm:px-6 sm:py-8 bg-white shadow-lg rounded-xl">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-semibold text-gray-700"
          >
            Enter your URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="slug"
            className="block text-sm font-semibold text-gray-700"
          >
            Custom Slug (optional)
          </label>
          <input
            type="text"
            id="slug"
            value={customSlug}
            onChange={(e) => setCustomSlug(e.target.value)}
            placeholder="e.g. my-custom-link"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Shorten URL
        </button>
      </div>

      {shortUrl && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">
            Your new shortened URL:
          </h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              type="text"
              readOnly
              value={`${shortUrl}`}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 break-all"
            />
            <button
              onClick={() => handleCopy(`${BASE_URL}/${shortUrl}`)}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                copied
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}

      {allUrls.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4 text-blue-700">
            Your URL History
          </h2>
          <ul className="space-y-4">
            {allUrls.map((item) => {
              const fullShortUrl = `${BASE_URL}/${item.short_url}`;
              return (
                <li
                  key={item._id}
                  className="p-4 bg-gray-50 border border-gray-200 rounded-md space-y-3"
                >
                  <div>
                    <div className="text-sm font-medium text-gray-600">
                      Original URL:
                    </div>
                    <a
                      href={item.full_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline break-words"
                    >
                      {item.full_url}
                    </a>
                  </div>

                  <div>
                    <div className="text-sm font-medium text-gray-600">
                      Shortened URL:
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-wrap">
                      <a
                        href={fullShortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-700 underline break-all"
                      >
                        {fullShortUrl}
                      </a>
                      <button
                        onClick={() => handleCopy(fullShortUrl, item._id)}
                        className={`text-sm px-3 py-1 rounded-md transition-colors duration-200 ${
                          copiedMap[item._id]
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        {copiedMap[item._id] ? "Copied!" : "Copy"}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item._id)}
                        className="text-sm px-4 py-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition-colors duration-200"
                      >
                        Delete
                      </button>
                    </div>

                    <div className="mt-1 text-xs font-medium text-purple-600 bg-purple-100 w-fit px-2 py-1 rounded">
                      🔁 Clicks: {item.clicks}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

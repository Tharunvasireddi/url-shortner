import React, { useEffect, useState } from "react";
import { createShortUrl } from "../api/creaeShortUrl-api";
import { deleteUrl, getUserUrls } from "../api/userapi.js";
import { Link2, Copy, Trash2, ExternalLink, Scissors, CheckCircle, AlertCircle, Plus, Globe } from "lucide-react";

export const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [allUrls, setAllUrls] = useState([]);
  const [copiedMap, setCopiedMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const BASE_URL = "https://url-shortner-8j2b.onrender.com/api";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) {
      setError("Please enter a valid URL");
      return;
    }
    
    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      const short = await createShortUrl(url, customSlug);
      setShortUrl(short);
      setCopied(false);
      setUrl("");
      setCustomSlug("");
      setSuccess("URL shortened successfully!");

      const data = await getUserUrls();
      setAllUrls(data.data.data || []);
    } catch (error) {
      console.error("Error creating short URL:", error);
      setError(error.message || "Failed to shorten URL. Please try again.");
    } finally {
      setLoading(false);
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
    <div className="max-w-6xl w-full mx-auto px-4 py-6 sm:px-6 sm:py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Scissors className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">URL Shortener</h1>
        <p className="text-gray-600">Transform long URLs into short, shareable links</p>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100 mb-8">
        {/* Status Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-800 font-medium">Error</p>
              <p className="text-red-700 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-green-800 font-medium">Success!</p>
              <p className="text-green-700 text-sm mt-1">{success}</p>
            </div>
          </div>
        )}

        {/* URL Shortening Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* URL Input */}
          <div>
            <label htmlFor="url" className="block text-sm font-semibold text-gray-700 mb-2">
              Enter your URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/very-long-url"
                required
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>

          {/* Custom Slug Input */}
          <div>
            <label htmlFor="customSlug" className="block text-sm font-semibold text-gray-700 mb-2">
              Custom Slug (optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Link2 className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="customSlug"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                placeholder="my-custom-link"
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Leave empty for auto-generated slug</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Shortening...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Scissors className="w-5 h-5" />
                Shorten URL
              </div>
            )}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">
              Your new shortened URL:
            </h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="text"
                readOnly
                value={`${BASE_URL}/${shortUrl}`}
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
    </div>
  );
}

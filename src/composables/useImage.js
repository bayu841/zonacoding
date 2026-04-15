/**
 * Composable for image handling using env storage API.
 */
export const useImage = () => {
  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL || "";

  /**
   * Checks if a string is a single emoji or contains emojis that shouldn't be processed.
   */
  const isEmoji = (str) => {
    if (!str) return false;
    const emojiRegex =
      /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
    return emojiRegex.test(str);
  };

  /**
   * Generates image URL from env storage API.
   * If URL is relative path, prepend STORAGE_URL.
   * If URL is already full URL, return as is.
   * Returns fallback image if URL is empty or invalid.
   */
  const getProxyUrl = (url) => {
    const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&q=80";
    
    if (!url) return FALLBACK_IMAGE;

    // If it's an emoji, return null to let component handle it
    if (isEmoji(url) && !url.includes("http")) return null;

    // If URL already contains full path (starts with http), return as is
    if (url.startsWith("http")) return url;

    // Otherwise, construct URL from env storage
    // Remove leading slash if present to avoid double slashes
    let cleanPath = url.startsWith("/") ? url.slice(1) : url;

    // Prevent double storage path if backend already includes 'storage/'
    if (cleanPath.startsWith("storage/")) {
      cleanPath = cleanPath.substring(8);
    }

    const fullUrl = `${STORAGE_URL}/${cleanPath}`;
    return fullUrl || FALLBACK_IMAGE;
  };

  /**
   * Handles image load errors - provide fallback instead of hiding.
   */
  const handleImageError = (e) => {
    // Prevent infinite recursion by removing the error listener
    e.target.onerror = null;
    // Set fallback image
    e.target.src =
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80";
    e.target.style.display = "block";
  };

  return {
    getProxyUrl,
    handleImageError,
    isEmoji,
    STORAGE_URL,
  };
};

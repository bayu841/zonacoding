/**
 * Composable for robust image handling including proxy and error fallback.
 */
export const useImage = () => {
  const DEFAULT_PLACEHOLDER = "https://placehold.co/600x400?text=NextSkill";

  /**
   * Checks if a string is a single emoji or contains emojis that shouldn't be proxied.
   */
  const isEmoji = (str) => {
    if (!str) return false;
    const emojiRegex =
      /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
    return emojiRegex.test(str);
  };

  /**
   * Generates a proxy URL to bypass CORP/CORS restrictions.
   */
  const getProxyUrl = (url) => {
    if (!url) return DEFAULT_PLACEHOLDER;
    
    // Handle nested storage URLs (e.g. http://.../storage/https://...)
    if (url.includes('/storage/http')) {
      const nestedUrl = url.split('/storage/')[1];
      if (nestedUrl) return getProxyUrl(nestedUrl);
    }

    // If it's an emoji, return it as is (or return null to let component handle it as text)
    if (isEmoji(url) && !url.includes("http")) return null;

    // If it's a full URL that contains an emoji at the end (malformed backend URL)
    if (isEmoji(url) && url.includes("/storage/")) return null;

    // Remove http:// or https:// for weserv
    const cleanUrl = url.replace(/^https?:\/\//, "");
    return `https://images.weserv.nl/?url=${cleanUrl}&default=${encodeURIComponent(DEFAULT_PLACEHOLDER)}`;
  };

  /**
   * Handles image load errors to prevent infinite loops.
   */
  const handleImageError = (e) => {
    // Prevent infinite recursion by removing the error listener
    e.target.onerror = null;
    e.target.src = DEFAULT_PLACEHOLDER;
  };

  return {
    getProxyUrl,
    handleImageError,
    isEmoji,
    DEFAULT_PLACEHOLDER,
  };
};

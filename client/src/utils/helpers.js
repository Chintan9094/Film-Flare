// Helper function to get full image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return "https://via.placeholder.com/300x450?text=No+Image";
  if (imagePath.startsWith("http")) return imagePath;

  // In production, images are served from the same domain
  // In development, use localhost:5000
  const baseUrl =
    process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

  return `${baseUrl}${imagePath}`;
};

// Extract YouTube video ID from URL
export const getTrailerId = (url) => {
  if (!url) return null;

  // Simplified + ESLint safe version (no unnecessary escape chars)
  const match = url.match(
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\\s]{11})/
  );

  return match ? match[1] : null;
};

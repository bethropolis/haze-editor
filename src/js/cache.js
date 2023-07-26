export const cacheFile = async (fileUrl) => {
    const cacheName = "libs-cache";
    const cache = await caches.open(cacheName);
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    await cache.put(fileUrl, new Response(blob));
    return true;
  };
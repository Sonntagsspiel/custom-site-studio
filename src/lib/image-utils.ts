export const getOptimizedImageUrl = (url: string, width = 1000, quality = 80) => {
  // Für Unsplash-Bilder
  if (url.includes('unsplash.com')) {
    return `${url}?auto=format&q=${quality}&w=${width}`;
  }
  
  // Für eigene Bilder
  if (url.startsWith('/')) {
    return url; // Hier könnten Sie Ihre eigene Bildoptimierung implementieren
  }

  return url;
}; 
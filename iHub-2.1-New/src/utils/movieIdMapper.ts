// Special cases for movies that need manual ID mapping
const movieIdMap: Record<string, string> = {
  'Snatch': 'tt0208092',
  // Add more special cases here as needed
};

export const getCorrectMovieId = (title: string, tmdbId: string): string => {
  // Check if this movie title has a special case ID
  if (movieIdMap[title]) {
    return movieIdMap[title];
  }
  return tmdbId;
};
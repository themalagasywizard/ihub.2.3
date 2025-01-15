const apiKey = '650ff50a48a7379fd245c173ad422ff8';

export const filterCategory = async (categoryId: string, page: number = 1) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${categoryId}&page=${page}`
  );
  const data = await response.json();
  return {
    results: data.results || [],
    total_pages: data.total_pages || 1
  };
};

export const fetchTVSeries = async (page: number = 1) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_null_first_air_dates=false&page=${page}`
  );
  const data = await response.json();
  return {
    results: (data.results || []).filter((item: any) => item.first_air_date),
    total_pages: data.total_pages || 1
  };
};

export const fetchTVSeriesByCategory = async (categoryId: string, page: number = 1) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${categoryId}&language=en-US&sort_by=popularity.desc&include_null_first_air_dates=false&page=${page}`
  );
  const data = await response.json();
  return {
    results: (data.results || []).filter((item: any) => item.first_air_date),
    total_pages: data.total_pages || 1
  };
};

export const handleSearch = async (query: string) => {
  if (!query.trim()) return [];
  
  const response = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data.results || [];
};

export const fetchMovies = async (page: number = 1) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=${page}`
  );
  const data = await response.json();
  return {
    results: (data.results || []).filter((item: any) => item.release_date),
    total_pages: data.total_pages || 1
  };
};
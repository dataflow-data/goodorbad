const API_KEY = "6e6e8a8a42bf682fa91871f6d40a6886";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const PLACEHOLDER_IMAGE = "https://placehold.co/500x750/1a1a1a/404040?text=No+Poster";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export const searchMovies = async (query: string): Promise<Movie[]> => {
  if (!query) return [];
  
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}&language=en-US&page=1`,
      {
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTZlOGE4YTQyYmY2ODJmYTkxODcxZjZkNDBhNjg4NiIsInN1YiI6IjY1N2NkOWRiZWM4YTQzMDExYTNiZmJkMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dNZI1WkeIVJ1Nx2AoCXDWFn-yZnXzBtezh93HJqsz2o`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.status_message || "Failed to fetch movies");
    }
    
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const getImageUrl = (path: string) => {
  if (!path) return PLACEHOLDER_IMAGE;
  return `${IMAGE_BASE_URL}${path}`;
};

export const getMovieRatingCategory = (rating: number) => {
  // Ensure rating is a valid number
  const validRating = typeof rating === 'number' && !isNaN(rating) ? rating : 0;

  if (validRating >= 7.0) {
    return "Worth Watching"; // Movies with rating 7.0 or above
  } else if (validRating >= 4.0) {
    return "Give It a Chance"; // Movies with rating between 4.0 and 6.9
  } else {
    return "Skip It"; // Movies with rating between 1.0 and 3.9
  }
};

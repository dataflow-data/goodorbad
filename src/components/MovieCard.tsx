import { Movie, getImageUrl, getMovieRatingCategory } from "@/lib/tmdb";
import { motion } from "framer-motion";

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  // Handle the release year, fallback to "N/A" if it's not available
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";
  
  // Handle the vote_average, fallback to 0 if it's undefined
  const voteAverage = movie.vote_average ?? 0; // Default to 0 if undefined
  const ratingCategory = getMovieRatingCategory(voteAverage); // Get the rating category
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className="group cursor-pointer relative overflow-hidden rounded-xl bg-secondary/30 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:bg-secondary/40 border border-secondary/20"
    >
      <div className="aspect-[2/3] overflow-hidden rounded-xl">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="absolute top-2 right-2 z-10">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg backdrop-blur-md ${
            ratingCategory === "Worth Watching" 
              ? "bg-emerald-500/40 text-emerald-200 border border-emerald-500/50 shadow-emerald-500/30" 
              : ratingCategory === "Give It a Chance" 
              ? "bg-yellow-500/40 text-yellow-200 border border-yellow-500/50 shadow-yellow-500/30"
              : "bg-red-500/40 text-red-200 border border-red-500/50 shadow-red-500/30"
          }`}
        >
          {ratingCategory === "Worth Watching" 
            ? "Definitely Worth Watching!" 
            : ratingCategory === "Give It a Chance" 
            ? "Give It a Chance" 
            : "Maybe Skip This One"}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-foreground transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 bg-gradient-to-t from-background/95 to-background/0">
        <h3 className="font-semibold text-lg leading-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">{movie.title}</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{year}</p>
          <span className="text-sm font-medium text-primary">
            {voteAverage ? voteAverage.toFixed(1) : "N/A"}/10
          </span>
        </div>
      </div>
    </motion.div>
  );
};

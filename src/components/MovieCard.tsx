import { Movie, getImageUrl, isMovieGood } from "@/lib/tmdb";
import { motion } from "framer-motion";

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";
  const isGood = isMovieGood(movie.vote_average);
  
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
            isGood 
              ? "bg-emerald-500/40 text-emerald-200 border border-emerald-500/50 shadow-emerald-500/30" 
              : "bg-red-500/40 text-red-200 border border-red-500/50 shadow-red-500/30"
          }`}
        >
          {isGood ? "Worth Watching" : "Skip It"}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-foreground transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 bg-gradient-to-t from-background/95 to-background/0">
        <h3 className="font-semibold text-lg leading-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">{movie.title}</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{year}</p>
          <span className="text-sm font-medium text-primary">
            {movie.vote_average.toFixed(1)}/10
          </span>
        </div>
      </div>
    </motion.div>
  );
};
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Movie, getImageUrl, getMovieRatingCategory } from "@/lib/tmdb";
import { motion } from "framer-motion";
import { X, Star } from "lucide-react";

interface MovieDetailsProps {
  movie: Movie;
  isOpen: boolean;
  onClose: () => void;
}

export const MovieDetails = ({ movie, isOpen, onClose }: MovieDetailsProps) => {
  // Ensure vote_average is valid or default to 0
  const voteAverage = movie.vote_average ?? 0;
  const ratingCategory = getMovieRatingCategory(voteAverage); // Get the rating category
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-secondary/50 backdrop-blur-md border-secondary/50 shadow-xl shadow-background/20">
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-background/20 p-2 text-foreground backdrop-blur-sm transition-colors hover:bg-background/40"
          >
            <X className="h-4 w-4" />
          </motion.button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="aspect-[2/3] overflow-hidden"
            >
              <img
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                className="h-full w-full object-cover"
              />
            </motion.div>
            
            <div className="p-6 flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col h-full"
              >
                <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-primary/80">{movie.title}</h2>
                <p className="text-muted-foreground mb-4">{year}</p>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="mb-6"
                >
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${
                    ratingCategory === "Worth Watching"
                      ? "bg-emerald-500/40 text-emerald-200 border border-emerald-500/50 shadow-emerald-500/30" 
                      : ratingCategory === "Give It a Chance"
                      ? "bg-yellow-500/40 text-yellow-200 border border-yellow-500/50 shadow-yellow-500/30"
                      : "bg-red-500/40 text-red-200 border border-red-500/50 shadow-red-500/30"
                  }`}>
                    {ratingCategory}
                  </div>
                </motion.div>
                
                <div className="mb-6 p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-primary/20 hover:border-primary/30 transition-colors duration-300">
                  <div className="text-sm text-muted-foreground mb-2">TMDb Rating</div>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary animate-pulse" />
                    <div className="text-2xl font-bold text-foreground flex items-baseline gap-1">
                      {voteAverage.toFixed(1)}
                      <span className="text-sm text-muted-foreground">/10</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-background/30 backdrop-blur-sm rounded-lg p-4 flex-grow border border-secondary/20">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {movie.overview}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

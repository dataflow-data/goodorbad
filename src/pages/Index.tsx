import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { SearchBar } from "@/components/SearchBar";
import { MovieCard } from "@/components/MovieCard";
import { MovieDetails } from "@/components/MovieDetails";
import { Movie, searchMovies } from "@/lib/tmdb";
import { useDebounce } from "@/hooks/use-debounce";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Loader2, Film, Search, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useHotkeys } from "react-hotkeys-hook";

const Index = () => {
  const [search, setSearch] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const debouncedSearch = useDebounce(search, 300);
  const { toast } = useToast();

  useHotkeys('esc', () => setSelectedMovie(null), []);
  useHotkeys('/', (e) => {
    e.preventDefault();
    const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
    searchInput?.focus();
  });

  const { data: movies, isLoading, error, isFetching } = useQuery({
    queryKey: ["movies", debouncedSearch],
    queryFn: () => searchMovies(debouncedSearch),
    enabled: debouncedSearch.length > 0,
    meta: {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch movies. Please try again later.",
        });
      },
    },
  });

  useEffect(() => {
    toast({
      title: "Welcome! 👋",
      description: (
        <div className="flex items-center gap-2">
          <Film className="h-5 w-5 text-primary animate-pulse" />
          <span>Press '/' to search or 'ESC' to close dialogs</span>
        </div>
      ),
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <div className="container mx-auto px-4 py-12 flex-grow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <Film className="h-12 w-12 text-primary animate-pulse" />
            <h1 className="text-6xl font-bold">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60 drop-shadow-sm [text-shadow:_0_1px_3px_rgb(0_0_0_/_20%)] relative">
                Is It{" "}
                <span className="relative inline-block">
                  Good
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0"></span>
                </span>
                ?
              </span>
            </h1>
          </motion.div>

          <motion.p 
            className="text-muted-foreground text-xl mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Find out if a movie is worth your time. Quick, simple, honest ratings.
          </motion.p>
          <div className="relative max-w-2xl mx-auto">
            <SearchBar
              value={search}
              onChange={setSearch}
              className="max-w-2xl mx-auto"
            />
            {isFetching && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              </div>
            )}
          </div>
          {!debouncedSearch && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-4 hover:text-primary transition-colors"
            >
              <Search className="h-4 w-4" />
              <p>Press '/' to focus search</p>
            </motion.div>
          )}
        </motion.div>

        {isLoading && !isFetching && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center space-x-2"
          >
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="text-muted-foreground">Finding movies...</span>
          </motion.div>
        )}

        {debouncedSearch && movies?.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-md mx-auto"
          >
            <Alert className="bg-secondary/50 backdrop-blur-sm border-secondary">
              <Info className="h-5 w-5 text-muted-foreground" />
              <AlertDescription className="text-center py-4">
                <p className="text-lg font-medium mb-2">No movies found</p>
                <p className="text-muted-foreground">
                  Try adjusting your search or use different keywords
                </p>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {debouncedSearch && movies && movies.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="movie-grid"
            >
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={() => setSelectedMovie(movie)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {!debouncedSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-muted-foreground mt-12"
          >
            <Search className="h-8 w-8 mx-auto mb-4 text-primary/60" />
            Start typing to search for movies
          </motion.div>
        )}

        {selectedMovie && (
          <MovieDetails
            movie={selectedMovie}
            isOpen={!!selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </div>

      <footer className="w-full py-6 px-4 mt-auto bg-secondary/30 backdrop-blur-sm border-t border-secondary">
        <div className="container mx-auto">
          <motion.p 
            className="flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ scale: 1.02 }}
          >
            Built with{" "}
            <Heart className="text-red-500 animate-pulse" size={16} />{" "}
            by{" "}
            <span className="text-primary hover:text-primary/80 transition-colors">
              Dataflow
            </span>
          </motion.p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

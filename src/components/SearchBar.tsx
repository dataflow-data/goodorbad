import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SearchBar = ({ value, onChange, className = "" }: SearchBarProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative ${className}`}
    >
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
      <Input
        type="text"
        placeholder="Search for a movie..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 h-12 text-lg bg-secondary/50 backdrop-blur-sm border-secondary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200 hover:bg-secondary/60 shadow-lg"
      />
    </motion.div>
  );
};
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight } from 'lucide-react';
import { searchUnits, type SearchResult } from '@/utils/search';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (query.trim().length >= 2) {
      const searchResults = searchUnits(query);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);
  
  const handleResultClick = (result: SearchResult) => {
    navigate(`/convert/${result.from}-to-${result.to}`);
    onClose();
    setQuery('');
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Search Units</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Input
            placeholder="Type unit names (e.g., 'kg lb', 'm ft', 'celsius fahrenheit')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="text-lg"
          />
          
          <div className="max-h-96 overflow-y-auto">
            {results.length > 0 ? (
              <div className="space-y-2">
                {results.map((result, idx) => (
                  <button
                    key={`${result.category}-${result.from}-${result.to}-${idx}`}
                    onClick={() => handleResultClick(result)}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors text-left"
                  >
                    <div>
                      <div className="font-medium">
                        {result.fromName} ⇄ {result.toName}
                      </div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {result.category}
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-primary" />
                  </button>
                ))}
              </div>
            ) : query.trim().length >= 2 ? (
              <p className="text-center text-muted-foreground py-8">
                No units found. Try different keywords.
              </p>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Start typing to search units...
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

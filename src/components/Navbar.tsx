import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import logo from '@/assets/logo.png';

interface NavbarProps {
  onSearchFocus?: () => void;
}

export default function Navbar({ onSearchFocus }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src={logo} alt="ConverterX" className="h-8 w-8" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ConverterX
            </span>
          </Link>
          
          <div className="flex-1 max-w-md mx-4">
            <button
              onClick={onSearchFocus}
              className="w-full flex items-center gap-2 px-4 py-2 bg-muted rounded-2xl text-muted-foreground hover:bg-muted/80 transition-colors"
            >
              <Search className="h-4 w-4" />
              <span className="text-sm">Search units...</span>
            </button>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
            <Link to="/privacy" className="text-sm font-medium hover:text-primary transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

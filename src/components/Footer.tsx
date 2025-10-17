import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary text-secondary-foreground mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3">ConverterX</h3>
            <p className="text-sm opacity-90">
              Convert anything. Instantly.
            </p>
            <p className="text-sm opacity-75 mt-2">
              Fast, accurate, and mobile-friendly unit converter.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <a 
              href="mailto:contact.converterx@gmail.com"
              className="text-sm hover:text-primary transition-colors"
            >
              contact.converterx@gmail.com
            </a>
          </div>
        </div>
        
        <div className="border-t border-border/20 mt-8 pt-6 text-center text-sm opacity-75">
          <p>ConverterX © 2025 — Live currency rates powered by exchangerate.host</p>
          <p className="mt-1">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

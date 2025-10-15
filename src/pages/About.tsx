import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';

export default function About() {
  const [searchOpen, setSearchOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>About ConverterX - Fast & Accurate Unit Converter</title>
        <meta name="description" content="Learn about ConverterX, the fastest and most accurate unit converter for all your conversion needs." />
      </Helmet>
      
      <Navbar onSearchFocus={() => setSearchOpen(true)} />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold mb-6">About ConverterX</h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-foreground">
            <p>
              <strong>ConverterX</strong> is a fast, accurate, and mobile-friendly unit converter 
              designed to make conversions instant and effortless. Whether you're converting 
              length, weight, temperature, or any other unit type, ConverterX provides reliable 
              results in milliseconds.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
            <p>
              We believe unit conversion should be simple, fast, and accessible to everyone. 
              That's why we built ConverterX with a focus on speed, accuracy, and user experience.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Features</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>11 conversion categories covering common needs</li>
              <li>Mobile-optimized with numeric keyboard support</li>
              <li>Instant conversions as you type</li>
              <li>Recent conversions and favorites</li>
              <li>Works offline as a Progressive Web App</li>
              <li>Clean, modern interface</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">Accuracy Guarantee</h2>
            <p>
              All conversion formulas are scientifically accurate and regularly verified. 
              We use industry-standard conversion factors to ensure precision in every calculation.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

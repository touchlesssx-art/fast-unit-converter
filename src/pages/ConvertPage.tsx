import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import UnitConverter from '@/components/UnitConverter';
import { categories } from '@/converters/conversionFactors';
import AdBanner from '@/components/AdBanner';

export default function ConvertPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchOpen, setSearchOpen] = useState(false);

  // Parse slug to get category, from and to units
  // Expected format: "categoryId-fromUnit-to-toUnit" or just "categoryId"
  const parts = slug?.split('-') || [];
  const categoryId = parts[0];
  const fromUnit = parts.length >= 3 && parts[1] !== 'to' ? parts[1] : undefined;
  const toUnit = parts.length >= 3 ? parts[parts.length - 1] : undefined;

  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <title>Converter Not Found - ConverterX</title>
        </Helmet>
        <Navbar onSearchFocus={() => setSearchOpen(true)} />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Converter Not Found</h1>
            <p className="text-muted-foreground">
              The converter you're looking for doesn't exist.
            </p>
          </div>
        </main>

        <Footer />
        <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{category.name} Converter - ConverterX</title>
        <meta
          name="description"
          content={`Convert ${category.name.toLowerCase()} units instantly. Fast, accurate, and free ${category.name.toLowerCase()} conversion tool.`}
        />
      </Helmet>
      
      <Navbar onSearchFocus={() => setSearchOpen(true)} />
      
      <AdBanner />

      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{category.name} Converter</h1>
            <p className="text-sm text-muted-foreground">
              Convert {category.name.toLowerCase()} units instantly
            </p>
          </div>
          
          <UnitConverter 
            categoryId={categoryId} 
            defaultFrom={fromUnit} 
            defaultTo={toUnit} 
          />
        </div>
      </main>

      <Footer />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

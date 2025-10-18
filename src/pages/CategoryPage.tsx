import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { categories } from '@/converters/conversionFactors';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import UnitConverter from '@/components/UnitConverter';
import CurrencyConverter from '@/components/CurrencyConverter';

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchOpen, setSearchOpen] = useState(false);
  
  const category = categories.find(c => c.id === categoryId);
  
  if (!category) {
    return <div>Category not found</div>;
  }
  
  const isCurrency = categoryId === 'currency';
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearchFocus={() => setSearchOpen(true)} />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              {isCurrency ? '💸 ' : ''}{category.name} Converter
            </h1>
            <p className="text-muted-foreground">
              {isCurrency 
                ? 'Real-time exchange rates for all major currencies'
                : `Convert ${category.name.toLowerCase()} units instantly`
              }
            </p>
          </div>
          
          {isCurrency ? (
            <CurrencyConverter />
          ) : (
            <UnitConverter categoryId={categoryId!} />
          )}
        </div>
      </main>
      
      <Footer />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

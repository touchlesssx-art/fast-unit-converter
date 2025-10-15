import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { categories } from '@/converters/conversionFactors';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import UnitConverter from '@/components/UnitConverter';

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [searchOpen, setSearchOpen] = useState(false);
  
  const category = categories.find(c => c.id === categoryId);
  
  if (!category) {
    return <div>Category not found</div>;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearchFocus={() => setSearchOpen(true)} />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">{category.name} Converter</h1>
            <p className="text-muted-foreground">
              Convert {category.name.toLowerCase()} units instantly
            </p>
          </div>
          
          <UnitConverter categoryId={categoryId!} />
        </div>
      </main>
      
      <Footer />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

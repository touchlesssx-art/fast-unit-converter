import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { categories } from '@/converters/conversionFactors';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import UnitConverter from '@/components/UnitConverter';
import CurrencyConverter from '@/components/CurrencyConverter';
import AdBanner from '@/components/AdBanner'; // ✅ Added import

export default function CategoryPage() {
  const {
    categoryId
  } = useParams<{
    categoryId: string;
  }>();
  const [searchOpen, setSearchOpen] = useState(false);
  const category = categories.find(c => c.id === categoryId);
  if (!category) {
    return <div>Category not found</div>;
  }
  const isCurrency = categoryId === 'currency';
  return <div className="min-h-screen flex flex-col">
      <Navbar onSearchFocus={() => setSearchOpen(true)} />

      {/* ✅ Google AdSense Banner just below Navbar */}
      <AdBanner />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              {isCurrency ? '💸 ' : ''}
              {category.name} Converter
            </h1>
            {!isCurrency && <p className="text-muted-foreground">
                Convert {category.name.toLowerCase()} units instantly
              </p>}
          </div>

          {isCurrency ? <>
              <CurrencyConverter />
              
              {/* Currency Directory Description */}
              <div className="mt-8 p-6 md:p-8 rounded-xl bg-muted/30 border border-border/50">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  ⭐ Currency Converter Directory
                  <span className="text-sm font-semibold px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                    Status: under development
                  </span>
                </h2>
                
                <div className="space-y-4 text-sm md:text-base text-foreground/90 leading-relaxed">
                  <p>
                    ConverterX offers an organized directory of more than 160+ international currencies, giving users a clear and simple way to access the converter they need. Each currency in this list opens a dedicated page where users can enter an amount and instantly view the converted value. This section is designed to help travelers, students, businesses and everyday users quickly navigate between different currencies without confusion.
                  </p>
                  
                  <p>
                    Please note that currency conversions on ConverterX are still under development, and some features may be limited or in beta form. We are actively improving accuracy, design and usability as the platform grows. The goal of this directory is to create a reliable starting point for all currency-related tools on ConverterX, and future updates will expand support, add more details and provide an even smoother experience for everyone.
                  </p>
                </div>
              </div>
            </> : <UnitConverter categoryId={categoryId!} />}
        </div>
      </main>

      <Footer />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>;
}
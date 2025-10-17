import { useState } from 'react';
import { categories } from '@/converters/conversionFactors';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import CategoryCard from '@/components/CategoryCard';
import RecentConversions from '@/components/RecentConversions';
import CurrencyConverter from '@/components/CurrencyConverter';
import heroImage from '@/assets/hero-bg.jpg';

export default function Index() {
  const [searchOpen, setSearchOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearchFocus={() => setSearchOpen(true)} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="relative py-12 px-4 overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(180deg, #f8faff 0%, #e9edff 100%)`,
          }}
        >
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">
                ConverterX
              </h1>
              <p className="text-xl md:text-2xl text-foreground mb-2 font-semibold">
                Convert anything. Instantly.
              </p>
              <p className="text-base text-muted-foreground mb-6">
                Fast, accurate, mobile-friendly converter for all your needs.
              </p>
            </div>
          </div>
        </section>
        
        {/* Currency Converter Section - Default Visible */}
        <section className="py-12 px-4" style={{ background: 'linear-gradient(180deg, #f8faff 0%, #e9edff 100%)' }}>
          <div className="container mx-auto">
            <CurrencyConverter />
          </div>
        </section>
        
        {/* Categories Grid */}
        <section className="py-12 px-4 bg-background">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Choose a Category
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map(category => (
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  icon={category.icon}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why ConverterX?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Instant conversions as you type. No waiting, no loading.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-semibold mb-2">Mobile Friendly</h3>
                <p className="text-muted-foreground">
                  Optimized for mobile with numeric keyboard support.
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-2">Accurate & Reliable</h3>
                <p className="text-muted-foreground">
                  Precise conversion formulas for all unit types.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

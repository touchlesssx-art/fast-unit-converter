import { useState } from 'react';
import { categories } from '@/converters/conversionFactors';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import CategoryCard from '@/components/CategoryCard';
import RecentConversions from '@/components/RecentConversions';
import heroImage from '@/assets/hero-bg.jpg';

export default function Index() {
  const [searchOpen, setSearchOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearchFocus={() => setSearchOpen(true)} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="relative py-20 px-4 overflow-hidden"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
          
          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
                ConverterX
              </h1>
              <p className="text-2xl md:text-3xl text-foreground mb-4 font-semibold">
                Convert anything. Instantly.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Fast, accurate, mobile-friendly unit converter for all your conversion needs.
              </p>
              
              <button
                onClick={() => setSearchOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Start Converting →
              </button>
            </div>
          </div>
        </section>
        
        {/* Categories Grid */}
        <section className="py-16 px-4 bg-background">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Choose a Category
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {categories.map(category => (
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  icon={category.icon}
                />
              ))}
            </div>
            
            {/* Recent Conversions */}
            <div className="max-w-2xl mx-auto">
              <RecentConversions />
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

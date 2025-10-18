import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { DollarSign, Ruler } from 'lucide-react';

export default function Index() {
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearchFocus={() => setSearchOpen(true)} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="relative py-16 px-4 overflow-hidden min-h-[60vh] flex items-center"
          style={{
            background: 'linear-gradient(180deg, #f8faff 0%, #e9edff 100%)',
          }}
        >
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent animate-fade-in">
                ConverterX
              </h1>
              <p className="text-xl md:text-2xl text-foreground mb-2 font-semibold animate-fade-in" style={{ animationDelay: '0.1s' }}>
                Convert anything. Instantly.
              </p>
              <p className="text-base text-muted-foreground mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Fast, accurate, mobile-friendly converter for all your needs.
              </p>
              
              {/* Category Cards */}
              <div className="mt-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-foreground animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  Choose a Category
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {/* Currency Card */}
                  <button
                    onClick={() => navigate('/category/currency')}
                    className="group relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/20 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in border border-primary/20 hover:border-primary/40"
                    style={{ animationDelay: '0.4s' }}
                  >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/20 via-transparent to-transparent blur-xl" />
                    
                    <div className="relative z-10 flex flex-col items-center gap-4">
                      <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                        <DollarSign className="h-12 w-12 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                          💵 Currency
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          Real-time exchange rates
                        </p>
                      </div>
                    </div>
                  </button>
                  
                  {/* Unit Card */}
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="group relative overflow-hidden bg-gradient-to-br from-secondary/5 to-secondary/10 hover:from-secondary/10 hover:to-secondary/20 rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in border border-secondary/20 hover:border-secondary/40"
                    style={{ animationDelay: '0.5s' }}
                  >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-secondary/20 via-transparent to-transparent blur-xl" />
                    
                    <div className="relative z-10 flex flex-col items-center gap-4">
                      <div className="p-4 bg-secondary/10 rounded-2xl group-hover:bg-secondary/20 transition-all duration-300 group-hover:scale-110">
                        <Ruler className="h-12 w-12 text-secondary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-secondary-foreground transition-colors">
                          📏 Unit
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          Length, weight, volume & more
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
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

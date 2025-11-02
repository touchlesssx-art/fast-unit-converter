import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import { DollarSign, Ruler } from 'lucide-react';

export default function Index() {
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ Google AdSense Script Loader
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src =
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1578209603604474'; // 🔹 Replace with your AdSense client ID
    script.crossOrigin = 'anonymous';
    document.body.appendChild(script);

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearchFocus={() => setSearchOpen(true)} />

      {/* --- Google AdSense Banner --- */}
      <div className="w-full flex justify-center items-center py-3 bg-transparent">
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            textAlign: 'center',
            minHeight: '60px',
            width: '100%',
            maxWidth: '970px',
          }}
          data-ad-client="ca-pub1578209603604474" // 🔹 Replace with your AdSense client ID
          data-ad-slot="4995210375" // 🔹 Replace with your Ad Slot ID
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
      {/* --- End of Ad Section --- */}

      <main className="flex-1">
        {/* Hero Section */}
        <section
          className="relative py-8 md:py-12 px-4 overflow-hidden min-h-[60vh] flex items-center"
          style={{
            background: 'linear-gradient(180deg, #f8faff 0%, #e9edff 100%)',
          }}
        >
          <div className="container mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-primary bg-clip-text text-transparent animate-fade-in">
                ConverterX
              </h1>
              <p
                className="text-lg md:text-xl text-foreground mb-1 font-semibold animate-fade-in"
                style={{ animationDelay: '0.1s' }}
              >
                Convert anything. Instantly.
              </p>
              <p
                className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 animate-fade-in"
                style={{ animationDelay: '0.2s' }}
              >
                Fast, accurate, mobile-friendly converter for all your needs.
              </p>

              {/* Category Cards */}
              <div className="mt-6 md:mt-8">
                <h2
                  className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-foreground animate-fade-in"
                  style={{ animationDelay: '0.3s' }}
                >
                  Choose a Category
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
                  {/* Currency Card */}
                  <button
                    onClick={() => navigate('/category/currency')}
                    className="group relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/20 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in border border-primary/20 hover:border-primary/40"
                    style={{ animationDelay: '0.4s' }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/20 via-transparent to-transparent blur-xl" />
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                        <DollarSign className="h-10 w-10 md:h-12 md:w-12 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                          💵 Currency
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground mt-1">⏳ BETA</p>
                      </div>
                    </div>
                  </button>

                  {/* Unit Card */}
                  <button
                    onClick={() => navigate('/units')}
                    className="group relative overflow-hidden bg-gradient-to-br from-secondary/5 to-secondary/10 hover:from-secondary/10 hover:to-secondary/20 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in border border-secondary/20 hover:border-secondary/40"
                    style={{ animationDelay: '0.5s' }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-secondary/20 via-transparent to-transparent blur-xl" />
                    <div className="relative z-10 flex flex-col items-center gap-3">
                      <div className="p-3 bg-secondary/10 rounded-2xl group-hover:bg-secondary/20 transition-all duration-300 group-hover:scale-110">
                        <Ruler className="h-10 w-10 md:h-12 md:w-12 text-secondary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-secondary-foreground transition-colors">
                          📏 Unit
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground mt-1">
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

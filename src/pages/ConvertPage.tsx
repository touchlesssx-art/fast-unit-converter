import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { categories } from '@/converters/conversionFactors';
import { popularPairs } from '@/converters/popularPairs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';
import UnitConverter from '@/components/UnitConverter';

export default function ConvertPage() {
  const { slug } = useParams<{ slug: string }>();
  const [searchOpen, setSearchOpen] = useState(false);
  
  // Parse slug (e.g., "kg-to-lb" -> from: "kg", to: "lb")
  const parts = slug?.split('-to-');
  const fromUnit = parts?.[0];
  const toUnit = parts?.[1];
  
  // Find the category for these units
  let category = null;
  let foundFrom = false;
  let foundTo = false;
  
  for (const cat of categories) {
    if (cat.units[fromUnit!] && cat.units[toUnit!]) {
      category = cat;
      foundFrom = true;
      foundTo = true;
      break;
    }
  }
  
  // Get SEO data from popular pairs if available
  const pairData = popularPairs.find(p => p.slug === slug);
  const title = pairData?.title || `${fromUnit} to ${toUnit} Converter | ConverterX`;
  const description = pairData?.description || `Convert ${fromUnit} to ${toUnit} instantly with ConverterX.`;
  
  if (!category || !foundFrom || !foundTo) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar onSearchFocus={() => setSearchOpen(true)} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Conversion not found</h1>
            <p className="text-muted-foreground">
              We couldn't find a conversion for {slug}
            </p>
          </div>
        </main>
        <Footer />
        <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>
    );
  }
  
  // Generate JSON-LD for FAQ if available
  const jsonLd = pairData?.faq ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pairData.faq.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {jsonLd && (
          <script type="application/ld+json">
            {JSON.stringify(jsonLd)}
          </script>
        )}
      </Helmet>
      
      <Navbar onSearchFocus={() => setSearchOpen(true)} />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">
              {category.units[fromUnit!].name} to {category.units[toUnit!].name}
            </h1>
            <p className="text-muted-foreground">
              Convert {category.name.toLowerCase()} instantly
            </p>
          </div>
          
          <UnitConverter 
            categoryId={category.id} 
            defaultFrom={fromUnit}
            defaultTo={toUnit}
          />
          
          {/* FAQ Section if available */}
          {pairData?.faq && (
            <div className="max-w-2xl mx-auto mt-12">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {pairData.faq.map((faq, idx) => (
                  <div key={idx} className="bg-card rounded-xl p-6 shadow-sm">
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

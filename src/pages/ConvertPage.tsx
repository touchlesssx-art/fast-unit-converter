import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { categories } from '@/converters/conversionFactors';
import { popularPairs } from '@/converters/popularPairs';
import ConverterLayout from '@/components/ConverterLayout';
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
      <>
        <ConverterLayout title="Conversion not found" subtitle={`We couldn't find a conversion for ${slug}`}>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Please try searching for a different conversion.</p>
          </div>
        </ConverterLayout>
        <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      </>
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
    <>
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
      
      <ConverterLayout 
        title={`${category.units[fromUnit!].name} to ${category.units[toUnit!].name}`}
        subtitle={`Convert ${category.name.toLowerCase()} instantly`}
      >
        <UnitConverter 
          categoryId={category.id} 
          defaultFrom={fromUnit}
          defaultTo={toUnit}
        />
        
        {/* FAQ Section if available */}
        {pairData?.faq && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {pairData.faq.map((faq, idx) => (
                <div key={idx} className="bg-card/50 backdrop-blur-sm border-2 rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </ConverterLayout>
      
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

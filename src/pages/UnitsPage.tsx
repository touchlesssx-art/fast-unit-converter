import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';
import { categories } from '@/converters/conversionFactors';
import { Helmet } from 'react-helmet-async';

export default function UnitsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Unit Converter - ConverterX</title>
        <meta name="description" content="Convert between different units - length, area, volume, weight, temperature, speed, time, power, energy, pressure, and data." />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-1">
        <section 
          className="py-12 px-4"
          style={{
            background: 'linear-gradient(180deg, #f8faff 0%, #e9edff 100%)',
          }}
        >
          <div className="container mx-auto">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">
                Choose a Unit Category
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories
                  .filter(category => category.id !== 'currency')
                  .map(category => (
                    <CategoryCard
                      key={category.id}
                      id={category.id}
                      name={category.name}
                      icon={category.icon}
                    />
                  ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

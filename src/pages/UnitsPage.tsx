import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';
import { categories } from '@/converters/conversionFactors';
import { Helmet } from 'react-helmet-async';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function UnitsPage() {
  const [amount, setAmount] = useState('0');

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Unit Converter - ConverterX</title>
        <meta
          name="description"
          content="Convert between different units - length, area, volume, weight, temperature, speed, time, power, energy, pressure, and data."
        />
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

              {/* Amount Input Section */}
              <div className="max-w-sm mx-auto mb-8 text-center space-y-2">
                <label className="text-sm font-medium text-muted-foreground block">
                  Amount
                </label>
                <Input
                  type="number"
                  inputMode="decimal"
                  value={amount === '0' ? '' : amount}
                  onFocus={() => amount === '0' && setAmount('')}
                  onBlur={() => amount === '' && setAmount('0')}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="h-10 md:h-11 text-base md:text-lg font-semibold rounded-xl text-center"
                />
                <Button
                  variant="outline"
                  className="mt-2 text-xs font-semibold"
                  disabled
                >
                  {amount === '0' ? 'Enter a value to convert' : `Value: ${amount}`}
                </Button>
              </div>

              {/* Unit Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories
                  .filter((category) => category.id !== 'currency')
                  .map((category) => (
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

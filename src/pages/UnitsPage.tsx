import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';
import { categories } from '@/converters/conversionFactors';
import { Helmet } from 'react-helmet-async';
import AdBanner from '@/components/AdBanner'; // ✅ Add this import

export default function UnitsPage() {
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

      {/* ✅ Google AdSense Banner just below Navbar */}
      <AdBanner />

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

              {/* Description Section */}
              <div className="mt-12 max-w-4xl mx-auto">
                <div className="p-6 md:p-8 rounded-2xl bg-gradient-card border border-border/50 shadow-sm">
                  <h2 className="text-2xl font-bold mb-4 text-foreground">
                    ⚙️ Unit Converter Directory
                  </h2>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      ConverterX provides a comprehensive directory of unit converters covering more than 10 essential categories, including Length, Area, Volume, Weight, Temperature, Speed, Time, Power, Energy, Pressure, and Data. Each category offers multiple unit options, making it easy to convert between different measurement systems used around the world.
                    </p>
                    <p>
                      Whether you're a student working on science homework, an engineer calculating specifications, a traveler adjusting to new measurement standards, or simply someone needing quick conversions in daily life, ConverterX gives you instant and accurate results. Our tool supports conversions between metric, imperial, and other international measurement systems, ensuring you can work seamlessly across different contexts and regions.
                    </p>
                    <p>
                      The unit converter directory is designed with simplicity and speed in mind. Select your category, choose your units, enter your value, and receive immediate results. No complex calculations, no confusion—just straightforward conversions that work. As ConverterX continues to grow, we're committed to expanding our converter library, improving accuracy, and enhancing the user experience to serve everyone's conversion needs better.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

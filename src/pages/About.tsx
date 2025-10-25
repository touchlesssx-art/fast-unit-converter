import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';

export default function About() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>About ConverterX - Smart Unit Conversion</title>
        <meta
          name="description"
          content="Learn more about ConverterX — the next-generation unit converter designed for speed, accuracy, and simplicity. Discover our mission, features, and vision for effortless conversions."
        />
      </Helmet>

      <Navbar onSearchFocus={() => setSearchOpen(true)} />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold mb-6">About ConverterX</h1>
          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-lg max-w-none space-y-6 text-foreground">

            <section>
              <p>
                <strong>ConverterX</strong> is a fast, accurate, and mobile-friendly
                unit converter built for modern users. Whether you’re a student,
                engineer, traveler, or entrepreneur, ConverterX delivers
                instant and reliable conversions across multiple categories —
                all within milliseconds.
              </p>
              <p>
                Our platform eliminates the need for complex apps or ads-heavy
                tools — providing a clean, efficient, and distraction-free
                experience on any device.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p>
                We believe unit conversion should be simple, fast, and
                accessible to everyone — no pop-ups, no clutter, just pure
                precision. ConverterX was built with one goal: to make everyday
                conversions effortless, reliable, and universally accessible.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Core Features</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>11 conversion categories covering daily and scientific needs</li>
                <li>Instant results as you type — zero delay</li>
                <li>Fully optimized for mobile and tablet users</li>
                <li>Offline functionality through PWA (Progressive Web App)</li>
                <li>Favorites and recent conversions saved locally</li>
                <li>Modern, minimalistic interface inspired by user-first design</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Accuracy Guarantee</h2>
              <p>
                ConverterX uses industry-standard conversion formulas verified
                by reliable scientific sources. Every calculation is checked
                for precision and consistency to ensure your results are always
                correct — whether converting meters to feet or Celsius to
                Fahrenheit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p>
                ConverterX aims to become the world’s most trusted conversion
                platform — merging intelligent technology, user privacy, and
                elegant design. Our future updates will introduce AI-powered
                conversion assistants, multilingual interfaces, and real-time
                contextual tools that make information more human and
                accessible.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p>
                We welcome feedback and ideas. If you’d like to collaborate,
                suggest improvements, or report issues, please contact us at:{' '}
                <a
                  href="mailto:contact.converterx@gmail.com"
                  className="text-primary hover:underline"
                >
                  contact.converterx@gmail.com
                </a>
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}


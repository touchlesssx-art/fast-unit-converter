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
          content="ConverterX is a next-generation converter designed for speed, simplicity, and precision. Learn about our story, mission, and vision for effortless global conversions."
        />
      </Helmet>

      <Navbar onSearchFocus={() => setSearchOpen(true)} />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold mb-6 text-center">About ConverterX</h1>
          <p className="text-muted-foreground mb-8 text-center">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-lg max-w-none space-y-6 text-foreground">

            <section>
              <p>
                <strong>ConverterX</strong> is more than just a converter — it’s the beginning of a journey. 
                Created in 2025 by a young developer passionate about technology and design, ConverterX was 
                built with one mission: to make online conversions faster, simpler, and universally accessible.
              </p>

              <p>
                In a world full of cluttered and ad-heavy websites, ConverterX offers a refreshing experience. 
                It allows users to convert currencies, measurements, and other units instantly — with no distractions, 
                no unnecessary clicks, and no confusing menus. Every result is accurate, every detail optimized 
                for clarity and speed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <p>
                ConverterX began as a small idea — to build something useful, functional, and beautiful. 
                What started as a student’s side project quickly became a platform visited by users across 
                different countries. It symbolizes the creator’s first real step into the world of business 
                and technology, representing both courage and creativity.
              </p>
              <p>
                Every pixel and every line of code was written with care. The purpose was not only to 
                build a tool, but to create something that reflects innovation, simplicity, and ambition. 
                ConverterX stands as proof that great ideas can grow from passion and persistence.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p>
                Our mission is to make everyday conversions effortless and accessible to everyone — 
                from students and professionals to travelers and engineers. 
                We focus on three key principles: <strong>speed</strong>, <strong>accuracy</strong>, 
                and <strong>user experience</strong>. 
                ConverterX eliminates clutter, distractions, and slow interfaces, bringing clarity 
                to something people use every day.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p>
                The vision of ConverterX is to become one of the world’s most trusted conversion platforms. 
                In the future, ConverterX will evolve with AI-powered tools, multilingual support, 
                offline features, and smart contextual suggestions — helping users not only convert, 
                but understand and interact with data more intelligently.
              </p>
              <p>
                The project also serves as the foundation for a broader technological ecosystem called 
                <strong> TouchlessX</strong> — a futuristic initiative focused on automation, innovation, 
                and user-centered design. ConverterX is the first step toward that vision, marking the 
                start of a digital journey that connects practicality with creativity.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Accuracy and Quality</h2>
              <p>
                ConverterX uses verified mathematical formulas and trusted exchange rate APIs to ensure 
                that every result is correct, consistent, and up-to-date. Our systems are optimized for 
                both desktop and mobile, and we are committed to maintaining transparency and reliability 
                in every update.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">A Personal Note</h2>
              <p>
                ConverterX is more than a website — it’s a story of ambition, curiosity, and the desire 
                to create something meaningful. This is the creator’s first income-generating project, 
                powered by hard work and dedication. Every visitor, every click, and every kind word 
                of feedback helps this dream grow stronger.
              </p>
              <p>
                Thank you for visiting ConverterX and being part of the journey. 
                Your support means the world — and this is only the beginning. 💙
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Contact</h2>
              <p>
                Have questions, feedback, or ideas? Feel free to reach out:{" "}
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

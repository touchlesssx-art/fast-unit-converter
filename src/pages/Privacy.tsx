import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';

export default function Privacy() {
  const [searchOpen, setSearchOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Privacy Policy - ConverterX</title>
        <meta
          name="description"
          content="Read ConverterX's privacy policy and learn how we protect your information, respect your privacy, and comply with global data protection standards."
        />
      </Helmet>
      
      <Navbar onSearchFocus={() => setSearchOpen(true)} />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-lg max-w-none space-y-6 text-foreground">

            <section>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p>
                ConverterX (“we”, “our”, or “us”) is committed to safeguarding your privacy.
                This Privacy Policy explains what information we collect, how we use it,
                and how we keep it safe when you access or use our unit converter web application.
              </p>
              <p>
                ConverterX is a free, browser-based tool built with user privacy and transparency in mind.
                We do not ask for sign-ups, logins, or any personally identifiable information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <p>ConverterX is designed to minimize data collection:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Local Storage:</strong> Conversion history and favorites are stored
                  only on your device. This information never leaves your browser and is fully under your control.
                </li>
                <li>
                  <strong>Analytics (Google Analytics 4):</strong> We use GA4 to analyze anonymous usage trends
                  — such as page visits and time spent — to improve performance. GA4 does not collect
                  names, emails, or any personal identifiers.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. How We Use This Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To improve website speed, reliability, and user experience.</li>
                <li>To understand general usage patterns and feature popularity.</li>
                <li>To detect and fix technical issues or bugs.</li>
              </ul>
              <p>
                We do <strong>not</strong> sell, rent, or share your data with any third parties for marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Data Sharing and Third Parties</h2>
              <p>
                Analytics data is processed by Google in accordance with their own Privacy Policy.
                ConverterX does not share or transmit user data to any other external service.
                No personal or sensitive data is ever collected or stored by ConverterX servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Cookies and Tracking</h2>
              <p>
                ConverterX uses minimal cookies exclusively for analytics and consent preferences.
                You may disable cookies anytime in your browser settings without affecting site functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access or delete your local data by clearing browser storage.</li>
                <li>Opt-out of analytics by using ad blockers or privacy extensions.</li>
                <li>Request clarification by contacting us at the email below.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Children’s Privacy</h2>
              <p>
                ConverterX does not knowingly collect or process data from children under 13.
                The platform is designed for general audiences and contains no inappropriate content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Data Security</h2>
              <p>
                ConverterX runs over secure HTTPS protocols and does not maintain any personal databases.
                All computations occur locally on the user’s browser or securely through verified APIs.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Updates to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically to reflect improvements in data protection practices.
                Updates will be posted on this page, and the “Last updated” date will be revised accordingly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
              <p>
                For privacy inquiries, data requests, or clarifications, please contact us at:{' '}
                <a href="mailto:contact.converterx@gmail.com" className="text-primary hover:underline">
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

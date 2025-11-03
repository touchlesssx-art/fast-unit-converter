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
          content="Read ConverterX's Privacy Policy and learn how we protect your data, use analytics, and comply with global advertising and privacy standards."
        />
      </Helmet>

      <Navbar onSearchFocus={() => setSearchOpen(true)} />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8 text-center">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <div className="prose prose-lg max-w-none space-y-6 text-foreground">
            
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p>
                Welcome to <strong>ConverterX</strong>. We value your privacy and are committed to 
                protecting your personal information. This Privacy Policy explains how ConverterX 
                collects, uses, and safeguards data when you access our website 
                (<a href="https://converterx.net" className="text-primary hover:underline">https://converterx.net</a>).
              </p>
              <p>
                ConverterX is a free online conversion platform that operates without requiring 
                user registration. We collect only minimal data necessary to improve performance, 
                analytics, and ad functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Anonymous Analytics Data:</strong> We use Google Analytics 4 (GA4) 
                  to understand visitor behavior — such as device type, country, time on site, 
                  and popular pages. This data is aggregated and never identifies individuals.
                </li>
                <li>
                  <strong>Cookies:</strong> ConverterX uses cookies for essential functions, 
                  analytics, and Google AdSense advertisements. You can disable cookies 
                  in your browser settings anytime.
                </li>
                <li>
                  <strong>Local Storage:</strong> Conversion history and favorites are stored 
                  locally in your browser. This data never leaves your device.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Google AdSense and Advertising</h2>
              <p>
                ConverterX displays ads using <strong>Google AdSense</strong>. 
                Third-party vendors, including Google, use cookies to serve ads based on prior visits 
                to this or other websites.
              </p>
              <p>
                Google’s use of the DoubleClick cookie enables it and its partners to serve ads 
                to users based on their visit to ConverterX and other sites. You may opt out of 
                personalized advertising by visiting the 
                <a href="https://adssettings.google.com/" className="text-primary hover:underline">
                  {" "}Google Ads Settings
                </a>.
              </p>
              <p>
                ConverterX complies fully with the 
                <a href="https://policies.google.com/technologies/ads" className="text-primary hover:underline">
                  {" "}Google AdSense Program Policies
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Use of Google Analytics</h2>
              <p>
                We use <strong>Google Analytics 4 (GA4)</strong> to analyze website traffic and 
                user interaction. This helps us understand performance, visitor trends, and 
                technical issues. All information collected is anonymized and aggregated.
              </p>
              <p>
                To opt out of Google Analytics tracking, install the official 
                <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline">
                  {" "}Google Analytics Opt-out Browser Add-on
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Data Usage</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To improve site performance and usability.</li>
                <li>To monitor traffic patterns and detect technical errors.</li>
                <li>To serve relevant, non-intrusive advertisements.</li>
              </ul>
              <p>
                We do <strong>not</strong> sell, trade, or transfer any collected data to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Data Protection</h2>
              <p>
                ConverterX uses HTTPS encryption and industry-standard security practices 
                to protect your browsing data. We do not host user accounts or store 
                personally identifiable information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party sites. 
                We are not responsible for the content or privacy practices of these external websites. 
                We recommend reviewing their privacy policies before providing any information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Children’s Privacy</h2>
              <p>
                ConverterX is intended for general audiences and does not knowingly collect data 
                from children under 13 years of age. If you believe that a child has provided 
                personal information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Policy Updates</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes 
                in our practices or legal requirements. Updates will be posted on this page 
                with a new “Last Updated” date. We encourage you to check this page periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:{' '}
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

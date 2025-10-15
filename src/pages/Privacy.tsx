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
        <meta name="description" content="Read ConverterX's privacy policy to learn how we handle your data." />
      </Helmet>
      
      <Navbar onSearchFocus={() => setSearchOpen(true)} />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>
          
          <div className="prose prose-lg max-w-none space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p>
                ConverterX ("we", "our", or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, and safeguard your information 
                when you use our unit converter web application.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <p>
                ConverterX is designed with privacy in mind. We collect minimal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Local Storage:</strong> Your recent conversions and favorites are stored 
                  locally in your browser. This data never leaves your device.
                </li>
                <li>
                  <strong>Analytics (GA4):</strong> We use Google Analytics 4 to understand how 
                  users interact with our app. This includes page views, conversion actions, and 
                  general usage patterns. No personally identifiable information is collected.
                </li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <p>
                The information we collect is used solely to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Improve the functionality and user experience of ConverterX</li>
                <li>Understand which features are most useful to users</li>
                <li>Identify and fix technical issues</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Data Sharing</h2>
              <p>
                We do not sell, trade, or rent your information to third parties. Analytics data 
                is processed by Google Analytics in accordance with their privacy policy.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Cookies and Tracking</h2>
              <p>
                We use cookies for:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Google Analytics 4 tracking (can be disabled in your browser)</li>
                <li>Storing your consent preferences</li>
              </ul>
              <p>
                You can disable cookies in your browser settings at any time.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <p>
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your locally stored data (recent conversions and favorites)</li>
                <li>Delete your locally stored data by clearing browser storage</li>
                <li>Opt out of analytics by using browser privacy features or ad blockers</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
              <p>
                ConverterX does not knowingly collect information from children under 13. 
                Our service is intended for general audiences.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted 
                on this page with an updated revision date.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at:{' '}
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

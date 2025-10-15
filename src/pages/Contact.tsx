import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchModal from '@/components/SearchModal';

export default function Contact() {
  const [searchOpen, setSearchOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Contact ConverterX - Get in Touch</title>
        <meta name="description" content="Contact ConverterX for questions, feedback, or support." />
      </Helmet>
      
      <Navbar onSearchFocus={() => setSearchOpen(true)} />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
          
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground">
              Have questions, feedback, or suggestions? We'd love to hear from you!
            </p>
            
            <div className="bg-card rounded-2xl p-8 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Email Us</h2>
                  <p className="text-muted-foreground mb-4">
                    Send us an email and we'll get back to you as soon as possible.
                  </p>
                  <a 
                    href="mailto:contact.converterx@gmail.com"
                    className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
                  >
                    contact.converterx@gmail.com
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-2xl p-6">
              <h3 className="font-semibold mb-2">What can we help with?</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Bug reports or technical issues</li>
                <li>• Feature requests or suggestions</li>
                <li>• Questions about conversions</li>
                <li>• Partnership inquiries</li>
                <li>• General feedback</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

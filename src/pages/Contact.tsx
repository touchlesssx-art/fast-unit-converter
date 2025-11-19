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
          
          <div className="space-y-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed">
                At ConverterX, we believe in building tools that serve real people with real needs. Whether you're a student working on assignments, a professional handling international projects, a traveler navigating different measurement systems, or simply someone looking for quick and accurate conversions, we're here to help.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Your feedback, questions, and suggestions are incredibly valuable to us. They help us understand how people use ConverterX, what features matter most, and where we can improve. We read every message and use your input to shape the future of our platform.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold mb-3 text-foreground">Get in Touch</h2>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    We typically respond within 24-48 hours. For urgent technical issues, please include as much detail as possible about the problem you're experiencing, including the device and browser you're using.
                  </p>
                  <a 
                    href="mailto:contact.converterx@gmail.com"
                    className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-lg"
                  >
                    <Mail className="h-5 w-5" />
                    contact.converterx@gmail.com
                  </a>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-card rounded-2xl p-6 border border-border/50">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Support & Help</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Bug reports and technical issues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Questions about specific conversions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Help with using ConverterX features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Account or privacy concerns</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-card rounded-2xl p-6 border border-border/50">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Feedback & Ideas</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Feature requests and suggestions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>New conversion categories to add</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Partnership and collaboration inquiries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>General feedback about your experience</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-3 text-foreground">Why Contact Us?</h3>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  ConverterX is built by people who care about creating useful, accessible tools. We're not a large corporation with automated responses – when you contact us, you're reaching real people who are passionate about making conversions simple and accurate for everyone.
                </p>
                <p>
                  Whether you've found a bug, have an idea for improvement, need clarification on how a conversion works, or just want to share your experience with ConverterX, we're listening. Every message helps us build a better platform that serves our community more effectively.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

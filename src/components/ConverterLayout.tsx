import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface ConverterLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function ConverterLayout({ children, title, subtitle }: ConverterLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-4 flex items-center">
        <div className="max-w-2xl mx-auto w-full space-y-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="hover:bg-primary/10 h-9"
            size="sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {/* Header */}
          <div className="text-center space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>

          {/* Content */}
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}

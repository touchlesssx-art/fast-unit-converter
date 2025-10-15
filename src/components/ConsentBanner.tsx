import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CONSENT_KEY = 'converterx_consent';

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);
  
  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
  };
  
  const handleDismiss = () => {
    localStorage.setItem(CONSENT_KEY, 'dismissed');
    setVisible(false);
  };
  
  if (!visible) return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card border-t border-border shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 text-sm">
          <p>
            We use Google Analytics (GA4) to improve ConverterX. No personal data is collected. 
            By continuing, you accept our use of analytics.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button onClick={handleAccept} size="sm">
            Accept
          </Button>
          <Button onClick={handleDismiss} variant="ghost" size="sm">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

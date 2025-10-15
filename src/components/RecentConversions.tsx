import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { getRecentConversions, type RecentConversion } from '@/utils/storage';

export default function RecentConversions() {
  const [recent, setRecent] = useState<RecentConversion[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    setRecent(getRecentConversions());
    
    // Listen for storage changes
    const handleStorage = () => {
      setRecent(getRecentConversions());
    };
    
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);
  
  if (recent.length === 0) return null;
  
  return (
    <div className="bg-card rounded-2xl shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Recent Conversions</h2>
      </div>
      
      <div className="space-y-2">
        {recent.map((item, idx) => (
          <button
            key={idx}
            onClick={() => navigate(`/convert/${item.from}-to-${item.to}`)}
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-muted transition-colors text-left"
          >
            <div className="flex-1">
              <div className="text-sm font-medium">
                {item.fromValue} → {item.toValue}
              </div>
              <div className="text-xs text-muted-foreground capitalize">
                {item.category}
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
}

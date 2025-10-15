import { Link } from 'react-router-dom';
import { 
  Ruler, Square, Droplet, Weight, Thermometer, 
  Gauge, Clock, Zap, Battery, Wind, HardDrive 
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Ruler, Square, Droplet, Weight, Thermometer,
  Gauge, Clock, Zap, Battery, Wind, HardDrive,
};

interface CategoryCardProps {
  id: string;
  name: string;
  icon: string;
}

export default function CategoryCard({ id, name, icon }: CategoryCardProps) {
  const IconComponent = iconMap[icon] || Ruler;
  
  return (
    <Link
      to={`/category/${id}`}
      className="group bg-gradient-card rounded-2xl p-6 shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
          <IconComponent className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
          {name}
        </h3>
      </div>
    </Link>
  );
}

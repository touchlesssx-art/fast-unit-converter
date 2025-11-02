import { useState, useEffect } from 'react';
import { ArrowLeftRight, Copy, Check, Star } from 'lucide-react';
import { categories, convert, formatNumber, type Unit, type Category } from '@/converters/conversionFactors';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { addRecentConversion, toggleFavorite, isFavorite } from '@/utils/storage';
import { trackConversion, trackSwap, trackCopy, trackFavoriteToggle } from '@/utils/analytics';

interface UnitConverterProps {
  categoryId: string;
  defaultFrom?: string;
  defaultTo?: string;
}

export default function UnitConverter({ categoryId, defaultFrom, defaultTo }: UnitConverterProps) {
  const category = categories.find(c => c.id === categoryId);
  const { toast } = useToast();
  
  if (!category) return <div>Category not found</div>;
  
  const units = Object.keys(category.units);
  const [fromUnit, setFromUnit] = useState(defaultFrom || units[0]);
  const [toUnit, setToUnit] = useState(defaultTo || units[1]);
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('');
  const [copied, setCopied] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [rotated, setRotated] = useState(false);
  
  useEffect(() => {
    setFavorite(isFavorite(fromUnit, toUnit, categoryId));
  }, [fromUnit, toUnit, categoryId]);
  
  useEffect(() => {
    if (fromValue && !isNaN(parseFloat(fromValue))) {
      const value = parseFloat(fromValue);
      const from = category.units[fromUnit];
      const to = category.units[toUnit];
      const result = convert(value, from, to);
      setToValue(formatNumber(result));
      
      // Save to recent
      addRecentConversion({
        from: fromUnit,
        to: toUnit,
        category: categoryId,
        fromValue: fromValue,
        toValue: formatNumber(result),
      });
    } else {
      setToValue('');
    }
  }, [fromValue, fromUnit, toUnit, category, categoryId]);
  
  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
    setRotated(!rotated);
    trackSwap(categoryId);
  };
  
  const handleCopy = async () => {
    const textToCopy = `${toValue} ${category.units[toUnit].symbol}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      trackCopy(categoryId);
      toast({
        title: 'Copied!',
        description: `${textToCopy} copied to clipboard`,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: 'Failed to copy',
        variant: 'destructive',
      });
    }
  };
  
  const handleFavoriteToggle = () => {
    const newState = toggleFavorite({ from: fromUnit, to: toUnit, category: categoryId });
    setFavorite(newState);
    trackFavoriteToggle(`${fromUnit}-${toUnit}`);
    toast({
      title: newState ? 'Added to favorites' : 'Removed from favorites',
    });
  };
  
  const handleFromValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty, minus, and valid decimal numbers
    if (value === '' || value === '-' || !isNaN(parseFloat(value))) {
      setFromValue(value);
    }
  };
  
  const handleToValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || value === '-' || !isNaN(parseFloat(value))) {
      setToValue(value);
      // Reverse conversion
      if (value && !isNaN(parseFloat(value))) {
        const val = parseFloat(value);
        const to = category.units[toUnit];
        const from = category.units[fromUnit];
        const result = convert(val, to, from);
        setFromValue(formatNumber(result));
      }
    }
  };
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card rounded-2xl shadow-lg p-4 md:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg md:text-xl font-bold text-center flex-1">{category.name} Converter</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavoriteToggle}
            className={favorite ? 'text-yellow-500' : ''}
          >
            <Star className="h-4 w-4 md:h-5 md:w-5" fill={favorite ? 'currentColor' : 'none'} />
          </Button>
        </div>
        
        {/* From Unit */}
        <div className="space-y-2">
          <label className="text-xs md:text-sm font-medium block text-center">From</label>
          <div className="flex gap-2 md:gap-3">
            <Input
              type="tel"
              inputMode="decimal"
              pattern="[0-9]*"
              value={fromValue}
              onChange={handleFromValueChange}
              className="flex-1 text-sm md:text-base h-11 md:h-12 text-center"
              placeholder="Enter value"
            />
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger className="w-32 md:w-40 h-11 md:h-12 text-sm md:text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover max-h-[200px] md:max-h-[300px]">
                {units.map(unit => (
                  <SelectItem key={unit} value={unit} className="text-sm">
                    {category.units[unit].name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Swap Button */}
        <div className="flex justify-center -my-1.5">
          <Button
            variant="outline"
            size="icon"
            onClick={handleSwap}
            className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-background border-2 hover:bg-primary/10 transition-all shadow-sm"
          >
            <ArrowLeftRight className={`h-3.5 w-3.5 md:h-5 md:w-5 transition-transform duration-300 ${rotated ? 'rotate-180' : ''}`} />
          </Button>
        </div>
        
        {/* To Unit */}
        <div className="space-y-2">
          <label className="text-xs md:text-sm font-medium block text-center">To</label>
          <div className="flex gap-2 md:gap-3">
            <Input
              type="tel"
              inputMode="decimal"
              pattern="[0-9]*"
              value={toValue}
              onChange={handleToValueChange}
              className="flex-1 text-sm md:text-base h-11 md:h-12 text-center"
              placeholder="Result"
            />
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger className="w-32 md:w-40 h-11 md:h-12 text-sm md:text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover max-h-[200px] md:max-h-[300px]">
                {units.map(unit => (
                  <SelectItem key={unit} value={unit} className="text-sm">
                    {category.units[unit].name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Copy Button */}
        <Button
          onClick={handleCopy}
          className="w-full h-11 md:h-12 text-sm md:text-base"
          disabled={!toValue}
        >
          {copied ? (
            <>
              <Check className="mr-2 h-3.5 w-3.5 md:h-4 md:w-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-3.5 w-3.5 md:h-4 md:w-4" />
              Copy Result
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

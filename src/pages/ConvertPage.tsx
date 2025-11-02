import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { ArrowLeftRight, Copy, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { categories } from '@/converters/conversionFactors';

interface UnitConverterProps {
  categoryId: string;
  defaultFrom?: string;
  defaultTo?: string;
}

export default function UnitConverter({ categoryId, defaultFrom, defaultTo }: UnitConverterProps) {
  const category = categories.find((c) => c.id === categoryId);

  const [amount, setAmount] = useState('0');
  const [fromUnit, setFromUnit] = useState(defaultFrom || Object.keys(category?.units || {})[0]);
  const [toUnit, setToUnit] = useState(defaultTo || Object.keys(category?.units || {})[1]);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (amount && category) {
      convert();
    }
  }, [amount, fromUnit, toUnit]);

  const convert = () => {
    if (!category || !amount) return;
    const fromFactor = category.units[fromUnit!].factor;
    const toFactor = category.units[toUnit!].factor;
    const converted = (parseFloat(amount) * fromFactor) / toFactor;
    setResult(converted.toFixed(4));
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: 'Copied!',
        description: 'Result copied to clipboard.',
        duration: 2000, // 2 saniyəyə avtomatik bağlanacaq ✅
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-3 md:p-4 rounded-2xl shadow-xl bg-gradient-to-br from-background to-muted/20">
        <div className="space-y-2.5">

          {/* Amount Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground block text-center">From</label>
            <Input
              type="number"
              inputMode="decimal"
              value={amount === '0' ? '' : amount}
              onFocus={() => amount === '0' && setAmount('')}
              onBlur={() => amount === '' && setAmount('0')}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="h-10 md:h-11 text-base md:text-lg font-semibold rounded-xl text-center"
            />
          </div>

          {/* Unit Selects */}
          <div className="space-y-2">
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger className="w-full h-10 md:h-11 bg-background rounded-xl text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50 max-h-[200px] md:max-h-[300px]">
                {Object.keys(category?.units || {}).map((key) => (
                  <SelectItem key={key} value={key} className="text-sm">
                    {key} — {category?.units[key].name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex justify-center -my-1">
              <Button
                variant="outline"
                size="icon"
                onClick={handleSwap}
                className="h-8 w-8 md:h-9 md:w-9 rounded-full bg-background border-2 hover:bg-primary/10 hover:rotate-180 transition-all duration-300 shadow-sm"
              >
                <ArrowLeftRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
              </Button>
            </div>

            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger className="w-full h-10 md:h-11 bg-background rounded-xl text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50 max-h-[200px] md:max-h-[300px]">
                {Object.keys(category?.units || {}).map((key) => (
                  <SelectItem key={key} value={key} className="text-sm">
                    {key} — {category?.units[key].name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Result */}
          {result && (
            <div className="space-y-2">
              <div className="p-2.5 md:p-3 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                <p className="text-base md:text-lg font-bold text-center">
                  {amount} {fromUnit} = {result} {toUnit}
                </p>
              </div>

              {/* Copy Button */}
              <Button
                onClick={handleCopy}
                variant="outline"
                className="w-full h-9 md:h-10 text-xs md:text-sm font-semibold rounded-xl hover:bg-primary/10 transition-all"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 md:h-3.5 md:w-3.5 mr-1.5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3 md:h-3.5 md:w-3.5 mr-1.5" />
                    Copy Result
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

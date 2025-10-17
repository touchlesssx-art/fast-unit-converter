import { useState, useEffect } from 'react';
import { ArrowLeftRight, Copy, TrendingUp } from 'lucide-react';
import { fetchExchangeRates, fetchHistoricalRates, currencies, type CurrencyInfo } from '@/utils/currencyApi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

interface CurrencyConversion {
  from: string;
  to: string;
  amount: string;
  result: string;
  rate: number;
  timestamp: number;
}

const RECENT_CURRENCY_KEY = 'converterx_recent_currency';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('AZN');
  const [result, setResult] = useState('');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [historicalData, setHistoricalData] = useState<{ date: string; rate: number }[]>([]);
  const [recentConversions, setRecentConversions] = useState<CurrencyConversion[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(RECENT_CURRENCY_KEY);
    if (stored) {
      try {
        setRecentConversions(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load recent conversions:', e);
      }
    }
  }, []);

  useEffect(() => {
    loadHistoricalData();
  }, [fromCurrency, toCurrency]);

  const loadHistoricalData = async () => {
    try {
      const data = await fetchHistoricalRates(fromCurrency, toCurrency, 7);
      setHistoricalData(data);
    } catch (error) {
      console.error('Failed to load historical data:', error);
    }
  };

  const handleConvert = async () => {
    if (!amount || isNaN(parseFloat(amount))) {
      toast({ title: 'Please enter a valid amount', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const data = await fetchExchangeRates(fromCurrency);
      const rate = data.rates[toCurrency];
      
      if (!rate) {
        throw new Error('Exchange rate not available');
      }

      const convertedAmount = parseFloat(amount) * rate;
      setResult(convertedAmount.toFixed(2));
      setExchangeRate(rate);

      // Save to recent conversions
      const newConversion: CurrencyConversion = {
        from: fromCurrency,
        to: toCurrency,
        amount,
        result: convertedAmount.toFixed(2),
        rate,
        timestamp: Date.now(),
      };

      const updated = [newConversion, ...recentConversions.filter(
        c => !(c.from === fromCurrency && c.to === toCurrency)
      )].slice(0, 5);

      setRecentConversions(updated);
      localStorage.setItem(RECENT_CURRENCY_KEY, JSON.stringify(updated));

      toast({ title: 'Conversion successful!' });
    } catch (error) {
      toast({ 
        title: 'Conversion failed', 
        description: 'Please try again later',
        variant: 'destructive' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult('');
    setExchangeRate(null);
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(`${amount} ${fromCurrency} = ${result} ${toCurrency}`);
      toast({ title: 'Copied to clipboard!' });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Main Converter Card */}
      <Card className="p-8 shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">💸 Currency Converter</h2>
          <p className="text-muted-foreground">Real-time exchange rates</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end mb-6">
          {/* From Currency */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount</label>
            <Input
              type="number"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="text-lg"
            />
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.flag} {c.code} - {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Swap Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={handleSwap}
            className="mb-2"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </Button>

          {/* To Currency */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Converted to</label>
            <Input
              type="text"
              value={result}
              readOnly
              placeholder="Result"
              className="text-lg font-semibold"
            />
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.flag} {c.code} - {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <Button
            onClick={handleConvert}
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] hover:opacity-90"
          >
            {loading ? 'Converting...' : 'Convert'}
          </Button>
          <Button
            variant="outline"
            onClick={handleCopy}
            disabled={!result}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>

        {exchangeRate && (
          <div className="text-center py-4 bg-muted/30 rounded-xl">
            <p className="text-lg font-semibold">
              1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Updated in real time</p>
          </div>
        )}
      </Card>

      {/* Exchange Rate Chart */}
      {historicalData.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold">Exchange Rate Trend (Last 7 Days)</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                tick={{ fontSize: 12 }}
                domain={['auto', 'auto']}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="url(#gradient)" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', r: 4 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Recent Conversions */}
      {recentConversions.length > 0 && (
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Conversions</h3>
          <div className="space-y-2">
            {recentConversions.map((conv, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium">
                  {conv.amount} {conv.from} → {conv.result} {conv.to}
                </span>
                <span className="text-sm text-muted-foreground">
                  Rate: {conv.rate.toFixed(4)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Currency List */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Browse All Currencies (A–Z)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
          {currencies.map((currency) => (
            <div
              key={currency.code}
              className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => {
                setFromCurrency(currency.code);
                setResult('');
                setExchangeRate(null);
              }}
            >
              <span className="text-2xl">{currency.flag}</span>
              <div>
                <div className="font-semibold">{currency.code}</div>
                <div className="text-xs text-muted-foreground">{currency.name}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

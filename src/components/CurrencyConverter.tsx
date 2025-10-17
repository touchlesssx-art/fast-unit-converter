import { useState, useEffect } from 'react';
import { ArrowLeftRight, Copy, TrendingUp } from 'lucide-react';
import { fetchExchangeRates, fetchHistoricalRates, type CurrencyInfo } from '@/utils/currencyApi';
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
  const [allCurrencies, setAllCurrencies] = useState<CurrencyInfo[]>([]);

  // Fetch all available currencies on mount
  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const data = await fetchExchangeRates('USD');
        const currencyCodes = Object.keys(data.rates);
        
        // Create currency list with basic info
        const currencyList: CurrencyInfo[] = currencyCodes.map(code => ({
          code,
          name: getCurrencyName(code),
          flag: getCurrencyFlag(code),
        })).sort((a, b) => a.code.localeCompare(b.code));
        
        setAllCurrencies(currencyList);
      } catch (error) {
        console.error('Failed to load currencies:', error);
      }
    };
    
    loadCurrencies();
  }, []);

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
      const data = await fetchHistoricalRates(fromCurrency, toCurrency, 14);
      setHistoricalData(data);
    } catch (error) {
      console.error('Failed to load historical data:', error);
    }
  };
  
  // Helper function to get currency name
  const getCurrencyName = (code: string): string => {
    const names: Record<string, string> = {
      USD: 'United States Dollar', EUR: 'Euro', GBP: 'British Pound', AZN: 'Azerbaijani Manat',
      TRY: 'Turkish Lira', RUB: 'Russian Ruble', JPY: 'Japanese Yen', CNY: 'Chinese Yuan',
      INR: 'Indian Rupee', AUD: 'Australian Dollar', CAD: 'Canadian Dollar', CHF: 'Swiss Franc',
      SEK: 'Swedish Krona', NZD: 'New Zealand Dollar', KRW: 'South Korean Won', SGD: 'Singapore Dollar',
      NOK: 'Norwegian Krone', MXN: 'Mexican Peso', BRL: 'Brazilian Real', ZAR: 'South African Rand',
      HKD: 'Hong Kong Dollar', PLN: 'Polish Zloty', THB: 'Thai Baht', IDR: 'Indonesian Rupiah',
      MYR: 'Malaysian Ringgit', PHP: 'Philippine Peso', DKK: 'Danish Krone', CZK: 'Czech Koruna',
      HUF: 'Hungarian Forint', RON: 'Romanian Leu', ILS: 'Israeli Shekel', AED: 'UAE Dirham',
      SAR: 'Saudi Riyal', KWD: 'Kuwaiti Dinar', QAR: 'Qatari Riyal', EGP: 'Egyptian Pound',
      PKR: 'Pakistani Rupee', BDT: 'Bangladeshi Taka', VND: 'Vietnamese Dong', ARS: 'Argentine Peso',
      CLP: 'Chilean Peso', COP: 'Colombian Peso', PEN: 'Peruvian Sol', UAH: 'Ukrainian Hryvnia',
      NGN: 'Nigerian Naira', KES: 'Kenyan Shilling', GHS: 'Ghanaian Cedi', MAD: 'Moroccan Dirham',
    };
    return names[code] || code;
  };
  
  // Helper function to get currency flag
  const getCurrencyFlag = (code: string): string => {
    const flags: Record<string, string> = {
      USD: '🇺🇸', EUR: '🇪🇺', GBP: '🇬🇧', AZN: '🇦🇿', TRY: '🇹🇷', RUB: '🇷🇺',
      JPY: '🇯🇵', CNY: '🇨🇳', INR: '🇮🇳', AUD: '🇦🇺', CAD: '🇨🇦', CHF: '🇨🇭',
      SEK: '🇸🇪', NZD: '🇳🇿', KRW: '🇰🇷', SGD: '🇸🇬', NOK: '🇳🇴', MXN: '🇲🇽',
      BRL: '🇧🇷', ZAR: '🇿🇦', HKD: '🇭🇰', PLN: '🇵🇱', THB: '🇹🇭', IDR: '🇮🇩',
      MYR: '🇲🇾', PHP: '🇵🇭', DKK: '🇩🇰', CZK: '🇨🇿', HUF: '🇭🇺', RON: '🇷🇴',
      ILS: '🇮🇱', AED: '🇦🇪', SAR: '🇸🇦', KWD: '🇰🇼', QAR: '🇶🇦', EGP: '🇪🇬',
      PKR: '🇵🇰', BDT: '🇧🇩', VND: '🇻🇳', ARS: '🇦🇷', CLP: '🇨🇱', COP: '🇨🇴',
      PEN: '🇵🇪', UAH: '🇺🇦', NGN: '🇳🇬', KES: '🇰🇪', GHS: '🇬🇭', MAD: '🇲🇦',
    };
    return flags[code] || '🌐';
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
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Main Converter Card */}
      <Card className="p-6 md:p-8 shadow-lg rounded-2xl bg-card/50 backdrop-blur-sm border-2">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#7b61ff] to-[#5ab8ff] bg-clip-text text-transparent">
            💸 Currency Converter
          </h2>
          <p className="text-muted-foreground">Real-time exchange rates for all major currencies</p>
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
              className="text-lg h-12"
            />
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="w-full h-12 bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                {allCurrencies.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.flag} {c.code} — {c.name}
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
            className="mb-2 h-12 w-12 rounded-xl hover:bg-primary/10 transition-all hover:scale-110"
          >
            <ArrowLeftRight className="h-5 w-5" />
          </Button>

          {/* To Currency */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Converted to</label>
            <Input
              type="text"
              value={result}
              readOnly
              placeholder="Result"
              className="text-lg font-semibold h-12 bg-muted/50"
            />
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="w-full h-12 bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover z-50">
                {allCurrencies.map((c) => (
                  <SelectItem key={c.code} value={c.code}>
                    {c.flag} {c.code} — {c.name}
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
            className="flex-1 h-12 text-lg font-semibold rounded-xl bg-gradient-to-r from-[#7b61ff] to-[#5ab8ff] hover:opacity-90 transition-all hover:shadow-lg hover:scale-[1.02]"
          >
            {loading ? 'Converting...' : 'Convert'}
          </Button>
          <Button
            variant="outline"
            onClick={handleCopy}
            disabled={!result}
            className="h-12 w-12 rounded-xl hover:bg-primary/10"
          >
            <Copy className="h-5 w-5" />
          </Button>
        </div>

        {exchangeRate && (
          <div className="text-center py-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/20">
            <p className="text-lg font-semibold">
              1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Updated just now — Powered by ConverterX API
            </p>
          </div>
        )}
      </Card>

      {/* Exchange Rate Chart - Dark Futuristic */}
      {historicalData.length > 0 && (
        <Card className="p-6 rounded-2xl overflow-hidden" style={{
          background: 'linear-gradient(135deg, #0b132b 0%, #1a1f3a 100%)',
          border: '1px solid rgba(123, 97, 255, 0.2)',
        }}>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5" style={{ color: '#7b61ff' }} />
            <h3 className="text-xl font-semibold text-white">
              Exchange Rate Trend (Last 14 Days)
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="date" 
                stroke="rgba(255,255,255,0.6)"
                tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.6)' }}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.6)"
                tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.6)' }}
                domain={['auto', 'auto']}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1a1f3a',
                  border: '1px solid rgba(123, 97, 255, 0.3)',
                  borderRadius: '12px',
                  color: '#fff',
                }}
                labelStyle={{ color: '#fff' }}
              />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="url(#chartGradient)" 
                strokeWidth={3}
                dot={{ fill: '#7b61ff', r: 4, strokeWidth: 2, stroke: '#5ab8ff' }}
                activeDot={{ r: 6 }}
              />
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7b61ff" />
                  <stop offset="100%" stopColor="#5ab8ff" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Recent Conversions */}
      {recentConversions.length > 0 && (
        <Card className="p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Recent Conversions</h3>
          <div className="space-y-2">
            {recentConversions.map((conv, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-3 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl hover:from-primary/10 hover:to-accent/10 transition-all cursor-pointer"
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
      <Card className="p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Browse All Currencies (A–Z)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-2">
          {allCurrencies.map((currency) => (
            <div
              key={currency.code}
              className="flex items-center gap-3 p-3 bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl hover:from-primary/10 hover:to-accent/10 transition-all cursor-pointer group"
              onClick={() => {
                setFromCurrency(currency.code);
                setResult('');
                setExchangeRate(null);
              }}
            >
              <span className="text-2xl">{currency.flag}</span>
              <div className="flex-1">
                <div className="font-semibold group-hover:text-primary transition-colors">
                  {currency.code}
                </div>
                <div className="text-xs text-muted-foreground line-clamp-1">
                  {currency.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

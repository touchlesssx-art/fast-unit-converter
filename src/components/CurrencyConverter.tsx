import { useState, useEffect } from 'react';
import { ArrowLeftRight, Copy, TrendingUp, Search } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

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

  const filteredCurrencies = allCurrencies.filter(currency => 
    currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    currency.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCurrencySelect = (code: string) => {
    setSelectedCurrency(code);
    setFromCurrency(code);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Search Section */}
      <Card className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm border-2">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search currencies (e.g., USD, Euro, Dollar...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 text-lg rounded-xl border-2 focus:border-primary transition-all"
          />
        </div>
      </Card>

      {/* Currency List */}
      <Card className="p-6 rounded-2xl shadow-lg">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">All Major Currencies</h2>
          <p className="text-muted-foreground">
            {filteredCurrencies.length} {filteredCurrencies.length === 1 ? 'currency' : 'currencies'} available
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
          {filteredCurrencies.map((currency) => (
            <div
              key={currency.code}
              onClick={() => handleCurrencySelect(currency.code)}
              className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-200 cursor-pointer ${
                selectedCurrency === currency.code
                  ? 'bg-white border-2 border-primary shadow-lg scale-[1.02]'
                  : 'bg-white border border-border hover:scale-[1.02] hover:shadow-md'
              }`}
            >
              <span className="text-2xl">{currency.flag}</span>
              <div className="flex-1">
                <span className={`font-bold text-base ${selectedCurrency === currency.code ? 'text-primary' : 'text-foreground'}`}>
                  {currency.code}
                </span>
                <span className="text-foreground"> — </span>
                <span className="text-sm text-foreground">
                  {currency.name}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {filteredCurrencies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No currencies found matching "{searchQuery}"</p>
          </div>
        )}
      </Card>

      {/* Converter Section - Shows when currency is selected */}
      {selectedCurrency && (
        <Card className="p-6 md:p-8 shadow-lg rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm border-2 border-primary/20">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              💸 Convert {getCurrencyName(selectedCurrency)}
            </h2>
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
      )}


      {/* Recent Conversions */}
      {selectedCurrency && recentConversions.length > 0 && (
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

    </div>
  );
}

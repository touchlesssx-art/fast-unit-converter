import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftRight, ArrowLeft } from 'lucide-react';
import { fetchExchangeRates, type CurrencyInfo } from '@/utils/currencyApi';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';

export default function CurrencyConversionPage() {
  const { currency } = useParams<{ currency: string }>();
  const navigate = useNavigate();
  
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState(currency?.toUpperCase() || 'AZN');
  const [toCurrency, setToCurrency] = useState('USD');
  const [result, setResult] = useState('');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [allCurrencies, setAllCurrencies] = useState<CurrencyInfo[]>([]);

  // Fetch all available currencies on mount
  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const data = await fetchExchangeRates('USD');
        const currencyCodes = Object.keys(data.rates);
        
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
    handleConvert();
  }, [fromCurrency, toCurrency]);

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
  };

  return (
    <>
      <Helmet>
        <title>{fromCurrency} to {toCurrency} Converter - ConverterX</title>
        <meta name="description" content={`Convert ${fromCurrency} to ${toCurrency} with real-time exchange rates. Free currency converter with live rates and historical data.`} />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
        <Navbar />
        
        <main className="flex-1 container mx-auto px-4 py-2 flex items-center">
          <div className="max-w-7xl mx-auto w-full space-y-2 animate-fade-in">
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => navigate('/category/currency')}
              className="hover:bg-primary/10 mb-1"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to currencies
            </Button>

            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#6366F1] to-[#4F46E5] bg-clip-text text-transparent">
                💸 {fromCurrency} to {toCurrency}
              </h1>
              <div className="inline-block">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#6366F1] to-[#4F46E5] text-white font-bold text-xs md:text-sm shadow-lg shadow-primary/50 animate-pulse">
                  ⚙️ BETA
                </span>
              </div>
            </div>

            {/* Main Content */}
            <Card className="p-4 md:p-6 rounded-2xl shadow-xl bg-gradient-to-br from-background to-muted/20 max-w-2xl mx-auto">
              {/* Converter Form */}
              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-bold text-center">{fromCurrency} to {toCurrency}</h2>

                {/* Amount Input */}
                <div className="space-y-2">
                  <label className="text-xs md:text-sm font-medium text-muted-foreground block text-center">Amount</label>
                  <Input
                    type="number"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="h-11 md:h-12 text-lg md:text-xl font-semibold rounded-xl text-center"
                  />
                </div>

                {/* Currency Dropdowns with Swap */}
                <div className="space-y-3">
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger className="w-full h-11 md:h-12 bg-background rounded-xl text-sm md:text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50 max-h-[200px] md:max-h-[300px]">
                      {allCurrencies.map((c) => (
                        <SelectItem key={c.code} value={c.code} className="text-sm">
                          {c.flag} {c.code} — {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="flex justify-center -my-1.5">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleSwap}
                      className="h-9 w-9 md:h-10 md:w-10 rounded-full bg-background border-2 hover:bg-primary/10 hover:rotate-180 transition-all duration-300 shadow-sm"
                    >
                      <ArrowLeftRight className="h-3.5 w-3.5 md:h-5 md:w-5" />
                    </Button>
                  </div>

                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger className="w-full h-11 md:h-12 bg-background rounded-xl text-sm md:text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover z-50 max-h-[200px] md:max-h-[300px]">
                      {allCurrencies.map((c) => (
                        <SelectItem key={c.code} value={c.code} className="text-sm">
                          {c.flag} {c.code} — {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Convert Button */}
                <Button
                  onClick={handleConvert}
                  disabled={loading}
                  className="w-full h-11 md:h-12 text-sm md:text-base font-semibold rounded-xl bg-gradient-to-r from-[#6366F1] to-[#4F46E5] hover:opacity-90 transition-all hover:shadow-lg hover:scale-[1.02]"
                >
                  {loading ? 'Converting...' : 'Convert'}
                </Button>

                {/* Result Display */}
                {exchangeRate && result && (
                  <div className="p-3 md:p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 mt-2">
                    <p className="text-lg md:text-xl font-bold text-center">
                      {amount} {fromCurrency} = {result} {toCurrency}
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground text-center mt-2">
                      1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency} (Updated live)
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Footer */}
            <div className="text-center text-xs text-muted-foreground py-1">
              Exchange data provided by exchangerate.host | ConverterX © 2025
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

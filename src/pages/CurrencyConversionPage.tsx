import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftRight, ArrowLeft, Copy, Check } from 'lucide-react';
import { fetchExchangeRates, type CurrencyInfo } from '@/utils/currencyApi';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import AdBanner from '@/components/AdBanner'; // ✅ Added import

export default function CurrencyConversionPage() {
  const { currency } = useParams<{ currency: string }>();
  const navigate = useNavigate();

  const [amount, setAmount] = useState('0');
  const [fromCurrency, setFromCurrency] = useState(currency?.toUpperCase() || 'AZN');
  const [toCurrency, setToCurrency] = useState('USD');
  const [result, setResult] = useState('');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [allCurrencies, setAllCurrencies] = useState<CurrencyInfo[]>([]);
  const [copied, setCopied] = useState(false);

  // Fetch all available currencies on mount
  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const data = await fetchExchangeRates('USD');
        const currencyCodes = Object.keys(data.rates);

        const currencyList: CurrencyInfo[] = currencyCodes
          .map((code) => ({
            code,
            name: getCurrencyName(code),
            flag: getCurrencyFlag(code),
          }))
          .sort((a, b) => a.code.localeCompare(b.code));

        setAllCurrencies(currencyList);
      } catch (error) {
        console.error('Failed to load currencies:', error);
      }
    };

    loadCurrencies();
  }, []);

  // Auto-convert when amount or currencies change
  useEffect(() => {
    handleConvert();
  }, [amount, fromCurrency, toCurrency]);

  const getCurrencyName = (code: string): string => {
    const names: Record<string, string> = {
      USD: 'United States Dollar',
      EUR: 'Euro',
      GBP: 'British Pound',
      AZN: 'Azerbaijani Manat',
      TRY: 'Turkish Lira',
      RUB: 'Russian Ruble',
      JPY: 'Japanese Yen',
      CNY: 'Chinese Yuan',
      INR: 'Indian Rupee',
      AUD: 'Australian Dollar',
      CAD: 'Canadian Dollar',
      CHF: 'Swiss Franc',
      SEK: 'Swedish Krona',
      NZD: 'New Zealand Dollar',
      KRW: 'South Korean Won',
      SGD: 'Singapore Dollar',
      NOK: 'Norwegian Krone',
      MXN: 'Mexican Peso',
      BRL: 'Brazilian Real',
      ZAR: 'South African Rand',
      HKD: 'Hong Kong Dollar',
      PLN: 'Polish Zloty',
      THB: 'Thai Baht',
      IDR: 'Indonesian Rupiah',
      MYR: 'Malaysian Ringgit',
      PHP: 'Philippine Peso',
      DKK: 'Danish Krone',
      CZK: 'Czech Koruna',
      HUF: 'Hungarian Forint',
      RON: 'Romanian Leu',
      ILS: 'Israeli Shekel',
      AED: 'UAE Dirham',
      SAR: 'Saudi Riyal',
      KWD: 'Kuwaiti Dinar',
      QAR: 'Qatari Riyal',
      EGP: 'Egyptian Pound',
      PKR: 'Pakistani Rupee',
      BDT: 'Bangladeshi Taka',
      VND: 'Vietnamese Dong',
      ARS: 'Argentine Peso',
      CLP: 'Chilean Peso',
      COP: 'Colombian Peso',
      PEN: 'Peruvian Sol',
      UAH: 'Ukrainian Hryvnia',
      NGN: 'Nigerian Naira',
      KES: 'Kenyan Shilling',
      GHS: 'Ghanaian Cedi',
      MAD: 'Moroccan Dirham',
    };
    return names[code] || code;
  };

  const getCurrencyFlag = (code: string): string => {
    const flags: Record<string, string> = {
      USD: '🇺🇸',
      EUR: '🇪🇺',
      GBP: '🇬🇧',
      AZN: '🇦🇿',
      TRY: '🇹🇷',
      RUB: '🇷🇺',
      JPY: '🇯🇵',
      CNY: '🇨🇳',
      INR: '🇮🇳',
      AUD: '🇦🇺',
      CAD: '🇨🇦',
      CHF: '🇨🇭',
      SEK: '🇸🇪',
      NZD: '🇳🇿',
      KRW: '🇰🇷',
      SGD: '🇸🇬',
      NOK: '🇳🇴',
      MXN: '🇲🇽',
      BRL: '🇧🇷',
      ZAR: '🇿🇦',
      HKD: '🇭🇰',
      PLN: '🇵🇱',
      THB: '🇹🇭',
      IDR: '🇮🇩',
      MYR: '🇲🇾',
      PHP: '🇵🇭',
      DKK: '🇩🇰',
      CZK: '🇨🇿',
      HUF: '🇭🇺',
      RON: '🇷🇴',
      ILS: '🇮🇱',
      AED: '🇦🇪',
      SAR: '🇸🇦',
      KWD: '🇰🇼',
      QAR: '🇶🇦',
      EGP: '🇪🇬',
      PKR: '🇵🇰',
      BDT: '🇧🇩',
      VND: '🇻🇳',
      ARS: '🇦🇷',
      CLP: '🇨🇱',
      COP: '🇨🇴',
      PEN: '🇵🇪',
      UAH: '🇺🇦',
      NGN: '🇳🇬',
      KES: '🇰🇪',
      GHS: '🇬🇭',
      MAD: '🇲🇦',
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
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: 'Copied!',
        description: 'Result copied to clipboard',
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {fromCurrency} to {toCurrency} Converter - ConverterX
        </title>
        <meta
          name="description"
          content={`Convert ${fromCurrency} to ${toCurrency} with real-time exchange rates. Free currency converter with live rates and historical data.`}
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
        <Navbar />

        {/* ✅ Google AdSense Banner just below Navbar */}
        <AdBanner />

        <main className="flex-1 container mx-auto px-4 py-1 flex items-center">
          <div className="max-w-2xl mx-auto w-full space-y-1 animate-fade-in">
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => navigate('/category/currency')}
              className="hover:bg-primary/10 h-8 text-xs"
              size="sm"
            >
              <ArrowLeft className="h-3 w-3 mr-1" />
              Back
            </Button>

            {/* Header */}
            <div className="text-center">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#6366F1] to-[#4F46E5] bg-clip-text text-transparent">
                💸 {fromCurrency} to {toCurrency}
              </h1>
            </div>

            {/* Main Content */}
            <Card className="p-3 md:p-4 rounded-2xl shadow-xl bg-gradient-to-br from-background to-muted/20">
              <div className="space-y-2.5">
                {/* Amount Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground block text-center">
                    Amount
                  </label>
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

                {/* Currency Dropdowns */}
                <div className="space-y-2">
                  <Select value={fromCurrency} onValueChange={setFromCurrency}>
                    <SelectTrigger className="w-full h-10 md:h-11 bg-background rounded-xl text-sm">
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

                  <Select value={toCurrency} onValueChange={setToCurrency}>
                    <SelectTrigger className="w-full h-10 md:h-11 bg-background rounded-xl text-sm">
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

                {/* Result Display */}
                {exchangeRate && result && (
                  <div className="space-y-2">
                    <div className="p-2.5 md:p-3 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                      <p className="text-base md:text-lg font-bold text-center">
                        {amount} {fromCurrency} = {result} {toCurrency}
                      </p>
                      <p className="text-xs text-muted-foreground text-center mt-1">
                        1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
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

            <div className="text-center text-[10px] md:text-xs text-muted-foreground">
              Exchange data by exchangerate.host
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeftRight, Copy, Check } from 'lucide-react';
import { fetchExchangeRates, type CurrencyInfo } from '@/utils/currencyApi';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Helmet } from 'react-helmet-async';
import ConverterLayout from '@/components/ConverterLayout';

export default function CurrencyConversionPage() {
  const { currency } = useParams<{ currency: string }>();
  
  const [amount, setAmount] = useState('1');
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

  // Auto-convert when amount or currencies change
  useEffect(() => {
    handleConvert();
  }, [amount, fromCurrency, toCurrency]);

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

  const handleCopy = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({ 
        title: 'Copied!', 
        description: 'Result copied to clipboard' 
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>{fromCurrency} to {toCurrency} Converter - ConverterX</title>
        <meta name="description" content={`Convert ${fromCurrency} to ${toCurrency} with real-time exchange rates. Free currency converter with live rates and historical data.`} />
      </Helmet>

      <ConverterLayout 
        title={`💱 ${fromCurrency} to ${toCurrency}`}
        subtitle="Real-time currency conversion"
      >
        <Card className="p-6 rounded-2xl shadow-lg bg-card/50 backdrop-blur-sm border-2">
              {/* Converter Form */}
              <div className="space-y-4">

                {/* Amount Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Amount</label>
                  <Input
                    type="number"
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="h-12 text-lg font-semibold rounded-xl"
                  />
                </div>

                {/* Currency Dropdowns with Swap */}
                <div className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">From</label>
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger className="w-full h-12 bg-background rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50 max-h-[300px]">
                        {allCurrencies.map((c) => (
                          <SelectItem key={c.code} value={c.code}>
                            {c.flag} {c.code} — {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-center -my-1.5">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleSwap}
                      className="h-10 w-10 rounded-full bg-background border-2 hover:bg-primary/10 hover:rotate-180 transition-all duration-300 shadow-sm"
                    >
                      <ArrowLeftRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">To</label>
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger className="w-full h-12 bg-background rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50 max-h-[300px]">
                        {allCurrencies.map((c) => (
                          <SelectItem key={c.code} value={c.code}>
                            {c.flag} {c.code} — {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Result Display */}
                {exchangeRate && result && (
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20">
                      <p className="text-xl font-bold text-center">
                        {amount} {fromCurrency} = {result} {toCurrency}
                      </p>
                      <p className="text-sm text-muted-foreground text-center mt-2">
                        1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                      </p>
                    </div>
                    
                    {/* Copy Button */}
                    <Button
                      onClick={handleCopy}
                      variant="outline"
                      className="w-full h-11 text-sm font-semibold rounded-xl hover:bg-primary/10 transition-all"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy Result
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </Card>

            {/* Footer Info */}
            <p className="text-center text-xs text-muted-foreground">
              Exchange data by exchangerate.host
            </p>
          </ConverterLayout>
    </>
  );
}

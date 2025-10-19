import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { fetchExchangeRates, type CurrencyInfo } from '@/utils/currencyApi';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function CurrencyConverter() {
  const navigate = useNavigate();
  const [allCurrencies, setAllCurrencies] = useState<CurrencyInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredCurrencies = allCurrencies.filter(currency => 
    currency.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    currency.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCurrencySelect = (code: string) => {
    navigate(`/currency/${code.toLowerCase()}`);
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
              className="flex items-center gap-3 p-4 rounded-xl transition-all duration-200 cursor-pointer bg-white border border-border hover:scale-[1.02] hover:shadow-md"
            >
              <span className="text-2xl">{currency.flag}</span>
              <div className="flex-1">
                <span className="font-bold text-base text-foreground">
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
    </div>
  );
}

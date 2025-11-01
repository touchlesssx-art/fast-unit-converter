// Fuzzy search for units and currencies

import { categories } from '@/converters/conversionFactors';
import { currencies } from '@/utils/currencyApi';

export interface SearchResult {
  from: string;
  to: string;
  category: string;
  fromName: string;
  toName: string;
  score: number;
  type: 'unit' | 'currency';
  flag?: string;
}

export function searchUnits(query: string): SearchResult[] {
  if (!query || query.trim().length < 2) return [];
  
  const terms = query.toLowerCase().trim().split(/\s+/);
  const results: SearchResult[] = [];
  
  // Search units
  categories.forEach(category => {
    const units = Object.entries(category.units);
    
    // Check all unit pairs
    units.forEach(([fromKey, fromUnit]) => {
      units.forEach(([toKey, toUnit]) => {
        if (fromKey === toKey) return;
        
        const searchText = `${fromUnit.name} ${fromUnit.symbol} ${toUnit.name} ${toUnit.symbol}`.toLowerCase();
        
        let score = 0;
        terms.forEach(term => {
          if (searchText.includes(term)) {
            score += 10;
            // Boost for exact symbol matches
            if (fromUnit.symbol.toLowerCase() === term || toUnit.symbol.toLowerCase() === term) {
              score += 20;
            }
          }
        });
        
        if (score > 0) {
          results.push({
            from: fromKey,
            to: toKey,
            category: category.id,
            fromName: fromUnit.name,
            toName: toUnit.name,
            score,
            type: 'unit',
          });
        }
      });
    });
  });
  
  // Search currencies
  currencies.forEach(fromCurrency => {
    currencies.forEach(toCurrency => {
      if (fromCurrency.code === toCurrency.code) return;
      
      const searchText = `${fromCurrency.code} ${fromCurrency.name} ${toCurrency.code} ${toCurrency.name}`.toLowerCase();
      
      let score = 0;
      terms.forEach(term => {
        if (searchText.includes(term)) {
          score += 10;
          // Boost for exact code matches
          if (fromCurrency.code.toLowerCase() === term || toCurrency.code.toLowerCase() === term) {
            score += 25;
          }
        }
      });
      
      if (score > 0) {
        results.push({
          from: fromCurrency.code.toLowerCase(),
          to: toCurrency.code.toLowerCase(),
          category: 'currency',
          fromName: `${fromCurrency.flag} ${fromCurrency.code}`,
          toName: `${toCurrency.flag} ${toCurrency.code}`,
          score,
          type: 'currency',
          flag: fromCurrency.flag,
        });
      }
    });
  });
  
  return results.sort((a, b) => b.score - a.score).slice(0, 15);
}

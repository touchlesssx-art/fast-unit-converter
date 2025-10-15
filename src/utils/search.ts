// Fuzzy search for units

import { categories } from '@/converters/conversionFactors';

export interface SearchResult {
  from: string;
  to: string;
  category: string;
  fromName: string;
  toName: string;
  score: number;
}

export function searchUnits(query: string): SearchResult[] {
  if (!query || query.trim().length < 2) return [];
  
  const terms = query.toLowerCase().trim().split(/\s+/);
  const results: SearchResult[] = [];
  
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
          });
        }
      });
    });
  });
  
  return results.sort((a, b) => b.score - a.score).slice(0, 10);
}

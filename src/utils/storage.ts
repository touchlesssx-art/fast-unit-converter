// LocalStorage utilities for favorites and recent conversions

export interface RecentConversion {
  from: string;
  to: string;
  category: string;
  fromValue: string;
  toValue: string;
  timestamp: number;
}

export interface FavoritePair {
  from: string;
  to: string;
  category: string;
}

const RECENT_KEY = 'converterx_recent';
const FAVORITES_KEY = 'converterx_favorites';
const MAX_RECENT = 5;

export function getRecentConversions(): RecentConversion[] {
  try {
    const data = localStorage.getItem(RECENT_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addRecentConversion(conversion: Omit<RecentConversion, 'timestamp'>) {
  try {
    const recent = getRecentConversions();
    const newConversion = { ...conversion, timestamp: Date.now() };
    
    // Remove duplicates and add to front
    const filtered = recent.filter(r => 
      !(r.from === conversion.from && r.to === conversion.to && r.category === conversion.category)
    );
    
    filtered.unshift(newConversion);
    const trimmed = filtered.slice(0, MAX_RECENT);
    
    localStorage.setItem(RECENT_KEY, JSON.stringify(trimmed));
  } catch (e) {
    console.error('Failed to save recent conversion:', e);
  }
}

export function getFavorites(): FavoritePair[] {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(pair: FavoritePair): boolean {
  try {
    const favorites = getFavorites();
    const index = favorites.findIndex(
      f => f.from === pair.from && f.to === pair.to && f.category === pair.category
    );
    
    if (index >= 0) {
      favorites.splice(index, 1);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      return false;
    } else {
      favorites.push(pair);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      return true;
    }
  } catch {
    return false;
  }
}

export function isFavorite(from: string, to: string, category: string): boolean {
  const favorites = getFavorites();
  return favorites.some(f => f.from === from && f.to === to && f.category === category);
}

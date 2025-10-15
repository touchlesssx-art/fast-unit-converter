// GA4 Analytics utilities

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with actual GA4 ID

export function trackEvent(eventName: string, parameters?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
}

export function trackConversion(category: string, fromUnit: string, toUnit: string) {
  trackEvent('conversion_performed', {
    category,
    from_unit: fromUnit,
    to_unit: toUnit,
  });
}

export function trackSwap(category: string) {
  trackEvent('unit_swapped', { category });
}

export function trackCopy(category: string) {
  trackEvent('result_copied', { category });
}

export function trackFavoriteToggle(pair: string) {
  trackEvent('favorite_toggled', { pair });
}

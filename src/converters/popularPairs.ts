// Popular conversion pairs for SEO static routes

export interface ConversionPair {
  from: string;
  to: string;
  category: string;
  slug: string;
  title: string;
  description: string;
  faq?: { question: string; answer: string }[];
}

export const popularPairs: ConversionPair[] = [
  // Weight conversions
  {
    from: 'kg',
    to: 'lb',
    category: 'weight',
    slug: 'kg-to-lb',
    title: 'KG to LB — Fast Kilograms to Pounds Converter | ConverterX',
    description: 'Convert kilograms to pounds instantly. Accurate kg to lb conversion calculator with formulas and examples.',
    faq: [
      { question: 'How many pounds in a kilogram?', answer: '1 kilogram equals 2.20462 pounds.' },
      { question: 'How to convert kg to lbs?', answer: 'Multiply the weight in kilograms by 2.20462 to get pounds.' },
    ]
  },
  {
    from: 'lb',
    to: 'kg',
    category: 'weight',
    slug: 'lb-to-kg',
    title: 'LB to KG — Fast Pounds to Kilograms Converter | ConverterX',
    description: 'Convert pounds to kilograms instantly. Accurate lb to kg conversion calculator with formulas and examples.',
    faq: [
      { question: 'How many kilograms in a pound?', answer: '1 pound equals 0.453592 kilograms.' },
      { question: 'How to convert lbs to kg?', answer: 'Multiply the weight in pounds by 0.453592 to get kilograms.' },
    ]
  },
  // Length conversions
  {
    from: 'm',
    to: 'ft',
    category: 'length',
    slug: 'm-to-ft',
    title: 'Meters to Feet — Fast M to FT Converter | ConverterX',
    description: 'Convert meters to feet instantly. Accurate m to ft conversion calculator for length measurements.',
    faq: [
      { question: 'How many feet in a meter?', answer: '1 meter equals 3.28084 feet.' },
    ]
  },
  {
    from: 'ft',
    to: 'm',
    category: 'length',
    slug: 'ft-to-m',
    title: 'Feet to Meters — Fast FT to M Converter | ConverterX',
    description: 'Convert feet to meters instantly. Accurate ft to m conversion calculator for length measurements.',
    faq: [
      { question: 'How many meters in a foot?', answer: '1 foot equals 0.3048 meters.' },
    ]
  },
  // Temperature conversions
  {
    from: 'C',
    to: 'F',
    category: 'temperature',
    slug: 'c-to-f',
    title: 'Celsius to Fahrenheit — Fast °C to °F Converter | ConverterX',
    description: 'Convert Celsius to Fahrenheit instantly. Accurate °C to °F temperature conversion calculator.',
    faq: [
      { question: 'How to convert Celsius to Fahrenheit?', answer: 'Multiply Celsius by 9/5 and add 32 to get Fahrenheit.' },
      { question: 'What is 0°C in Fahrenheit?', answer: '0°C equals 32°F.' },
    ]
  },
  {
    from: 'F',
    to: 'C',
    category: 'temperature',
    slug: 'f-to-c',
    title: 'Fahrenheit to Celsius — Fast °F to °C Converter | ConverterX',
    description: 'Convert Fahrenheit to Celsius instantly. Accurate °F to °C temperature conversion calculator.',
    faq: [
      { question: 'How to convert Fahrenheit to Celsius?', answer: 'Subtract 32 from Fahrenheit and multiply by 5/9 to get Celsius.' },
    ]
  },
  // More popular pairs
  {
    from: 'km',
    to: 'mi',
    category: 'length',
    slug: 'km-to-mi',
    title: 'Kilometers to Miles — Fast KM to MI Converter | ConverterX',
    description: 'Convert kilometers to miles instantly. Accurate km to miles conversion calculator.',
  },
  {
    from: 'mi',
    to: 'km',
    category: 'length',
    slug: 'mi-to-km',
    title: 'Miles to Kilometers — Fast MI to KM Converter | ConverterX',
    description: 'Convert miles to kilometers instantly. Accurate miles to km conversion calculator.',
  },
  {
    from: 'cm',
    to: 'in',
    category: 'length',
    slug: 'cm-to-in',
    title: 'Centimeters to Inches — Fast CM to IN Converter | ConverterX',
    description: 'Convert centimeters to inches instantly. Accurate cm to inches conversion calculator.',
  },
  {
    from: 'in',
    to: 'cm',
    category: 'length',
    slug: 'in-to-cm',
    title: 'Inches to Centimeters — Fast IN to CM Converter | ConverterX',
    description: 'Convert inches to centimeters instantly. Accurate inches to cm conversion calculator.',
  },
  {
    from: 'L',
    to: 'gal',
    category: 'volume',
    slug: 'l-to-gal',
    title: 'Liters to Gallons — Fast L to GAL Converter | ConverterX',
    description: 'Convert liters to gallons (US) instantly. Accurate L to gal conversion calculator.',
  },
  {
    from: 'gal',
    to: 'L',
    category: 'volume',
    slug: 'gal-to-l',
    title: 'Gallons to Liters — Fast GAL to L Converter | ConverterX',
    description: 'Convert gallons (US) to liters instantly. Accurate gal to L conversion calculator.',
  },
  {
    from: 'g',
    to: 'oz',
    category: 'weight',
    slug: 'g-to-oz',
    title: 'Grams to Ounces — Fast G to OZ Converter | ConverterX',
    description: 'Convert grams to ounces instantly. Accurate g to oz weight conversion calculator.',
  },
  {
    from: 'oz',
    to: 'g',
    category: 'weight',
    slug: 'oz-to-g',
    title: 'Ounces to Grams — Fast OZ to G Converter | ConverterX',
    description: 'Convert ounces to grams instantly. Accurate oz to g weight conversion calculator.',
  },
  {
    from: 'kmh',
    to: 'mph',
    category: 'speed',
    slug: 'kmh-to-mph',
    title: 'KM/H to MPH — Fast Kilometers to Miles per Hour Converter | ConverterX',
    description: 'Convert km/h to mph instantly. Accurate speed conversion calculator.',
  },
  {
    from: 'mph',
    to: 'kmh',
    category: 'speed',
    slug: 'mph-to-kmh',
    title: 'MPH to KM/H — Fast Miles to Kilometers per Hour Converter | ConverterX',
    description: 'Convert mph to km/h instantly. Accurate speed conversion calculator.',
  },
];

// Conversion factors for all unit categories

export interface Unit {
  symbol: string;
  name: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  units: Record<string, Unit>;
}

// Length conversions (base: meter)
const lengthUnits: Record<string, Unit> = {
  m: { symbol: 'm', name: 'Meters', toBase: (v) => v, fromBase: (v) => v },
  km: { symbol: 'km', name: 'Kilometers', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  cm: { symbol: 'cm', name: 'Centimeters', toBase: (v) => v / 100, fromBase: (v) => v * 100 },
  mm: { symbol: 'mm', name: 'Millimeters', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  in: { symbol: 'in', name: 'Inches', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
  ft: { symbol: 'ft', name: 'Feet', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
  yd: { symbol: 'yd', name: 'Yards', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
  mi: { symbol: 'mi', name: 'Miles', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
};

// Area conversions (base: square meter)
const areaUnits: Record<string, Unit> = {
  m2: { symbol: 'm²', name: 'Square Meters', toBase: (v) => v, fromBase: (v) => v },
  cm2: { symbol: 'cm²', name: 'Square Centimeters', toBase: (v) => v / 10000, fromBase: (v) => v * 10000 },
  in2: { symbol: 'in²', name: 'Square Inches', toBase: (v) => v * 0.00064516, fromBase: (v) => v / 0.00064516 },
  ft2: { symbol: 'ft²', name: 'Square Feet', toBase: (v) => v * 0.092903, fromBase: (v) => v / 0.092903 },
  acre: { symbol: 'acre', name: 'Acres', toBase: (v) => v * 4046.856, fromBase: (v) => v / 4046.856 },
  hectare: { symbol: 'ha', name: 'Hectares', toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
};

// Volume conversions (base: liter)
const volumeUnits: Record<string, Unit> = {
  L: { symbol: 'L', name: 'Liters', toBase: (v) => v, fromBase: (v) => v },
  mL: { symbol: 'mL', name: 'Milliliters', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  m3: { symbol: 'm³', name: 'Cubic Meters', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  gal: { symbol: 'gal', name: 'Gallons (US)', toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
  qt: { symbol: 'qt', name: 'Quarts (US)', toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
  pt: { symbol: 'pt', name: 'Pints (US)', toBase: (v) => v * 0.473176, fromBase: (v) => v / 0.473176 },
  floz: { symbol: 'fl oz', name: 'Fluid Ounces (US)', toBase: (v) => v * 0.0295735, fromBase: (v) => v / 0.0295735 },
};

// Weight conversions (base: kilogram)
const weightUnits: Record<string, Unit> = {
  kg: { symbol: 'kg', name: 'Kilograms', toBase: (v) => v, fromBase: (v) => v },
  g: { symbol: 'g', name: 'Grams', toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
  mg: { symbol: 'mg', name: 'Milligrams', toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
  lb: { symbol: 'lb', name: 'Pounds', toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
  oz: { symbol: 'oz', name: 'Ounces', toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
  tonne: { symbol: 't', name: 'Metric Tonnes', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
};

// Temperature conversions (affine transformations)
const temperatureUnits: Record<string, Unit> = {
  C: { 
    symbol: '°C', 
    name: 'Celsius', 
    toBase: (v) => v, 
    fromBase: (v) => v 
  },
  F: { 
    symbol: '°F', 
    name: 'Fahrenheit', 
    toBase: (v) => (v - 32) * 5/9, 
    fromBase: (v) => (v * 9/5) + 32 
  },
  K: { 
    symbol: 'K', 
    name: 'Kelvin', 
    toBase: (v) => v - 273.15, 
    fromBase: (v) => v + 273.15 
  },
};

// Speed conversions (base: m/s)
const speedUnits: Record<string, Unit> = {
  ms: { symbol: 'm/s', name: 'Meters per Second', toBase: (v) => v, fromBase: (v) => v },
  kmh: { symbol: 'km/h', name: 'Kilometers per Hour', toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
  mph: { symbol: 'mph', name: 'Miles per Hour', toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
  knot: { symbol: 'knot', name: 'Knots', toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
};

// Time conversions (base: second)
const timeUnits: Record<string, Unit> = {
  s: { symbol: 's', name: 'Seconds', toBase: (v) => v, fromBase: (v) => v },
  min: { symbol: 'min', name: 'Minutes', toBase: (v) => v * 60, fromBase: (v) => v / 60 },
  h: { symbol: 'h', name: 'Hours', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
  day: { symbol: 'day', name: 'Days', toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
  week: { symbol: 'week', name: 'Weeks', toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
};

// Power conversions (base: watt)
const powerUnits: Record<string, Unit> = {
  W: { symbol: 'W', name: 'Watts', toBase: (v) => v, fromBase: (v) => v },
  kW: { symbol: 'kW', name: 'Kilowatts', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  hp: { symbol: 'hp', name: 'Horsepower (Metric)', toBase: (v) => v * 735.499, fromBase: (v) => v / 735.499 },
  btuh: { symbol: 'BTU/h', name: 'BTU per Hour', toBase: (v) => v * 0.293071, fromBase: (v) => v / 0.293071 },
};

// Energy conversions (base: joule)
const energyUnits: Record<string, Unit> = {
  J: { symbol: 'J', name: 'Joules', toBase: (v) => v, fromBase: (v) => v },
  kJ: { symbol: 'kJ', name: 'Kilojoules', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  Wh: { symbol: 'Wh', name: 'Watt-hours', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
  kWh: { symbol: 'kWh', name: 'Kilowatt-hours', toBase: (v) => v * 3600000, fromBase: (v) => v / 3600000 },
  cal: { symbol: 'cal', name: 'Calories', toBase: (v) => v * 4.184, fromBase: (v) => v / 4.184 },
  kcal: { symbol: 'kcal', name: 'Kilocalories', toBase: (v) => v * 4184, fromBase: (v) => v / 4184 },
  BTU: { symbol: 'BTU', name: 'British Thermal Units', toBase: (v) => v * 1055.06, fromBase: (v) => v / 1055.06 },
};

// Pressure conversions (base: pascal)
const pressureUnits: Record<string, Unit> = {
  Pa: { symbol: 'Pa', name: 'Pascals', toBase: (v) => v, fromBase: (v) => v },
  kPa: { symbol: 'kPa', name: 'Kilopascals', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  bar: { symbol: 'bar', name: 'Bars', toBase: (v) => v * 100000, fromBase: (v) => v / 100000 },
  atm: { symbol: 'atm', name: 'Atmospheres', toBase: (v) => v * 101325, fromBase: (v) => v / 101325 },
  psi: { symbol: 'psi', name: 'Pounds per Square Inch', toBase: (v) => v * 6894.76, fromBase: (v) => v / 6894.76 },
};

// Data conversions (base: byte, 1000-based)
const dataUnits: Record<string, Unit> = {
  bit: { symbol: 'bit', name: 'Bits', toBase: (v) => v / 8, fromBase: (v) => v * 8 },
  byte: { symbol: 'B', name: 'Bytes', toBase: (v) => v, fromBase: (v) => v },
  KB: { symbol: 'KB', name: 'Kilobytes', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  MB: { symbol: 'MB', name: 'Megabytes', toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
  GB: { symbol: 'GB', name: 'Gigabytes', toBase: (v) => v * 1000000000, fromBase: (v) => v / 1000000000 },
  TB: { symbol: 'TB', name: 'Terabytes', toBase: (v) => v * 1000000000000, fromBase: (v) => v / 1000000000000 },
};

export const categories: Category[] = [
  { id: 'length', name: 'Length', icon: 'Ruler', units: lengthUnits },
  { id: 'area', name: 'Area', icon: 'Square', units: areaUnits },
  { id: 'volume', name: 'Volume', icon: 'Droplet', units: volumeUnits },
  { id: 'weight', name: 'Weight', icon: 'Weight', units: weightUnits },
  { id: 'temperature', name: 'Temperature', icon: 'Thermometer', units: temperatureUnits },
  { id: 'speed', name: 'Speed', icon: 'Gauge', units: speedUnits },
  { id: 'time', name: 'Time', icon: 'Clock', units: timeUnits },
  { id: 'power', name: 'Power', icon: 'Zap', units: powerUnits },
  { id: 'energy', name: 'Energy', icon: 'Battery', units: energyUnits },
  { id: 'pressure', name: 'Pressure', icon: 'Wind', units: pressureUnits },
  { id: 'data', name: 'Data', icon: 'HardDrive', units: dataUnits },
];

export function convert(value: number, fromUnit: Unit, toUnit: Unit): number {
  const baseValue = fromUnit.toBase(value);
  return toUnit.fromBase(baseValue);
}

export function formatNumber(value: number, maxDecimals: number = 6): string {
  if (!isFinite(value)) return '0';
  
  // For very small or very large numbers, use exponential
  if (Math.abs(value) < 0.000001 && value !== 0) {
    return value.toExponential(4);
  }
  if (Math.abs(value) > 1000000000) {
    return value.toExponential(4);
  }
  
  // Remove trailing zeros
  const rounded = parseFloat(value.toFixed(maxDecimals));
  return rounded.toString();
}

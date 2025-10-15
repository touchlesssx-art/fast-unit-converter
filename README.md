# ConverterX - Fast & Accurate Unit Converter

> **Convert anything. Instantly.** 

ConverterX is a production-ready, blazing-fast unit converter optimized for mobile devices with SEO best practices, PWA support, and Google Analytics integration.

![ConverterX Logo](src/assets/logo.png)

## ✨ Features

- **11 Conversion Categories**: Length, Area, Volume, Weight, Temperature, Speed, Time, Power, Energy, Pressure, and Data
- **Mobile-First Design**: Numeric keyboard support with `inputmode="decimal"` for seamless mobile experience
- **SEO Optimized**: Static routes for popular conversions with proper meta tags and JSON-LD structured data
- **PWA Ready**: Installable with offline support via service worker
- **Fast & Lightweight**: <50KB JavaScript payload, optimized for performance
- **Recent & Favorites**: LocalStorage-based conversion history and favorites
- **GA4 Analytics**: Event tracking for conversions, swaps, and copies
- **Clean Design**: Modern UI with Tailwind CSS and custom design system

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Local Development

```bash
# Clone the repository
git clone <your-repo-url>
cd converterx

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

### Build for Production

```bash
# Create optimized build
npm run build

# Preview production build
npm run preview
```

## 📦 Deployment to Vercel

### Option 1: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: Via Vercel Dashboard

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect the build settings
6. Click "Deploy"

### Build Settings (auto-detected)
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## 🔧 Configuration

### Google Analytics

Replace the placeholder GA4 measurement ID in `index.html`:

```html
<!-- Line 31 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA4-ID"></script>
```

Also update in `src/utils/analytics.ts`:

```typescript
export const GA_MEASUREMENT_ID = 'YOUR-GA4-ID';
```

### Domain & SEO

Update the following files with your actual domain:

- `public/sitemap.xml` - Replace `https://converterx.app` with your domain
- `index.html` - Update canonical URL (line 10)
- Social meta tags in `index.html`

### PWA Configuration

The PWA is pre-configured with:
- Manifest: `public/site.webmanifest`
- Service Worker: `public/sw.js`
- Icons: `public/logo-192.png` and `public/logo-512.png`

To customize:
1. Edit `public/site.webmanifest` for app name and colors
2. Replace logo files with your branding
3. Update theme color in `index.html` (line 9)

## 🧮 Adding New Converters

### 1. Add Units to Category

Edit `src/converters/conversionFactors.ts`:

```typescript
const newCategoryUnits: Record<string, Unit> = {
  unit1: {
    symbol: 'u1',
    name: 'Unit One',
    toBase: (v) => v,           // Convert to base unit
    fromBase: (v) => v          // Convert from base unit
  },
  unit2: {
    symbol: 'u2',
    name: 'Unit Two',
    toBase: (v) => v * 1.5,
    fromBase: (v) => v / 1.5
  },
};
```

### 2. Add Category

```typescript
export const categories: Category[] = [
  // ... existing categories
  { id: 'newcategory', name: 'New Category', icon: 'IconName', units: newCategoryUnits },
];
```

### 3. Add SEO Route (Optional)

For popular pairs, add to `src/converters/popularPairs.ts`:

```typescript
{
  from: 'unit1',
  to: 'unit2',
  category: 'newcategory',
  slug: 'unit1-to-unit2',
  title: 'Unit1 to Unit2 Converter | ConverterX',
  description: 'Convert unit1 to unit2 instantly.',
  faq: [
    { question: 'How many unit2 in a unit1?', answer: '1 unit1 equals 1.5 unit2.' }
  ]
}
```

Then add the route to `public/sitemap.xml`.

## 📱 QA Checklist

Before deployment, verify:

- [ ] Numeric keyboard appears on mobile devices (iOS & Android)
- [ ] All unit conversions are mathematically correct
- [ ] Temperature conversions (C↔F↔K) verified with test values
- [ ] Swap, Copy, Recent, and Favorites work correctly
- [ ] SEO meta tags render on all pages
- [ ] PWA installs successfully (test on mobile)
- [ ] Service worker caches pages for offline access
- [ ] GA4 events fire correctly (check in GA4 Real-Time)
- [ ] Lighthouse scores: Performance >95, SEO >95, Best Practices >95, Accessibility >95

## 🔍 Testing Conversions

Run unit tests for critical conversions:

```bash
# Temperature (affine transformations)
# 0°C = 32°F = 273.15K
# 100°C = 212°F = 373.15K

# Weight
# 1 kg = 2.20462 lb
# 1 lb = 0.453592 kg
```

## 📚 Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Custom Design System
- **UI Components**: Shadcn/ui (Radix UI)
- **Routing**: React Router v6
- **Analytics**: Google Analytics 4
- **PWA**: Service Worker + Web Manifest

## 🎨 Design System

The design system is defined in:
- `src/index.css` - CSS custom properties (HSL colors)
- `tailwind.config.ts` - Tailwind theme extension

Color palette:
- Primary: Indigo (`hsl(239 84% 67%)`)
- Background: Slate (`hsl(216 33% 97%)`)
- Gradients: Custom gradients via CSS variables

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 📧 Contact

For questions or support:
- Email: contact.converterx@gmail.com
- Website: https://converterx.app

---

**Built with ❤️ using Lovable.dev**

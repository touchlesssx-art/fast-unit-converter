# ConverterX Deployment Guide

This guide covers deploying ConverterX to Vercel (recommended) and other platforms.

## Prerequisites

- Node.js 16+ installed
- Git repository (GitHub recommended)
- Vercel account (free tier available)

## Vercel Deployment (Recommended)

Vercel is the recommended platform for deploying ConverterX due to its:
- Automatic CI/CD from Git
- Edge network for fast global delivery
- Free SSL certificates
- Zero configuration for Vite projects

### Method 1: GitHub Integration (Easiest)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects build settings (no config needed!)
   - Click "Deploy"

3. **Done!** Your app will be live at `your-project.vercel.app`

### Method 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy from project directory
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Link to existing project? No
# - Project name: converterx (or your choice)
# - Directory: ./ (current directory)
# - Override settings? No

# Production deployment
vercel --prod
```

### Custom Domain on Vercel

1. Go to Project Settings → Domains
2. Add your domain (e.g., `converterx.com`)
3. Follow DNS configuration instructions
4. Update these files with your domain:
   - `index.html` - canonical URL
   - `public/sitemap.xml` - all URLs
   - Social meta tags

## Other Platforms

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

Or use Netlify's GitHub integration (similar to Vercel).

### GitHub Pages

Not recommended for ConverterX due to lack of:
- Server-side routing (breaks direct navigation to `/convert/kg-to-lb`)
- Easy custom domain SSL

If you must use GitHub Pages:
1. Update `vite.config.ts` to set base path
2. Use HashRouter instead of BrowserRouter
3. Deploy with `gh-pages` package

### Self-Hosting (Node.js Server)

```bash
# Build the app
npm run build

# Serve with a static file server
npm install -g serve
serve -s dist -l 3000
```

For production, use:
- **Nginx** or **Apache** as reverse proxy
- **PM2** to manage Node process
- **Let's Encrypt** for SSL

## Post-Deployment Checklist

### 1. Set Google Analytics ID

Replace placeholder in:
- `index.html` (line 31-36)
- `src/utils/analytics.ts`

```typescript
export const GA_MEASUREMENT_ID = 'G-YOUR-ACTUAL-ID';
```

### 2. Update Domain References

- `public/sitemap.xml` - Replace `https://converterx.app`
- `index.html` - Update canonical URL (line 10)
- Open Graph URLs (line 16)

### 3. Verify PWA Installation

Test on mobile:
1. Open your deployed URL
2. Look for "Add to Home Screen" prompt
3. Install and verify offline functionality
4. Check icons display correctly

### 4. Submit Sitemap to Search Engines

**Google Search Console:**
1. Add property (your domain)
2. Verify ownership
3. Submit `https://yourdomain.com/sitemap.xml`

**Bing Webmaster Tools:**
1. Add site
2. Submit sitemap

### 5. Test Analytics

1. Open deployed site
2. Perform conversions
3. Check GA4 Real-Time reports
4. Verify custom events appear:
   - `conversion_performed`
   - `unit_swapped`
   - `result_copied`
   - `favorite_toggled`

### 6. Run Lighthouse Audit

```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Run audit
lighthouse https://your-domain.com --view
```

Target scores:
- Performance: >95
- Accessibility: >95
- Best Practices: >95
- SEO: >95

### 7. Test Mobile Experience

- Test on iOS Safari (numeric keyboard for inputs)
- Test on Android Chrome
- Verify conversions work correctly
- Test offline mode (disable network after first load)

## Environment Variables

ConverterX doesn't require environment variables for basic functionality. However, for advanced features:

### Vercel Environment Variables

Add in Project Settings → Environment Variables:

```
GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Then update code to use:

```typescript
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
```

## Performance Optimization

Already included in ConverterX:
- ✅ Code splitting via React.lazy (ready for future expansion)
- ✅ Asset optimization (Vite handles this)
- ✅ Minimal JavaScript bundle (<50KB)
- ✅ Service Worker for caching
- ✅ Optimized images

Additional optimizations for high traffic:
- Use Vercel Analytics for deeper insights
- Enable Vercel Edge Caching
- Consider CDN for assets (if self-hosting)

## Monitoring

### Recommended Tools

1. **Google Analytics 4** - User behavior and conversions
2. **Vercel Analytics** - Web Vitals and performance
3. **Google Search Console** - SEO and indexing status
4. **Sentry** (optional) - Error tracking

### Key Metrics to Monitor

- Page load time (target: <2s)
- Conversion completion rate
- Most popular unit pairs
- Mobile vs desktop usage
- Geographic distribution

## Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Routes Not Working

Ensure platform supports SPA routing:
- **Vercel**: Automatic (no config needed)
- **Netlify**: Add `_redirects` file
- **Others**: Configure server for SPA

### Service Worker Not Updating

Clear cache or bump version in `public/sw.js`:

```javascript
const CACHE_NAME = 'converterx-v2'; // Increment version
```

### Analytics Not Firing

1. Check browser console for errors
2. Verify GA4 ID is correct
3. Disable ad blockers for testing
4. Check GA4 real-time reports

## Support

For deployment issues:
- Email: contact.converterx@gmail.com
- Check Vercel documentation: https://vercel.com/docs
- Review Vite deployment guide: https://vitejs.dev/guide/static-deploy.html

---

**Happy Deploying! 🚀**

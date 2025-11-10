# Deployment Guide

This project is designed for easy deployment to various static hosting platforms.

## GitHub Pages (Recommended)

### Method 1: Direct Deployment
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select your branch (e.g., `main` or `copilot/improve-user-interface`)
4. Click **Save**
5. Your site will be available at `https://[username].github.io/Pfd/`

### Method 2: GitHub Actions (Automated)
A `.github/workflows/deploy.yml` file is included for automatic deployment:
- Pushes to the main branch automatically deploy to GitHub Pages
- No manual steps required after initial setup

**Initial Setup:**
1. Go to Settings → Pages
2. Under "Source", select "GitHub Actions"
3. Push to your main branch
4. Deployment happens automatically!

## Netlify

### Deploy Button
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/MillionthOdin16/Pfd)

### Manual Deployment
1. Sign up at [netlify.com](https://www.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub and select this repository
4. Build settings:
   - **Build command:** (leave empty)
   - **Publish directory:** `.` (root)
5. Click "Deploy site"

### Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=.
```

## Vercel

### Deploy Button
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/MillionthOdin16/Pfd)

### Manual Deployment
1. Sign up at [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub
4. Configure:
   - **Framework Preset:** Other
   - **Build Command:** (leave empty)
   - **Output Directory:** `.` (root)
5. Click "Deploy"

### Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

## Cloudflare Pages

1. Sign up at [pages.cloudflare.com](https://pages.cloudflare.com)
2. Click "Create a project"
3. Connect to GitHub
4. Configure:
   - **Build command:** (leave empty)
   - **Build output directory:** `/`
5. Click "Save and Deploy"

## Azure Static Web Apps

1. Sign in to [Azure Portal](https://portal.azure.com)
2. Create a new "Static Web App"
3. Connect to GitHub
4. Configure:
   - **Build Presets:** Custom
   - **App location:** `/`
   - **Output location:** `/`
5. Review and create

## Custom Domain Setup

### GitHub Pages
1. In repository Settings → Pages
2. Enter your custom domain
3. Add DNS records at your domain provider:
   ```
   Type: CNAME
   Name: www
   Value: [username].github.io
   ```

### Netlify / Vercel
1. Go to Domain settings in your dashboard
2. Add custom domain
3. Follow the DNS configuration instructions provided

## Environment Configuration

### CORS Considerations
- The app fetches data from `plasticfantasticdeals.com`
- This works fine when deployed online
- For local testing, use Demo Mode (see `QUICK_START.md`)

### API Endpoints
- No changes needed for deployment
- The API base URL is already configured in `app.js`
- All API calls use HTTPS

## Testing Your Deployment

After deployment, test these features:
1. ✅ Page loads without errors
2. ✅ Deals are fetched from the API
3. ✅ Search works
4. ✅ Filters work (Category, Store)
5. ✅ Sorting works
6. ✅ View toggle (Grid/List) works
7. ✅ Images load properly
8. ✅ Links to deals work
9. ✅ "Load More" loads additional deals
10. ✅ Responsive design on mobile

## Troubleshooting

### Deals Not Loading After Deployment
- Check browser console for errors
- Verify the API endpoint is accessible
- Ensure HTTPS is being used (not HTTP)

### 404 Errors on GitHub Pages
- Ensure `index.html` is in the root directory
- Check that the branch is correctly set in Settings → Pages

### Slow Loading
- GitHub Pages/Netlify/Vercel all use CDNs for fast delivery
- First load may be slower; subsequent loads are cached

## Performance Optimization (Optional)

For production deployments, consider:

1. **Enable Caching Headers** (configured in `netlify.toml` or `vercel.json`)
2. **Compress Assets** (most platforms do this automatically)
3. **CDN Integration** (built-in for GitHub Pages, Netlify, Vercel)

## Monitoring

### Netlify
- Built-in analytics available in dashboard
- Form submissions tracked
- Bandwidth usage monitored

### Vercel
- Analytics available with Pro plan
- Real-time performance monitoring

### Google Analytics (Optional)
To add analytics, insert this before `</head>` in `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

## Continuous Deployment

All platforms support automatic deployment:
- Push to your repository
- Deployment happens automatically
- No manual intervention needed

---

**Your site is ready for deployment! Choose your preferred platform and go live in minutes! 🚀**

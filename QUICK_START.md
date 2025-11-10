# Quick Start Guide - Enhanced UI

## Getting Started

### Option 1: Open Directly in Browser
1. Download or clone this repository
2. Open `index.html` in your web browser
3. **Note:** You may encounter CORS errors - see Option 2 or 3

### Option 2: Use Demo Mode (Recommended for Testing)
1. Open `app.js` in a text editor
2. Change line 4 from `const DEMO_MODE = false;` to `const DEMO_MODE = true;`
3. Save the file
4. Open `index.html` in your browser
5. You'll see sample deals without needing internet connectivity

### Option 3: Use a Local Web Server (Best Experience)
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## Using the Interface

### Search
- Type in the search box at the top
- Search works across deal titles, descriptions, and content
- Results update as you type (with a small delay)

### Filter by Category
- Use the "Category" dropdown to filter deals
- Options include: FDM, Resin Printers, Filament, Parts, etc.

### Filter by Store
- Use the "Store" dropdown to filter by retailer
- Options include: eBay, Amazon, AliExpress, etc.

### Sort Deals
- "Newest First" - Most recent deals appear first
- "Oldest First" - Older deals appear first
- "Title A-Z" - Alphabetical order
- "Title Z-A" - Reverse alphabetical order

### View Modes
- **Grid View** (⊞) - Cards in a responsive grid layout
- **List View** (☰) - Detailed list with larger images

### Quick Links
- Click any of the category buttons (FDM Printers, Resin Printers, etc.)
- Instantly filter to that category

### Load More
- Scroll to the bottom
- Click "Load More Deals" to fetch additional deals
- Continues until all available deals are loaded

## Tips

1. **Combine Filters** - Use category, store, and search together for precise results
2. **Bookmark Searches** - The filters don't change the URL, but you can easily recreate your favorite searches
3. **Mobile Friendly** - Works great on phones and tablets
4. **Refresh Data** - Click the "🔄 Refresh" button to reload deals

## Troubleshooting

### "Failed to load deals" Error
- Enable Demo Mode (see Option 2 above)
- Or use a local web server (see Option 3 above)
- Check your internet connection
- Try clicking "Retry"

### Images Not Loading
- Some deals may not have images
- Placeholder images will show for missing images
- Check if images are blocked by browser extensions

### Slow Performance
- Try reducing the number of deals loaded per page
- Edit `app.js` line 3: Change `POSTS_PER_PAGE` to a smaller number
- Clear your browser cache

## Deployment

### GitHub Pages
1. Push to GitHub
2. Go to Settings → Pages
3. Select branch and save
4. Your site will be at `https://username.github.io/Pfd/`

### Netlify
1. Connect GitHub repository
2. No build settings needed
3. Deploy

### Vercel
1. Import from GitHub
2. Framework: "Other"
3. Deploy

## Advanced Configuration

Edit `app.js` to customize:

```javascript
// Number of deals per page
const POSTS_PER_PAGE = 12;

// Enable/disable demo mode
const DEMO_MODE = false;

// Search delay (milliseconds)
debounce(handleSearch, 500) // Change 500 to your preference
```

Edit `styles.css` to customize colors:

```css
:root {
    --primary-color: #2563eb;  /* Change brand color */
    --primary-dark: #1d4ed8;   /* Hover color */
    /* ... more color variables ... */
}
```

## Support

For issues or questions:
1. Check the main README.md
2. Review the Troubleshooting section
3. Open an issue on GitHub

---

**Enjoy finding amazing deals! 🎉**

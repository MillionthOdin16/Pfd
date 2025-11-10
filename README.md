# Plastic Fantastic Deals - Enhanced UI

A modern, responsive single-page application (SPA) that provides an improved user interface for browsing deals from [plasticfantasticdeals.com](https://plasticfantasticdeals.com/).

## 🎯 Purpose

This project enhances the user experience of Plastic Fantastic Deals, a website dedicated to finding the best deals on 3D printing equipment, filament, resin, and accessories. The enhanced UI offers:

- **Better Navigation**: Intuitive category and store filtering
- **Improved Search**: Real-time search across all deals
- **Flexible Sorting**: Sort by date, title, or price
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Multiple View Modes**: Switch between grid and list layouts
- **Modern Interface**: Clean, card-based design with smooth animations

## ✨ Features

### Core Functionality
- **Real-time Search**: Search across deal titles, descriptions, and content
- **Advanced Filtering**: Filter by category (3D Printers, Filament, Resin, Parts, etc.) and store (eBay, Amazon, etc.)
- **Flexible Sorting**: Sort deals by newest, oldest, or alphabetically
- **Pagination**: Load more deals on demand
- **Responsive Grid/List Views**: Toggle between card grid and detailed list layouts

### User Experience Enhancements
- **Visual Design**: Modern card-based layout with hover effects and smooth animations
- **Loading States**: Clear feedback during data loading
- **Error Handling**: Graceful error messages with retry options
- **Quick Links**: One-click access to popular categories
- **Deal Metadata**: Display price, store, category, and posting date
- **External Links**: Direct links to deals on retailer websites

### Technical Features
- **WordPress REST API Integration**: Fetches live data from plasticfantasticdeals.com
- **Client-side Filtering**: Fast, responsive filtering without page reloads
- **Debounced Search**: Optimized search performance
- **Lazy Loading**: Images load as needed to improve performance
- **Semantic HTML**: Accessible and SEO-friendly markup

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required - pure HTML, CSS, and JavaScript

### Installation

1. Clone or download this repository:
   ```bash
   git clone https://github.com/MillionthOdin16/Pfd.git
   cd Pfd
   ```

2. Open `index.html` in your web browser:
   ```bash
   # On macOS
   open index.html
   
   # On Linux
   xdg-open index.html
   
   # On Windows
   start index.html
   ```

   Or use a local web server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx serve
   ```

3. Navigate to `http://localhost:8000` (if using a local server)

### Deployment

#### GitHub Pages
1. Push the code to your GitHub repository
2. Go to Settings → Pages
3. Select the branch to deploy (e.g., `main`)
4. Your site will be available at `https://username.github.io/Pfd/`

#### Netlify
1. Connect your GitHub repository to Netlify
2. No build commands needed - just point to the root directory
3. Deploy automatically on every push

#### Vercel
1. Import your GitHub repository
2. Framework preset: "Other"
3. Deploy with default settings

## 📁 Project Structure

```
Pfd/
├── index.html      # Main HTML structure
├── styles.css      # All CSS styles and responsive design
├── app.js          # JavaScript application logic
└── README.md       # This file
```

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2563eb;      /* Main brand color */
    --primary-dark: #1d4ed8;       /* Darker shade for hover states */
    --secondary-color: #10b981;    /* Accent color */
    --danger-color: #ef4444;       /* Error/warning color */
    /* ... more variables ... */
}
```

### Adjusting Layout

- **Grid columns**: Modify `.deals-grid.grid-view` in `styles.css`
- **Card spacing**: Adjust gap values in `.deals-grid`
- **Font sizes**: Update font-size values in respective classes

### Changing Data Source

To use a different WordPress site, update the API_BASE constant in `app.js`:

```javascript
const API_BASE = 'https://your-wordpress-site.com/wp-json/wp/v2';
```

## 🔧 Configuration

### Demo Mode (Testing Without API)

To test the application with mock data without connecting to the live API:

1. Open `app.js`
2. Change `const DEMO_MODE = false;` to `const DEMO_MODE = true;`
3. Save and reload the page

This is useful for:
- Local testing without internet
- Development and customization
- Understanding the UI without CORS issues

### Items Per Page

Adjust the number of deals loaded per page in `app.js`:

```javascript
const POSTS_PER_PAGE = 12; // Change to your preferred number
```

### Search Debounce Time

Modify the search delay in `app.js`:

```javascript
elements.searchInput.addEventListener('input', debounce(handleSearch, 500)); // 500ms delay
```

## 🌐 API Integration

This application uses the WordPress REST API v2:

### Endpoints Used

- `GET /wp-json/wp/v2/posts` - Fetch deals
- `GET /wp-json/wp/v2/categories` - Fetch categories
- `GET /wp-json/wp/v2/dealstore` - Fetch stores (custom taxonomy)

### Data Retrieved

Each deal includes:
- Title and content
- Featured image
- Category tags
- Store information
- Publication date
- External store links

## 📱 Responsive Breakpoints

- **Desktop**: > 768px (Multi-column grid)
- **Tablet**: 480px - 768px (2-column grid)
- **Mobile**: < 480px (Single column)

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ⚡ Performance

- **Lazy Image Loading**: Images load as they enter the viewport
- **Debounced Search**: Reduces API calls during typing
- **Client-side Filtering**: Fast filtering without server requests
- **Optimized Animations**: GPU-accelerated CSS transforms
- **Minimal Dependencies**: No external libraries required

## 🐛 Troubleshooting

### CORS Issues (Cross-Origin Resource Sharing)

If you encounter CORS errors when opening the HTML file directly in your browser:

1. **Use Demo Mode**: Edit `app.js` and change `DEMO_MODE = false` to `DEMO_MODE = true` to use mock data
2. **Use a Local Server**: Always run the app through a web server (see Installation section)
3. **Browser Extensions**: Some ad blockers or privacy extensions may block API requests
4. **Deploy Online**: The app works best when deployed to a web host (GitHub Pages, Netlify, Vercel)

### Deals Not Loading

1. Check browser console for errors
2. Verify the API endpoint is accessible
3. Enable Demo Mode for testing: Set `DEMO_MODE = true` in `app.js`
4. Try the "Refresh" button

### Images Not Displaying

- Some deals may not have images
- Placeholder images are shown for missing images
- Check network tab for blocked image requests

### Filters Not Working

1. Clear browser cache
2. Check if categories/stores loaded successfully
3. Try resetting all filters

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is provided as-is for educational and personal use.

## 🙏 Acknowledgments

- Data provided by [plasticfantasticdeals.com](https://plasticfantasticdeals.com/)
- Built with vanilla JavaScript, HTML5, and CSS3
- Icons: Unicode emoji characters

## 📧 Contact

For questions or feedback about this enhanced UI, please open an issue on GitHub.

---

**Note**: This is an unofficial enhanced UI for plasticfantasticdeals.com. It uses publicly available data from their WordPress REST API. All deal information and links belong to their respective owners.
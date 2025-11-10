// Plastic Fantastic Deals - Enhanced UI Application
// API Configuration
const API_BASE = 'https://plasticfantasticdeals.com/wp-json/wp/v2';
const POSTS_PER_PAGE = 12;
const DEMO_MODE = false; // Set to true to use mock data instead of live API

// Application State
const state = {
    posts: [],
    filteredPosts: [],
    categories: [],
    stores: [],
    currentPage: 1,
    totalPages: 1,
    isLoading: false,
    currentView: 'grid',
    filters: {
        search: '',
        category: '',
        store: '',
        sortBy: 'date-desc'
    }
};

// DOM Elements
const elements = {
    searchInput: document.getElementById('searchInput'),
    searchBtn: document.getElementById('searchBtn'),
    categoryFilter: document.getElementById('categoryFilter'),
    storeFilter: document.getElementById('storeFilter'),
    sortBy: document.getElementById('sortBy'),
    gridViewBtn: document.getElementById('gridViewBtn'),
    listViewBtn: document.getElementById('listViewBtn'),
    dealsGrid: document.getElementById('dealsGrid'),
    loadingState: document.getElementById('loadingState'),
    errorState: document.getElementById('errorState'),
    resultsCount: document.getElementById('resultsCount'),
    loadMoreBtn: document.getElementById('loadMoreBtn'),
    refreshBtn: document.getElementById('refreshBtn'),
    retryBtn: document.getElementById('retryBtn')
};

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function extractPrice(content) {
    // Try to extract price from content
    const priceMatch = content.match(/\$[\d,]+\.?\d{0,2}/);
    return priceMatch ? priceMatch[0] : null;
}

function extractImageUrl(content) {
    // Extract image URL from content
    const imgMatch = content.match(/src="([^"]+)"/);
    if (imgMatch && imgMatch[1]) {
        return imgMatch[1];
    }
    return 'https://via.placeholder.com/400x300?text=No+Image';
}

function extractStoreLink(content) {
    // Extract external store link
    const linkMatch = content.match(/href="([^"]+)"/);
    return linkMatch ? linkMatch[1] : null;
}

function stripHtml(html) {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

// Mock Data for Demo Mode
const MOCK_DATA = {
    posts: [
        {
            id: 1,
            title: { rendered: "ANYCUBIC Kobra 3 Combo - High Speed 3D Printer" },
            content: { rendered: '<div class="price">$299.99</div><a href="https://example.com/deal1">Buy Now</a><img src="https://via.placeholder.com/400x300?text=3D+Printer" />' },
            excerpt: { rendered: "High-speed FDM 3D printer with auto-leveling and dual extruders. Perfect for beginners and professionals." },
            date: "2025-11-10T10:30:00",
            link: "https://plasticfantasticdeals.com/deal1",
            categories: [92],
            dealstore: [167],
            _embedded: {
                'wp:term': [[{ id: 92, name: "FDM" }], [{ id: 167, name: "eBay" }]]
            }
        },
        {
            id: 2,
            title: { rendered: "ELEGOO Mars 4 Ultra - 9K Resin Printer" },
            content: { rendered: '<div class="price">$349.99</div><a href="https://example.com/deal2">Buy Now</a><img src="https://via.placeholder.com/400x300?text=Resin+Printer" />' },
            excerpt: { rendered: "Ultra-high resolution 9K mono LCD resin 3D printer with lightning-fast printing speeds." },
            date: "2025-11-09T15:20:00",
            link: "https://plasticfantasticdeals.com/deal2",
            categories: [93],
            dealstore: [168],
            _embedded: {
                'wp:term': [[{ id: 93, name: "Resin" }], [{ id: 168, name: "Amazon" }]]
            }
        },
        {
            id: 3,
            title: { rendered: "PLA Filament Bundle - 10 Colors" },
            content: { rendered: '<div class="price">$89.99</div><a href="https://example.com/deal3">Buy Now</a><img src="https://via.placeholder.com/400x300?text=Filament" />' },
            excerpt: { rendered: "Premium PLA filament bundle with 10 vibrant colors, 1kg each spool. Perfect for hobbyists." },
            date: "2025-11-09T09:45:00",
            link: "https://plasticfantasticdeals.com/deal3",
            categories: [94],
            dealstore: [168],
            _embedded: {
                'wp:term': [[{ id: 94, name: "Filament" }], [{ id: 168, name: "Amazon" }]]
            }
        },
        {
            id: 4,
            title: { rendered: "Creality Ender 3 V3 SE - Budget Friendly" },
            content: { rendered: '<div class="price">$199.99</div><a href="https://example.com/deal4">Buy Now</a><img src="https://via.placeholder.com/400x300?text=Ender+3" />' },
            excerpt: { rendered: "Affordable and reliable FDM printer with auto-leveling. Great for beginners on a budget." },
            date: "2025-11-08T14:15:00",
            link: "https://plasticfantasticdeals.com/deal4",
            categories: [92],
            dealstore: [167],
            _embedded: {
                'wp:term': [[{ id: 92, name: "FDM" }], [{ id: 167, name: "eBay" }]]
            }
        },
        {
            id: 5,
            title: { rendered: "SUNLU Water Washable Resin - 2kg" },
            content: { rendered: '<div class="price">$45.99</div><a href="https://example.com/deal5">Buy Now</a><img src="https://via.placeholder.com/400x300?text=Resin" />' },
            excerpt: { rendered: "Easy-to-use water washable resin in multiple colors. No isopropyl alcohol needed!" },
            date: "2025-11-08T11:30:00",
            link: "https://plasticfantasticdeals.com/deal5",
            categories: [95],
            dealstore: [168],
            _embedded: {
                'wp:term': [[{ id: 95, name: "Resin" }], [{ id: 168, name: "Amazon" }]]
            }
        },
        {
            id: 6,
            title: { rendered: "All-Metal Hotend Upgrade Kit" },
            content: { rendered: '<div class="price">$29.99</div><a href="https://example.com/deal6">Buy Now</a><img src="https://via.placeholder.com/400x300?text=Hotend" />' },
            excerpt: { rendered: "Premium all-metal hotend for high-temp filaments. Compatible with most Creality printers." },
            date: "2025-11-07T16:00:00",
            link: "https://plasticfantasticdeals.com/deal6",
            categories: [96],
            dealstore: [167],
            _embedded: {
                'wp:term': [[{ id: 96, name: "Parts" }], [{ id: 167, name: "eBay" }]]
            }
        }
    ],
    categories: [
        { id: 92, name: "FDM", count: 50 },
        { id: 93, name: "Resin Printers", count: 30 },
        { id: 94, name: "Filament", count: 75 },
        { id: 95, name: "Resin", count: 40 },
        { id: 96, name: "Parts", count: 60 }
    ],
    stores: [
        { id: 167, name: "eBay", count: 45 },
        { id: 168, name: "Amazon", count: 85 },
        { id: 169, name: "AliExpress", count: 30 }
    ]
};

// API Functions
async function fetchPosts(page = 1) {
    if (DEMO_MODE) {
        // Return mock data in demo mode
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    posts: MOCK_DATA.posts,
                    totalPages: 1
                });
            }, 500);
        });
    }
    
    try {
        const response = await fetch(
            `${API_BASE}/posts?per_page=${POSTS_PER_PAGE}&page=${page}&_embed`
        );
        
        const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || 1);
        const posts = await response.json();
        
        return { posts, totalPages };
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

async function fetchCategories() {
    if (DEMO_MODE) {
        return new Promise(resolve => {
            setTimeout(() => resolve(MOCK_DATA.categories), 300);
        });
    }
    
    try {
        const response = await fetch(`${API_BASE}/categories?per_page=100`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

async function fetchStores() {
    if (DEMO_MODE) {
        return new Promise(resolve => {
            setTimeout(() => resolve(MOCK_DATA.stores), 300);
        });
    }
    
    try {
        // Fetch custom taxonomy for stores (dealstore)
        const response = await fetch(`${API_BASE}/dealstore?per_page=100`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching stores:', error);
        return [];
    }
}

// Render Functions
function renderDealCard(post) {
    const content = post.content?.rendered || '';
    const excerpt = post.excerpt?.rendered || '';
    const price = extractPrice(content);
    const imageUrl = extractImageUrl(content);
    const storeLink = extractStoreLink(content);
    const cleanExcerpt = stripHtml(excerpt).trim();
    
    // Get category name
    let categoryName = '';
    if (post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][0]) {
        const terms = post._embedded['wp:term'][0];
        if (terms.length > 0) {
            categoryName = terms[0].name;
        }
    }
    
    // Get store name
    let storeName = '';
    if (post._embedded && post._embedded['wp:term'] && post._embedded['wp:term'][1]) {
        const stores = post._embedded['wp:term'][1];
        if (stores.length > 0) {
            storeName = stores[0].name;
        }
    }
    
    const card = document.createElement('article');
    card.className = 'deal-card';
    card.innerHTML = `
        <div class="deal-image-container">
            <img src="${imageUrl}" alt="${post.title?.rendered || 'Deal'}" class="deal-image" loading="lazy">
            ${storeName ? `<span class="deal-badge">${storeName}</span>` : ''}
        </div>
        <div class="deal-content">
            <div class="deal-header">
                <h2 class="deal-title">${post.title?.rendered || 'Untitled Deal'}</h2>
                <div class="deal-meta">
                    ${categoryName ? `<span class="deal-category">📦 ${categoryName}</span>` : ''}
                    ${storeName ? `<span class="deal-store">🏪 ${storeName}</span>` : ''}
                </div>
            </div>
            ${price ? `<div class="deal-price">${price}</div>` : ''}
            ${cleanExcerpt ? `<p class="deal-excerpt">${cleanExcerpt}</p>` : ''}
            <div class="deal-footer">
                <span class="deal-date">📅 ${formatDate(post.date)}</span>
                ${storeLink ? `
                    <a href="${storeLink}" target="_blank" rel="noopener noreferrer" class="deal-btn">
                        View Deal →
                    </a>
                ` : `
                    <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="deal-btn">
                        View Details →
                    </a>
                `}
            </div>
        </div>
    `;
    
    return card;
}

function renderDeals() {
    elements.dealsGrid.innerHTML = '';
    
    if (state.filteredPosts.length === 0) {
        elements.dealsGrid.innerHTML = `
            <div class="error-state">
                <p>😢 No deals found matching your criteria.</p>
                <p style="font-size: 1rem; color: var(--text-secondary);">Try adjusting your filters or search terms.</p>
            </div>
        `;
        return;
    }
    
    state.filteredPosts.forEach(post => {
        const card = renderDealCard(post);
        elements.dealsGrid.appendChild(card);
    });
    
    updateResultsCount();
}

function updateResultsCount() {
    const count = state.filteredPosts.length;
    const total = state.posts.length;
    
    if (count === total) {
        elements.resultsCount.textContent = `Showing ${count} deal${count !== 1 ? 's' : ''}`;
    } else {
        elements.resultsCount.textContent = `Showing ${count} of ${total} deal${total !== 1 ? 's' : ''}`;
    }
}

function populateFilters() {
    // Populate category filter
    elements.categoryFilter.innerHTML = '<option value="">All Categories</option>';
    state.categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        elements.categoryFilter.appendChild(option);
    });
    
    // Populate store filter
    elements.storeFilter.innerHTML = '<option value="">All Stores</option>';
    state.stores.forEach(store => {
        const option = document.createElement('option');
        option.value = store.id;
        option.textContent = store.name;
        elements.storeFilter.appendChild(option);
    });
}

// Filter and Sort Functions
function applyFilters() {
    let filtered = [...state.posts];
    
    // Search filter
    if (state.filters.search) {
        const searchLower = state.filters.search.toLowerCase();
        filtered = filtered.filter(post => {
            const title = post.title?.rendered?.toLowerCase() || '';
            const content = stripHtml(post.content?.rendered || '').toLowerCase();
            const excerpt = stripHtml(post.excerpt?.rendered || '').toLowerCase();
            return title.includes(searchLower) || 
                   content.includes(searchLower) || 
                   excerpt.includes(searchLower);
        });
    }
    
    // Category filter
    if (state.filters.category) {
        const categoryId = parseInt(state.filters.category);
        filtered = filtered.filter(post => 
            post.categories && post.categories.includes(categoryId)
        );
    }
    
    // Store filter
    if (state.filters.store) {
        const storeId = parseInt(state.filters.store);
        filtered = filtered.filter(post => 
            post.dealstore && post.dealstore.includes(storeId)
        );
    }
    
    // Sort
    filtered.sort((a, b) => {
        switch (state.filters.sortBy) {
            case 'date-desc':
                return new Date(b.date) - new Date(a.date);
            case 'date-asc':
                return new Date(a.date) - new Date(b.date);
            case 'title-asc':
                return (a.title?.rendered || '').localeCompare(b.title?.rendered || '');
            case 'title-desc':
                return (b.title?.rendered || '').localeCompare(a.title?.rendered || '');
            default:
                return 0;
        }
    });
    
    state.filteredPosts = filtered;
    renderDeals();
}

// Event Handlers
function handleSearch() {
    state.filters.search = elements.searchInput.value;
    applyFilters();
}

function handleCategoryFilter(e) {
    state.filters.category = e.target.value;
    applyFilters();
}

function handleStoreFilter(e) {
    state.filters.store = e.target.value;
    applyFilters();
}

function handleSort(e) {
    state.filters.sortBy = e.target.value;
    applyFilters();
}

function handleViewToggle(view) {
    state.currentView = view;
    
    if (view === 'grid') {
        elements.dealsGrid.classList.remove('list-view');
        elements.dealsGrid.classList.add('grid-view');
        elements.gridViewBtn.classList.add('active');
        elements.listViewBtn.classList.remove('active');
    } else {
        elements.dealsGrid.classList.remove('grid-view');
        elements.dealsGrid.classList.add('list-view');
        elements.listViewBtn.classList.add('active');
        elements.gridViewBtn.classList.remove('active');
    }
}

async function handleLoadMore() {
    if (state.currentPage >= state.totalPages || state.isLoading) return;
    
    state.isLoading = true;
    elements.loadMoreBtn.disabled = true;
    elements.loadMoreBtn.textContent = 'Loading...';
    
    try {
        const { posts } = await fetchPosts(state.currentPage + 1);
        state.posts = [...state.posts, ...posts];
        state.currentPage++;
        applyFilters();
        
        if (state.currentPage >= state.totalPages) {
            elements.loadMoreBtn.style.display = 'none';
        }
    } catch (error) {
        console.error('Error loading more posts:', error);
    } finally {
        state.isLoading = false;
        elements.loadMoreBtn.disabled = false;
        elements.loadMoreBtn.textContent = 'Load More Deals';
    }
}

async function handleRefresh() {
    await initialize();
}

// Initialize Application
async function initialize() {
    try {
        state.isLoading = true;
        elements.loadingState.style.display = 'block';
        elements.errorState.style.display = 'none';
        elements.dealsGrid.innerHTML = '';
        
        // Fetch initial data
        const [postsData, categories, stores] = await Promise.all([
            fetchPosts(1),
            fetchCategories(),
            fetchStores()
        ]);
        
        state.posts = postsData.posts;
        state.totalPages = postsData.totalPages;
        state.currentPage = 1;
        state.categories = categories;
        state.stores = stores;
        state.filteredPosts = [...state.posts];
        
        // Populate UI
        populateFilters();
        renderDeals();
        
        // Show/hide load more button
        if (state.totalPages > 1) {
            elements.loadMoreBtn.style.display = 'block';
        }
        
        elements.loadingState.style.display = 'none';
    } catch (error) {
        console.error('Initialization error:', error);
        elements.loadingState.style.display = 'none';
        elements.errorState.style.display = 'block';
    } finally {
        state.isLoading = false;
    }
}

// Event Listeners
function setupEventListeners() {
    // Search
    elements.searchInput.addEventListener('input', debounce(handleSearch, 500));
    elements.searchBtn.addEventListener('click', handleSearch);
    elements.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    
    // Filters
    elements.categoryFilter.addEventListener('change', handleCategoryFilter);
    elements.storeFilter.addEventListener('change', handleStoreFilter);
    elements.sortBy.addEventListener('change', handleSort);
    
    // View toggle
    elements.gridViewBtn.addEventListener('click', () => handleViewToggle('grid'));
    elements.listViewBtn.addEventListener('click', () => handleViewToggle('list'));
    
    // Load more
    elements.loadMoreBtn.addEventListener('click', handleLoadMore);
    
    // Refresh
    elements.refreshBtn.addEventListener('click', handleRefresh);
    elements.retryBtn.addEventListener('click', handleRefresh);
    
    // Quick links
    document.querySelectorAll('.quick-link-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = e.target.dataset.category;
            if (category) {
                elements.categoryFilter.value = category;
                handleCategoryFilter({ target: elements.categoryFilter });
            }
        });
    });
}

// Utility: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Start the application
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    initialize();
});

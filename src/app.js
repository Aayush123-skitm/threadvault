/**
 * THREADVAULT - Modern Streetwear E-Commerce Engine
 * Pure Vanilla JavaScript (No Frameworks)
 * Handles state management, localStorage cart persistence, filtering, sorting,
 * modal dialogs, drawer transitions, fake payment simulation, and Stripe/Razorpay integration guides.
 */

import { PRODUCTS } from './products.js';

/* ==========================================================================
   STATE MANAGEMENT
   ========================================================================== */
const STATE = {
  products: [...PRODUCTS],
  filteredProducts: [...PRODUCTS],
  cart: [],
  activeFilters: {
    category: 'all',
    size: null,
    color: null,
    maxPrice: 75,
    searchQuery: '',
    sortBy: 'featured'
  },
  appliedPromo: null,
  activeModalProduct: null,
  modalSelectedSize: null,
  modalSelectedColor: null,
  modalQuantity: 1,
  isLoading: false
};

const PROMO_CODES = {
  'VAULT10': { discount: 0.10, label: '10% OFF ARCHIVE DROP' },
  'DROP20': { discount: 0.20, label: '20% OFF STREETWEAR SPECIAL' }
};

/* ==========================================================================
   DOM ELEMENT REFERENCES
   ========================================================================== */
const DOM = {
  // Navigation & Badges
  cartBtn: document.getElementById('cart-toggle-btn'),
  cartBadge: document.getElementById('cart-badge-count'),
  navSearchInput: document.getElementById('header-search-input'),
  navSearchClear: document.getElementById('header-search-clear'),
  mobileMenuBtn: document.getElementById('mobile-menu-btn'),

  // Product Grids & Sections
  featuredGrid: document.getElementById('featured-products-grid'),
  catalogGrid: document.getElementById('catalog-products-grid'),
  resultsCount: document.getElementById('catalog-results-count'),
  activeFiltersSummary: document.getElementById('active-filters-summary'),
  activeTagsContainer: document.getElementById('active-filter-tags-list'),

  // Filters & Controls
  categoryTabsContainer: document.getElementById('category-tabs-wrapper'),
  sizeChipsContainer: document.getElementById('size-chips-container'),
  priceSlider: document.getElementById('price-range-slider'),
  priceDisplay: document.getElementById('price-display-val'),
  sortSelect: document.getElementById('catalog-sort-select'),
  clearFiltersBtn: document.getElementById('clear-filters-btn'),

  // Cart Drawer
  cartDrawer: document.getElementById('cart-drawer'),
  cartOverlay: document.getElementById('cart-drawer-overlay'),
  cartCloseBtn: document.getElementById('cart-close-btn'),
  cartItemsContainer: document.getElementById('cart-items-container'),
  cartSubtotal: document.getElementById('cart-subtotal-val'),
  cartDiscountLine: document.getElementById('cart-discount-line'),
  cartDiscountVal: document.getElementById('cart-discount-val'),
  cartShippingVal: document.getElementById('cart-shipping-val'),
  cartTotal: document.getElementById('cart-total-val'),
  freeShippingFill: document.getElementById('free-shipping-progress-fill'),
  freeShippingLabel: document.getElementById('free-shipping-progress-label'),
  promoInput: document.getElementById('promo-code-input'),
  promoApplyBtn: document.getElementById('apply-promo-btn'),
  proceedCheckoutBtn: document.getElementById('proceed-to-checkout-btn'),

  // Product Detail Modal
  modalOverlay: document.getElementById('product-modal-overlay'),
  modalCloseBtn: document.getElementById('product-modal-close-btn'),
  modalCategory: document.getElementById('modal-product-category'),
  modalTitle: document.getElementById('modal-product-title'),
  modalRatingText: document.getElementById('modal-product-rating-text'),
  modalPrice: document.getElementById('modal-product-price'),
  modalOrigPrice: document.getElementById('modal-product-orig-price'),
  modalDesc: document.getElementById('modal-product-desc'),
  modalMainImg: document.getElementById('modal-main-product-img'),
  modalThumbnails: document.getElementById('modal-thumbnails-strip'),
  modalSizesContainer: document.getElementById('modal-sizes-group'),
  modalColorsContainer: document.getElementById('modal-colors-group'),
  modalColorName: document.getElementById('modal-selected-color-name'),
  modalQtyDisplay: document.getElementById('modal-qty-val'),
  modalQtyMinus: document.getElementById('modal-qty-minus'),
  modalQtyPlus: document.getElementById('modal-qty-plus'),
  modalAddCartBtn: document.getElementById('modal-add-cart-btn'),
  sizeGuideTrigger: document.getElementById('modal-size-guide-trigger'),

  // Size Guide Modal
  sizeGuideOverlay: document.getElementById('size-guide-overlay'),
  sizeGuideCloseBtn: document.getElementById('size-guide-close-btn'),

  // Checkout Modal
  checkoutOverlay: document.getElementById('checkout-modal-overlay'),
  checkoutCloseBtn: document.getElementById('checkout-close-btn'),
  checkoutForm: document.getElementById('checkout-shipping-form'),
  checkoutPayBtn: document.getElementById('checkout-submit-pay-btn'),
  checkoutItemsList: document.getElementById('checkout-items-preview-list'),
  checkoutSubtotal: document.getElementById('checkout-subtotal-val'),
  checkoutShipping: document.getElementById('checkout-shipping-val'),
  checkoutDiscount: document.getElementById('checkout-discount-val'),
  checkoutTotal: document.getElementById('checkout-total-val'),
  checkoutStepForm: document.getElementById('checkout-step-details'),
  checkoutStepProcessing: document.getElementById('checkout-step-processing'),
  checkoutStepSuccess: document.getElementById('checkout-step-success'),
  checkoutSuccessOrderId: document.getElementById('checkout-success-order-id'),
  checkoutSuccessCloseBtn: document.getElementById('checkout-success-continue-btn'),

  // Toast Container
  toastContainer: document.getElementById('toast-container')
};

/* ==========================================================================
   INITIALIZATION
   ========================================================================== */
export function init() {
  loadCartFromStorage();
  renderFeaturedProducts();
  renderCategoryTabs();
  renderProductsGrid();
  updateCartUI();
  setupEventListeners();
  initIntersectionObserver();
  handleUrlParameters();
}

/* ==========================================================================
   LOCAL STORAGE PERSISTENCE
   ========================================================================== */
function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem('threadvault_cart');
    if (saved) {
      STATE.cart = JSON.parse(saved);
    }
  } catch (err) {
    console.warn('Failed to load cart from localStorage:', err);
    STATE.cart = [];
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem('threadvault_cart', JSON.stringify(STATE.cart));
  } catch (err) {
    console.warn('Failed to save cart to localStorage:', err);
  }
}

/* ==========================================================================
   INTERSECTION OBSERVER FOR SCROLL REVEAL ANIMATIONS
   ========================================================================== */
function initIntersectionObserver() {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

function refreshIntersectionObserver() {
  setTimeout(() => {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });

    document.querySelectorAll('.product-card.reveal-on-scroll:not(.is-revealed)').forEach(el => {
      observer.observe(el);
    });
  }, 50);
}

/* ==========================================================================
   FEATURED PRODUCTS RENDERING
   ========================================================================== */
function renderFeaturedProducts() {
  if (!DOM.featuredGrid) return;
  const featured = STATE.products.filter(p => p.isFeatured).slice(0, 4);

  DOM.featuredGrid.innerHTML = featured.map((product, idx) => `
    <div class="product-card reveal-on-scroll stagger-${(idx % 4) + 1}" data-product-id="${product.id}">
      <div class="product-thumb-container" onclick="window.ThreadVault.openProductModal('${product.id}')">
        <img class="product-thumb-img" src="${product.images[0]}" alt="${product.title}" loading="lazy" />
        <span class="product-card-badge accent-badge">${product.badge || 'FEATURED'}</span>
        <div class="product-card-actions">
          <button class="btn-card-action" onclick="event.stopPropagation(); window.ThreadVault.quickAddToCart('${product.id}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Quick Add
          </button>
          <button class="btn-card-action" onclick="event.stopPropagation(); window.ThreadVault.openProductModal('${product.id}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            Quick View
          </button>
        </div>
      </div>
      <div class="product-info-wrap">
        <div class="product-meta-row">
          <span class="product-category-tag">${product.category}</span>
          <div class="product-rating-box">
            <svg class="star-icon" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span>${product.rating.toFixed(1)}</span>
          </div>
        </div>
        <h3 class="product-title" onclick="window.ThreadVault.openProductModal('${product.id}')">${product.title}</h3>
        <p class="product-gsm-spec">${product.gsm.split('•')[0] || product.gsm}</p>
        <div class="product-bottom-row">
          <div class="product-price-box">
            <span class="product-current-price">$${product.price}</span>
            ${product.originalPrice ? `<span class="product-original-price">$${product.originalPrice}</span>` : ''}
          </div>
          <div class="product-color-dots">
            ${product.colors.map((c, i) => `
              <span class="color-dot ${i === 0 ? 'active' : ''}" style="background-color: ${c.hex}" title="${c.name}"></span>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   CATEGORY TABS RENDERING
   ========================================================================== */
function renderCategoryTabs() {
  if (!DOM.categoryTabsContainer) return;
  const categories = [
    'all',
    'Cyberpunk',
    'Gothic & Grunge',
    'Anime & Manga',
    'Minimalist Typography',
    'Vintage Acid Wash'
  ];

  DOM.categoryTabsContainer.innerHTML = categories.map(cat => {
    const isAct = STATE.activeFilters.category === cat;
    const label = cat === 'all' ? 'All Archive' : cat;
    return `
      <button class="category-tab-btn ${isAct ? 'active' : ''}" data-category="${cat}">
        ${label}
      </button>
    `;
  }).join('');

  DOM.categoryTabsContainer.querySelectorAll('.category-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.category;
      setCategoryFilter(cat);
    });
  });
}

/* ==========================================================================
   FILTERING & SORTING ENGINE
   ========================================================================== */
function applyFiltersAndSort(withLoadingSimulation = false) {
  if (withLoadingSimulation) {
    showLoadingSkeletons();
  }

  let list = [...STATE.products];

  // 1. Category Filter
  if (STATE.activeFilters.category !== 'all') {
    list = list.filter(p => p.category.toLowerCase() === STATE.activeFilters.category.toLowerCase());
  }

  // 2. Size Filter
  if (STATE.activeFilters.size) {
    list = list.filter(p => p.sizes.includes(STATE.activeFilters.size));
  }

  // 3. Color Filter
  if (STATE.activeFilters.color) {
    list = list.filter(p => p.colors.some(c => c.name.toLowerCase().includes(STATE.activeFilters.color.toLowerCase())));
  }

  // 4. Max Price Filter
  if (STATE.activeFilters.maxPrice) {
    list = list.filter(p => p.price <= STATE.activeFilters.maxPrice);
  }

  // 5. Search Query
  if (STATE.activeFilters.searchQuery.trim()) {
    const q = STATE.activeFilters.searchQuery.toLowerCase().trim();
    list = list.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.fit.toLowerCase().includes(q) ||
      (p.badge && p.badge.toLowerCase().includes(q))
    );
  }

  // 6. Sorting
  switch (STATE.activeFilters.sortBy) {
    case 'price-low':
      list.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      list.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
    case 'name-az':
      list.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'featured':
    default:
      list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
      break;
  }

  STATE.filteredProducts = list;

  if (withLoadingSimulation) {
    setTimeout(() => {
      renderProductsGrid();
      updateFilterSummaryUI();
    }, 280);
  } else {
    renderProductsGrid();
    updateFilterSummaryUI();
  }
}

function showLoadingSkeletons() {
  if (!DOM.catalogGrid) return;
  DOM.catalogGrid.innerHTML = Array(6).fill(0).map(() => `
    <div class="skeleton-card">
      <div class="skeleton-box skeleton-thumb"></div>
      <div class="skeleton-content">
        <div class="skeleton-box skeleton-line meta"></div>
        <div class="skeleton-box skeleton-line title"></div>
        <div class="skeleton-box skeleton-line price"></div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   CATALOG GRID RENDERING
   ========================================================================== */
function renderProductsGrid() {
  if (!DOM.catalogGrid) return;

  const count = STATE.filteredProducts.length;
  if (DOM.resultsCount) {
    DOM.resultsCount.textContent = `Showing ${count} ${count === 1 ? 'Design' : 'Designs'}`;
  }

  if (count === 0) {
    DOM.catalogGrid.innerHTML = `
      <div class="empty-results-box">
        <svg class="empty-results-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
        <h3 class="empty-results-title">No T-Shirts Found</h3>
        <p class="empty-results-desc">We couldn't find any products matching your current filters or search term.</p>
        <button class="btn-secondary" onclick="window.ThreadVault.resetAllFilters()">
          Clear All Filters
        </button>
      </div>
    `;
    return;
  }

  DOM.catalogGrid.innerHTML = STATE.filteredProducts.map((product, idx) => `
    <div class="product-card reveal-on-scroll is-revealed stagger-${(idx % 4) + 1}" data-product-id="${product.id}">
      <div class="product-thumb-container" onclick="window.ThreadVault.openProductModal('${product.id}')">
        <img class="product-thumb-img" src="${product.images[0]}" alt="${product.title}" loading="lazy" />
        ${product.badge ? `<span class="product-card-badge ${product.badge.includes('DROP') || product.badge.includes('HOT') ? 'accent-badge' : ''}">${product.badge}</span>` : ''}
        <div class="product-card-actions">
          <button class="btn-card-action" onclick="event.stopPropagation(); window.ThreadVault.quickAddToCart('${product.id}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Quick Add
          </button>
          <button class="btn-card-action" onclick="event.stopPropagation(); window.ThreadVault.openProductModal('${product.id}')">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            Quick View
          </button>
        </div>
      </div>
      <div class="product-info-wrap">
        <div class="product-meta-row">
          <span class="product-category-tag">${product.category}</span>
          <div class="product-rating-box">
            <svg class="star-icon" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span>${product.rating.toFixed(1)}</span>
          </div>
        </div>
        <h3 class="product-title" onclick="window.ThreadVault.openProductModal('${product.id}')">${product.title}</h3>
        <p class="product-gsm-spec">${product.gsm.split('•')[0] || product.gsm}</p>
        <div class="product-bottom-row">
          <div class="product-price-box">
            <span class="product-current-price">$${product.price}</span>
            ${product.originalPrice ? `<span class="product-original-price">$${product.originalPrice}</span>` : ''}
          </div>
          <div class="product-color-dots">
            ${product.colors.map((c, i) => `
              <span class="color-dot ${i === 0 ? 'active' : ''}" style="background-color: ${c.hex}" title="${c.name}"></span>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `).join('');

  refreshIntersectionObserver();
}

function updateFilterSummaryUI() {
  if (!DOM.activeTagsContainer) return;
  const tags = [];

  if (STATE.activeFilters.category !== 'all') {
    tags.push({ type: 'category', label: `Category: ${STATE.activeFilters.category}` });
  }
  if (STATE.activeFilters.size) {
    tags.push({ type: 'size', label: `Size: ${STATE.activeFilters.size}` });
  }
  if (STATE.activeFilters.maxPrice < 75) {
    tags.push({ type: 'price', label: `Under $${STATE.activeFilters.maxPrice}` });
  }
  if (STATE.activeFilters.searchQuery.trim()) {
    tags.push({ type: 'search', label: `"${STATE.activeFilters.searchQuery.trim()}"` });
  }

  if (tags.length === 0) {
    DOM.activeTagsContainer.innerHTML = '<span style="color: #666; font-size: 11px;">No active filters</span>';
  } else {
    DOM.activeTagsContainer.innerHTML = tags.map(t => `
      <span class="filter-tag-pill">
        ${t.label}
        <span class="filter-tag-remove" onclick="window.ThreadVault.removeFilter('${t.type}')">&times;</span>
      </span>
    `).join('');
  }
}

/* ==========================================================================
   PRODUCT DETAIL MODAL
   ========================================================================== */
export function openProductModal(productId) {
  const product = STATE.products.find(p => p.id === productId);
  if (!product) return;

  STATE.activeModalProduct = product;
  STATE.modalSelectedSize = product.sizes[0] || 'M';
  STATE.modalSelectedColor = product.colors[0];
  STATE.modalQuantity = 1;

  // Populate data
  if (DOM.modalCategory) DOM.modalCategory.textContent = product.category;
  if (DOM.modalTitle) DOM.modalTitle.textContent = product.title;
  if (DOM.modalRatingText) DOM.modalRatingText.textContent = `${product.rating.toFixed(1)} (${product.reviewsCount} customer reviews)`;
  if (DOM.modalPrice) DOM.modalPrice.textContent = `$${product.price}`;
  if (DOM.modalOrigPrice) {
    DOM.modalOrigPrice.textContent = product.originalPrice ? `$${product.originalPrice}` : '';
  }
  if (DOM.modalDesc) DOM.modalDesc.textContent = product.description;
  if (DOM.modalMainImg) {
    DOM.modalMainImg.src = product.images[0];
    DOM.modalMainImg.alt = product.title;
  }
  if (DOM.modalQtyDisplay) DOM.modalQtyDisplay.textContent = '1';

  // Render Thumbnails
  if (DOM.modalThumbnails) {
    DOM.modalThumbnails.innerHTML = product.images.map((imgUrl, i) => `
      <button class="gallery-thumb-btn ${i === 0 ? 'active' : ''}" onclick="window.ThreadVault.setModalMainImage('${imgUrl}', this)">
        <img src="${imgUrl}" alt="Thumbnail ${i + 1}" />
      </button>
    `).join('');
  }

  // Render Sizes
  if (DOM.modalSizesContainer) {
    DOM.modalSizesContainer.innerHTML = product.sizes.map((sz, i) => `
      <button class="modal-size-btn ${i === 0 ? 'active' : ''}" data-size="${sz}" onclick="window.ThreadVault.setModalSize('${sz}', this)">
        ${sz}
      </button>
    `).join('');
  }

  // Render Colors
  if (DOM.modalColorsContainer) {
    DOM.modalColorsContainer.innerHTML = product.colors.map((c, i) => `
      <button class="modal-color-btn ${i === 0 ? 'active' : ''}" data-color="${c.name}" onclick="window.ThreadVault.setModalColor('${c.name}', this)">
        <span style="background-color: ${c.hex}"></span>
      </button>
    `).join('');
    if (DOM.modalColorName) DOM.modalColorName.textContent = product.colors[0].name;
  }

  // Reset add to cart button state
  if (DOM.modalAddCartBtn) {
    DOM.modalAddCartBtn.classList.remove('added');
    DOM.modalAddCartBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      Add To Vault Cart
    `;
  }

  // Open modal
  DOM.modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

export function closeProductModal() {
  if (DOM.modalOverlay) {
    DOM.modalOverlay.classList.remove('active');
  }
  document.body.style.overflow = '';
  STATE.activeModalProduct = null;
}

export function setModalMainImage(url, btnEl) {
  if (DOM.modalMainImg) {
    DOM.modalMainImg.src = url;
  }
  if (DOM.modalThumbnails) {
    DOM.modalThumbnails.querySelectorAll('.gallery-thumb-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
  }
}

export function setModalSize(size, btnEl) {
  STATE.modalSelectedSize = size;
  if (DOM.modalSizesContainer) {
    DOM.modalSizesContainer.querySelectorAll('.modal-size-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
  }
}

export function setModalColor(colorName, btnEl) {
  if (!STATE.activeModalProduct) return;
  const colObj = STATE.activeModalProduct.colors.find(c => c.name === colorName);
  if (colObj) {
    STATE.modalSelectedColor = colObj;
    if (DOM.modalColorName) DOM.modalColorName.textContent = colObj.name;
  }
  if (DOM.modalColorsContainer) {
    DOM.modalColorsContainer.querySelectorAll('.modal-color-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
  }
}

export function adjustModalQuantity(delta) {
  let q = STATE.modalQuantity + delta;
  if (q < 1) q = 1;
  if (q > 10) q = 10;
  STATE.modalQuantity = q;
  if (DOM.modalQtyDisplay) DOM.modalQtyDisplay.textContent = q;
}

export function addModalProductToCart() {
  if (!STATE.activeModalProduct) return;

  addToCart(
    STATE.activeModalProduct,
    STATE.modalSelectedSize || STATE.activeModalProduct.sizes[0],
    STATE.modalSelectedColor || STATE.activeModalProduct.colors[0],
    STATE.modalQuantity
  );

  // Button micro-interaction
  if (DOM.modalAddCartBtn) {
    DOM.modalAddCartBtn.classList.add('added');
    DOM.modalAddCartBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
      Added To Vault!
    `;
    setTimeout(() => {
      closeProductModal();
      openCartDrawer();
    }, 600);
  }
}

/* ==========================================================================
   CART OPERATIONS & SLIDING SIDEBAR
   ========================================================================= */
export function quickAddToCart(productId) {
  const product = STATE.products.find(p => p.id === productId);
  if (!product) return;
  addToCart(product, product.sizes[0] || 'L', product.colors[0], 1);
  openCartDrawer();
}

export function addToCart(product, size, color, quantity = 1) {
  const cartItemId = `${product.id}-${size}-${color.name}`;
  const existing = STATE.cart.find(item => item.cartItemId === cartItemId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    STATE.cart.push({
      cartItemId,
      id: product.id,
      title: product.title,
      category: product.category,
      price: product.price,
      image: product.images[0],
      size: size,
      color: color,
      quantity: quantity
    });
  }

  saveCartToStorage();
  updateCartUI();
  bumpCartBadge();
  showToast(`Added <strong>${product.title}</strong> (${size}) to your Vault.`, 'success');
}

export function updateCartItemQuantity(cartItemId, delta) {
  const item = STATE.cart.find(i => i.cartItemId === cartItemId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeCartItem(cartItemId);
    return;
  }

  saveCartToStorage();
  updateCartUI();
}

export function removeCartItem(cartItemId) {
  const idx = STATE.cart.findIndex(i => i.cartItemId === cartItemId);
  if (idx !== -1) {
    const removedTitle = STATE.cart[idx].title;
    STATE.cart.splice(idx, 1);
    saveCartToStorage();
    updateCartUI();
    showToast(`Removed <strong>${removedTitle}</strong> from cart.`, 'info');
  }
}

function updateCartUI() {
  const totalCount = STATE.cart.reduce((acc, i) => acc + i.quantity, 0);

  // Update header badge
  if (DOM.cartBadge) {
    DOM.cartBadge.textContent = totalCount;
    DOM.cartBadge.style.display = totalCount > 0 ? 'flex' : 'none';
  }

  // Update cart count pills
  document.querySelectorAll('.cart-count-pill').forEach(pill => {
    pill.textContent = `${totalCount} ${totalCount === 1 ? 'ITEM' : 'ITEMS'}`;
  });

  // Render items inside drawer
  if (DOM.cartItemsContainer) {
    if (STATE.cart.length === 0) {
      DOM.cartItemsContainer.innerHTML = `
        <div class="cart-empty-view">
          <svg class="cart-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <h4 class="cart-empty-title">Your Vault Is Empty</h4>
          <p class="cart-empty-desc">Discover our limited heavyweight drops and claim your archival graphic t-shirts.</p>
          <button class="btn-primary" onclick="window.ThreadVault.closeCartDrawer(); window.location.hash = 'catalog';">
            Shop The Vault
          </button>
        </div>
      `;
      if (DOM.proceedCheckoutBtn) DOM.proceedCheckoutBtn.disabled = true;
    } else {
      if (DOM.proceedCheckoutBtn) DOM.proceedCheckoutBtn.disabled = false;
      DOM.cartItemsContainer.innerHTML = STATE.cart.map(item => `
        <div class="cart-item" data-cart-id="${item.cartItemId}">
          <img class="cart-item-thumb" src="${item.image}" alt="${item.title}" />
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.title}</h4>
            <div class="cart-item-variant">
              <span>Size: ${item.size}</span> • 
              <span>Color: ${item.color.name}</span>
            </div>
            <div class="cart-item-bottom">
              <span class="cart-item-price">$${item.price * item.quantity}</span>
              <div class="qty-stepper">
                <button class="qty-btn" onclick="window.ThreadVault.updateCartItemQuantity('${item.cartItemId}', -1)">-</button>
                <span class="qty-value">${item.quantity}</span>
                <button class="qty-btn" onclick="window.ThreadVault.updateCartItemQuantity('${item.cartItemId}', 1)">+</button>
              </div>
              <button class="cart-item-remove-btn" title="Remove" onclick="window.ThreadVault.removeCartItem('${item.cartItemId}')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  // Calculate pricing breakdown
  const subtotal = STATE.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const freeShippingThreshold = 80;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingCost = (subtotal === 0 || isFreeShipping) ? 0 : 12;

  let discountAmount = 0;
  if (STATE.appliedPromo && subtotal > 0) {
    discountAmount = Math.round(subtotal * STATE.appliedPromo.discount);
    if (DOM.cartDiscountLine) DOM.cartDiscountLine.style.display = 'flex';
    if (DOM.cartDiscountVal) DOM.cartDiscountVal.textContent = `-$${discountAmount}`;
  } else {
    if (DOM.cartDiscountLine) DOM.cartDiscountLine.style.display = 'none';
  }

  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  if (DOM.cartSubtotal) DOM.cartSubtotal.textContent = `$${subtotal}`;
  if (DOM.cartShippingVal) DOM.cartShippingVal.textContent = isFreeShipping ? 'FREE' : `$${shippingCost}`;
  if (DOM.cartTotal) DOM.cartTotal.textContent = `$${finalTotal}`;

  // Update Free Shipping Meter
  if (DOM.freeShippingFill && DOM.freeShippingLabel) {
    if (subtotal === 0) {
      DOM.freeShippingFill.style.width = '0%';
      DOM.freeShippingLabel.innerHTML = 'Add items to qualify for <strong>FREE shipping</strong>';
    } else if (subtotal >= freeShippingThreshold) {
      DOM.freeShippingFill.style.width = '100%';
      DOM.freeShippingLabel.innerHTML = '🎉 You unlocked <span class="highlight">FREE Worldwide Shipping!</span>';
    } else {
      const remaining = freeShippingThreshold - subtotal;
      const pct = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
      DOM.freeShippingFill.style.width = `${pct}%`;
      DOM.freeShippingLabel.innerHTML = `Add <span class="highlight">$${remaining}</span> more for FREE Shipping!`;
    }
  }
}

function bumpCartBadge() {
  if (DOM.cartBadge) {
    DOM.cartBadge.classList.remove('bump');
    void DOM.cartBadge.offsetWidth; // Trigger reflow
    DOM.cartBadge.classList.add('bump');
  }
}

export function openCartDrawer() {
  if (DOM.cartDrawer && DOM.cartOverlay) {
    DOM.cartDrawer.classList.add('active');
    DOM.cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

export function closeCartDrawer() {
  if (DOM.cartDrawer && DOM.cartOverlay) {
    DOM.cartDrawer.classList.remove('active');
    DOM.cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

export function applyPromoCode() {
  if (!DOM.promoInput) return;
  const code = DOM.promoInput.value.trim().toUpperCase();

  if (!code) {
    showToast('Please enter a promo code.', 'warning');
    return;
  }

  if (PROMO_CODES[code]) {
    STATE.appliedPromo = { code, ...PROMO_CODES[code] };
    updateCartUI();
    showToast(`Code <strong>${code}</strong> applied! ${PROMO_CODES[code].label}`, 'success');
  } else {
    showToast(`Invalid promo code "${code}". Try "VAULT10" or "DROP20".`, 'error');
  }
}

/* ==========================================================================
   CHECKOUT MODAL & SIMULATION (STRIPE / RAZORPAY COMPATIBLE)
   ========================================================================== */
export function openCheckoutModal() {
  if (STATE.cart.length === 0) {
    showToast('Your cart is empty. Add a t-shirt first!', 'warning');
    return;
  }

  closeCartDrawer();

  // Reset steps
  if (DOM.checkoutStepForm) DOM.checkoutStepForm.style.display = 'block';
  if (DOM.checkoutStepProcessing) DOM.checkoutStepProcessing.style.display = 'none';
  if (DOM.checkoutStepSuccess) DOM.checkoutStepSuccess.style.display = 'none';

  // Populate checkout summary
  const subtotal = STATE.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const isFree = subtotal >= 80;
  const shipping = isFree ? 0 : 12;
  const discount = STATE.appliedPromo ? Math.round(subtotal * STATE.appliedPromo.discount) : 0;
  const total = subtotal - discount + shipping;

  if (DOM.checkoutSubtotal) DOM.checkoutSubtotal.textContent = `$${subtotal}`;
  if (DOM.checkoutShipping) DOM.checkoutShipping.textContent = isFree ? 'FREE' : `$${shipping}`;
  if (DOM.checkoutDiscount) DOM.checkoutDiscount.textContent = discount > 0 ? `-$${discount}` : '$0';
  if (DOM.checkoutTotal) DOM.checkoutTotal.textContent = `$${total}`;

  if (DOM.checkoutItemsList) {
    DOM.checkoutItemsList.innerHTML = STATE.cart.map(item => `
      <div class="checkout-item-line">
        <img src="${item.image}" alt="${item.title}" />
        <div style="flex-grow: 1;">
          <div style="font-weight: 700; color: #fff;">${item.title}</div>
          <div style="color: #888;">${item.size} • ${item.color.name} × ${item.quantity}</div>
        </div>
        <div style="font-weight: 800; color: #fff;">$${item.price * item.quantity}</div>
      </div>
    `).join('');
  }

  if (DOM.checkoutOverlay) {
    DOM.checkoutOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

export function closeCheckoutModal() {
  if (DOM.checkoutOverlay) {
    DOM.checkoutOverlay.classList.remove('active');
  }
  document.body.style.overflow = '';
}

/**
 * PRODUCTION PAYMENT INTEGRATION ARCHITECTURE NOTES:
 * 
 * 1. STRIPE TEST MODE INTEGRATION:
 *    - In a live production environment, never process raw card credentials directly on the client.
 *    - Backend Setup: Create a server endpoint `POST /api/create-checkout-session` or `POST /api/create-payment-intent`.
 *    - Example Server code (Node.js/Express):
 *      ```javascript
 *      import Stripe from 'stripe';
 *      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
 *      app.post('/api/create-payment-intent', async (req, res) => {
 *        const { amount, currency } = req.body;
 *        const paymentIntent = await stripe.paymentIntents.create({
 *          amount: amount * 100, // cents
 *          currency: 'usd',
 *          automatic_payment_methods: { enabled: true },
 *        });
 *        res.json({ clientSecret: paymentIntent.client_secret });
 *      });
 *      ```
 *    - Client Setup:
 *      Load Stripe.js: `<script src="https://js.stripe.com/v3/"></script>`
 *      const stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
 *      const elements = stripe.elements({ clientSecret });
 *      const paymentElement = elements.create('payment');
 *      paymentElement.mount('#payment-element');
 *      const { error } = await stripe.confirmPayment({ elements, confirmParams: { return_url: window.location.href } });
 * 
 * 2. RAZORPAY TEST MODE INTEGRATION:
 *    - Backend Setup: `POST /api/razorpay/create-order` using `razorpay` npm package with RAZORPAY_KEY_ID & SECRET.
 *    - Client Setup: Load `<script src="https://checkout.razorpay.com/v1/checkout.js"></script>`
 *    - Launch Razorpay checkout:
 *      ```javascript
 *      const options = {
 *        key: 'rzp_test_YourKeyHere',
 *        amount: totalAmount * 100,
 *        currency: 'USD',
 *        name: 'ThreadVault Streetwear',
 *        description: 'Archival Heavyweight T-Shirts Drop',
 *        handler: function(response) {
 *          console.log(response.razorpay_payment_id);
 *          verifyBackendPayment(response);
 *        }
 *      };
 *      const rzp = new Razorpay(options);
 *      rzp.open();
 *      ```
 */
export function processFakePayment(e) {
  if (e) e.preventDefault();

  // Basic Form Validation
  const nameInput = document.getElementById('ship-fullname');
  const emailInput = document.getElementById('ship-email');
  if (!nameInput || !nameInput.value.trim() || !emailInput || !emailInput.value.trim()) {
    showToast('Please provide your name and email for shipping.', 'warning');
    return;
  }

  // Show processing spinner
  if (DOM.checkoutStepForm) DOM.checkoutStepForm.style.display = 'none';
  if (DOM.checkoutStepProcessing) DOM.checkoutStepProcessing.style.display = 'block';

  setTimeout(() => {
    // Generate Order ID
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `TV-${randomNum}`;

    if (DOM.checkoutStepProcessing) DOM.checkoutStepProcessing.style.display = 'none';
    if (DOM.checkoutStepSuccess) DOM.checkoutStepSuccess.style.display = 'block';
    if (DOM.checkoutSuccessOrderId) DOM.checkoutSuccessOrderId.textContent = `ORDER #${orderId}`;

    // Clear user cart
    STATE.cart = [];
    saveCartToStorage();
    updateCartUI();

    showToast(`Payment successful! Order ${orderId} confirmed.`, 'success');
  }, 1600);
}

/* ==========================================================================
   SIZE GUIDE MODAL
   ========================================================================== */
export function openSizeGuideModal() {
  if (DOM.sizeGuideOverlay) {
    DOM.sizeGuideOverlay.classList.add('active');
  }
}

export function closeSizeGuideModal() {
  if (DOM.sizeGuideOverlay) {
    DOM.sizeGuideOverlay.classList.remove('active');
  }
}

/* ==========================================================================
   TOAST NOTIFICATION SYSTEM
   ========================================================================== */
export function showToast(message, type = 'info') {
  if (!DOM.toastContainer) return;

  const toast = document.createElement('div');
  toast.className = 'toast';

  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg class="toast-icon" style="color: #10B981;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
  } else if (type === 'warning') {
    iconSvg = `<svg class="toast-icon" style="color: #F59E0B;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`;
  } else if (type === 'error') {
    iconSvg = `<svg class="toast-icon" style="color: #EF4444;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
  } else {
    iconSvg = `<svg class="toast-icon" style="color: #FF4D00;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
  }

  toast.innerHTML = `
    ${iconSvg}
    <div class="toast-message">${message}</div>
  `;

  DOM.toastContainer.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto dismiss after 3.8s
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3800);
}

/* ==========================================================================
   FILTER CONTROLS & EVENT LISTENERS
   ========================================================================== */
function setCategoryFilter(category) {
  STATE.activeFilters.category = category;
  if (DOM.categoryTabsContainer) {
    DOM.categoryTabsContainer.querySelectorAll('.category-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === category);
    });
  }
  applyFiltersAndSort(true);
}

export function resetAllFilters() {
  STATE.activeFilters = {
    category: 'all',
    size: null,
    color: null,
    maxPrice: 75,
    searchQuery: '',
    sortBy: 'featured'
  };

  if (DOM.navSearchInput) DOM.navSearchInput.value = '';
  if (DOM.navSearchClear) DOM.navSearchClear.classList.remove('visible');
  if (DOM.priceSlider) DOM.priceSlider.value = 75;
  if (DOM.priceDisplay) DOM.priceDisplay.textContent = '$75';
  if (DOM.sortSelect) DOM.sortSelect.value = 'featured';

  if (DOM.sizeChipsContainer) {
    DOM.sizeChipsContainer.querySelectorAll('.size-chip-btn').forEach(b => b.classList.remove('active'));
  }

  renderCategoryTabs();
  applyFiltersAndSort(true);
  showToast('Filters cleared. Displaying all drops.', 'info');
}

export function removeFilter(type) {
  if (type === 'category') STATE.activeFilters.category = 'all';
  if (type === 'size') {
    STATE.activeFilters.size = null;
    if (DOM.sizeChipsContainer) {
      DOM.sizeChipsContainer.querySelectorAll('.size-chip-btn').forEach(b => b.classList.remove('active'));
    }
  }
  if (type === 'price') {
    STATE.activeFilters.maxPrice = 75;
    if (DOM.priceSlider) DOM.priceSlider.value = 75;
    if (DOM.priceDisplay) DOM.priceDisplay.textContent = '$75';
  }
  if (type === 'search') {
    STATE.activeFilters.searchQuery = '';
    if (DOM.navSearchInput) DOM.navSearchInput.value = '';
    if (DOM.navSearchClear) DOM.navSearchClear.classList.remove('visible');
  }

  renderCategoryTabs();
  applyFiltersAndSort(false);
}

function handleUrlParameters() {
  const hash = window.location.hash;
  if (hash === '#cart') {
    openCartDrawer();
  }
}

function setupEventListeners() {
  // Cart Drawer open/close
  if (DOM.cartBtn) DOM.cartBtn.addEventListener('click', openCartDrawer);
  if (DOM.cartCloseBtn) DOM.cartCloseBtn.addEventListener('click', closeCartDrawer);
  if (DOM.cartOverlay) DOM.cartOverlay.addEventListener('click', closeCartDrawer);

  // Promo Code
  if (DOM.promoApplyBtn) DOM.promoApplyBtn.addEventListener('click', applyPromoCode);
  if (DOM.promoInput) {
    DOM.promoInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') applyPromoCode();
    });
  }

  // Checkout
  if (DOM.proceedCheckoutBtn) DOM.proceedCheckoutBtn.addEventListener('click', openCheckoutModal);
  if (DOM.checkoutCloseBtn) DOM.checkoutCloseBtn.addEventListener('click', closeCheckoutModal);
  if (DOM.checkoutOverlay) {
    DOM.checkoutOverlay.addEventListener('click', (e) => {
      if (e.target === DOM.checkoutOverlay) closeCheckoutModal();
    });
  }
  if (DOM.checkoutForm) DOM.checkoutForm.addEventListener('submit', processFakePayment);
  if (DOM.checkoutSuccessCloseBtn) {
    DOM.checkoutSuccessCloseBtn.addEventListener('click', () => {
      closeCheckoutModal();
    });
  }

  // Product Modal
  if (DOM.modalCloseBtn) DOM.modalCloseBtn.addEventListener('click', closeProductModal);
  if (DOM.modalOverlay) {
    DOM.modalOverlay.addEventListener('click', (e) => {
      if (e.target === DOM.modalOverlay) closeProductModal();
    });
  }
  if (DOM.modalQtyMinus) DOM.modalQtyMinus.addEventListener('click', () => adjustModalQuantity(-1));
  if (DOM.modalQtyPlus) DOM.modalQtyPlus.addEventListener('click', () => adjustModalQuantity(1));
  if (DOM.modalAddCartBtn) DOM.modalAddCartBtn.addEventListener('click', addModalProductToCart);

  // Size Guide Modal
  if (DOM.sizeGuideTrigger) DOM.sizeGuideTrigger.addEventListener('click', openSizeGuideModal);
  if (DOM.sizeGuideCloseBtn) DOM.sizeGuideCloseBtn.addEventListener('click', closeSizeGuideModal);
  if (DOM.sizeGuideOverlay) {
    DOM.sizeGuideOverlay.addEventListener('click', (e) => {
      if (e.target === DOM.sizeGuideOverlay) closeSizeGuideModal();
    });
  }

  // Search input in navbar
  if (DOM.navSearchInput) {
    let searchDebounce = null;
    DOM.navSearchInput.addEventListener('input', (e) => {
      const val = e.target.value;
      if (DOM.navSearchClear) {
        DOM.navSearchClear.classList.toggle('visible', val.length > 0);
      }
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        STATE.activeFilters.searchQuery = val;
        applyFiltersAndSort(false);
      }, 250);
    });
  }
  if (DOM.navSearchClear) {
    DOM.navSearchClear.addEventListener('click', () => {
      if (DOM.navSearchInput) {
        DOM.navSearchInput.value = '';
        DOM.navSearchInput.focus();
      }
      DOM.navSearchClear.classList.remove('visible');
      STATE.activeFilters.searchQuery = '';
      applyFiltersAndSort(false);
    });
  }

  // Size chips
  if (DOM.sizeChipsContainer) {
    DOM.sizeChipsContainer.querySelectorAll('.size-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sz = btn.dataset.size;
        if (STATE.activeFilters.size === sz) {
          STATE.activeFilters.size = null;
          btn.classList.remove('active');
        } else {
          STATE.activeFilters.size = sz;
          DOM.sizeChipsContainer.querySelectorAll('.size-chip-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        }
        applyFiltersAndSort(true);
      });
    });
  }

  // Price slider
  if (DOM.priceSlider) {
    DOM.priceSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      STATE.activeFilters.maxPrice = val;
      if (DOM.priceDisplay) DOM.priceDisplay.textContent = `$${val}`;
      applyFiltersAndSort(false);
    });
  }

  // Sort select
  if (DOM.sortSelect) {
    DOM.sortSelect.addEventListener('change', (e) => {
      STATE.activeFilters.sortBy = e.target.value;
      applyFiltersAndSort(true);
    });
  }

  // Clear filters
  if (DOM.clearFiltersBtn) {
    DOM.clearFiltersBtn.addEventListener('click', resetAllFilters);
  }

  // Collapsible Accordion items in Product Modal
  document.querySelectorAll('.spec-header').forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.closest('.spec-item');
      if (parent) {
        parent.classList.toggle('open');
      }
    });
  });

  // Global Keyboard Shortcuts (Escape to close modals/drawers)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductModal();
      closeCartDrawer();
      closeCheckoutModal();
      closeSizeGuideModal();
    }
  });

  // Newsletter submission feedback
  const newsForm = document.getElementById('newsletter-form');
  if (newsForm) {
    newsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('newsletter-email');
      if (input && input.value) {
        showToast(`Subscribed! Check <strong>${input.value}</strong> for secret drops.`, 'success');
        input.value = '';
      }
    });
  }
}

/* Expose functions to window for inline onclick handlers */
window.ThreadVault = {
  openProductModal,
  closeProductModal,
  setModalMainImage,
  setModalSize,
  setModalColor,
  adjustModalQuantity,
  addModalProductToCart,
  quickAddToCart,
  updateCartItemQuantity,
  removeCartItem,
  openCartDrawer,
  closeCartDrawer,
  resetAllFilters,
  removeFilter,
  openSizeGuideModal,
  closeSizeGuideModal,
  openCheckoutModal,
  closeCheckoutModal,
  processFakePayment
};

// Bootstrap when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

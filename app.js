// File: app.js

// Application State
let state = {
    currentPage: 'landing',
    cart: [],
    cartTotal: 0,
    searchQuery: '',
    selectedProducts: [],
    agentProcessing: false
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 ShellKode AI Multi-Agent Retail Assistant initialized');
    
    // Simulate preloader
    setTimeout(() => {
        document.getElementById('preloader').style.display = 'none';
        initializeApp();
    }, 3000);
});

function initializeApp() {
    // Initialize animations
    setupScrollAnimations();
    
    // Initialize analytics if on analytics page
    if (state.currentPage === 'analytics') {
        animateKPIs();
        animateMetricBars();
    }
    
    // Setup event listeners
    setupEventListeners();
}

function setupEventListeners() {
    // Close modals on background click
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
    
    // Handle header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Navigation
function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(page);
    if (targetPage) {
        targetPage.classList.add('active');
        state.currentPage = page;
        
        // Update active nav item
        document.querySelectorAll('.desktop-nav a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('data-page') === page) {
                a.classList.add('active');
            }
        });
        
        // Close mobile menu
        document.getElementById('mobileNav').classList.remove('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Page-specific initialization
        if (page === 'analytics') {
            setTimeout(() => {
                animateKPIs();
                animateMetricBars();
            }, 300);
        } else if (page === 'agents') {
            initializeAgentsPage();
        }
    }
}

function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
}

// Cart Functions
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');
    
    if (cartSidebar.classList.contains('active')) {
        renderCart();
    }
}

function addToCart(product) {
    state.cart.push(product);
    state.cartTotal += product.price;
    updateCartCount();
    
    // Show animation
    const cartBtn = document.querySelector('.cart-btn');
    cartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartBtn.style.transform = 'scale(1)';
    }, 200);
    
    // Show success message
    showToast(`${product.name} added to cart!`, 'success');
}

function updateCartCount() {
    const cartCountEl = document.querySelector('.cart-count');
    cartCountEl.textContent = state.cart.length;
    
    if (state.cart.length > 0) {
        cartCountEl.style.display = 'flex';
    }
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const totalAmount = document.querySelector('.total-amount');
    
    if (state.cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-basket"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        totalAmount.textContent = '$0.00';
    } else {
        cartItems.innerHTML = state.cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${item.price}</p>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
        
        totalAmount.textContent = `$${state.cartTotal.toFixed(2)}`;
    }
}

function removeFromCart(productId) {
    const index = state.cart.findIndex(item => item.id === productId);
    if (index > -1) {
        state.cartTotal -= state.cart[index].price;
        state.cart.splice(index, 1);
        updateCartCount();
        renderCart();
    }
}

// Demo Journey
function startDemoJourney() {
    navigateTo('demo');
    setTimeout(() => {
        const demoBtn = document.querySelector('.demo-start-btn');
        if (demoBtn) {
            demoBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 500);
}

// Multi-Agent Demo
function startMultiAgentDemo() {
    state.searchQuery = document.getElementById('customerQuery').textContent;
    state.agentProcessing = true;
    
    // Show agent pipeline
    const pipeline = document.getElementById('agentPipeline');
    pipeline.innerHTML = createAgentPipeline();
    
    // Start processing agents sequentially
    processAgentsSequentially();
}

function createAgentPipeline() {
    return agentSteps.map((agent, index) => `
        <div class="agent-step-card" id="agent-${agent.id}" data-step="${index + 1}">
            <div class="agent-step-header">
                <div class="agent-step-number" style="background: ${agent.color}">
                    ${agent.id}
                </div>
                <div class="agent-step-info">
                    <h3>${agent.name}</h3>
                    <p>${agent.description}</p>
                    <span class="agent-tech">${agent.details.technology}</span>
                </div>
                <div class="agent-step-status">
                    <i class="fas fa-circle status-icon"></i>
                    <span class="status-text">Waiting...</span>
                </div>
            </div>
            <div class="agent-step-progress">
                <div class="progress-bar">
                    <div class="progress-fill"></div>
                </div>
            </div>
            <div class="agent-step-details" style="display: none;">
                <ul class="agent-actions">
                    ${agent.details.actions.map(action => `
                        <li><i class="fas fa-check-circle"></i> ${action}</li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

function processAgentsSequentially() {
    let currentStep = 0;
    
    function processNextAgent() {
        if (currentStep >= agentSteps.length) {
            // All agents complete
            setTimeout(() => {
                showResults();
            }, 500);
            return;
        }
        
        const agent = agentSteps[currentStep];
        const agentCard = document.getElementById(`agent-${agent.id}`);
        const statusIcon = agentCard.querySelector('.status-icon');
        const statusText = agentCard.querySelector('.status-text');
        const progressFill = agentCard.querySelector('.progress-fill');
        const details = agentCard.querySelector('.agent-step-details');
        
        // Set to processing
        agentCard.classList.add('processing');
        statusIcon.className = 'fas fa-spinner fa-spin status-icon';
        statusText.textContent = 'Processing...';
        statusText.style.color = agent.color;
        
        // Show details
        details.style.display = 'block';
        
        // Animate progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 2;
            progressFill.style.width = progress + '%';
            progressFill.style.background = agent.color;
            
            if (progress >= 100) {
                clearInterval(interval);
                
                // Mark as complete
                agentCard.classList.remove('processing');
                agentCard.classList.add('complete');
                statusIcon.className = 'fas fa-check-circle status-icon';
                statusIcon.style.color = '#10b981';
                statusText.textContent = `Complete (${agent.details.actions.length} actions)`;
                statusText.style.color = '#10b981';
                
                // Process next agent
                currentStep++;
                setTimeout(processNextAgent, 300);
            }
        }, agent.duration / 50);
    }
    
    processNextAgent();
}

function showResults() {
    const resultsSection = document.getElementById('demoResults');
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Populate products
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = products.map(product => createProductCard(product)).join('');
    
    state.agentProcessing = false;
}

function createProductCard(product) {
    const stockClass = product.stock > 3 ? 'in-stock' : 'low-stock';
    const stockColor = product.stock > 3 ? '#10b981' : '#ff9900';
    
    return `
        <div class="product-card" onclick="showProductModal(${product.id})">
            <div class="product-image">
                <div class="match-badge">${product.matchScore}% Match</div>
                <div style="font-size: 100px;">${product.image}</div>
            </div>
            <div class="product-info">
                <div class="product-header">
                    <span class="brand-badge">${product.brand}</span>
                    <div class="rating">
                        <i class="fas fa-star"></i>
                        <span>${product.rating}</span>
                        <span class="reviews">(${product.reviews})</span>
                    </div>
                </div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">$${product.price}</div>
                <div class="product-features">
                    ${product.features.map(feature => `
                        <div class="feature-item">
                            <i class="fas ${feature.icon}"></i>
                            <span>${feature.name}: ${feature.value}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="stock-info ${stockClass}">
                    <i class="fas fa-box" style="color: ${stockColor}"></i>
                    <span>${product.stock} in stock nearby</span>
                </div>
                <div class="product-actions">
                    <button class="btn-primary" onclick="event.stopPropagation(); showProductModal(${product.id})">
                        View Details
                    </button>
                    <button class="btn-cart" onclick="event.stopPropagation(); addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Product Modal
function showProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const content = document.getElementById('productModalContent');
    
    content.innerHTML = `
        <div class="modal-header">
            <div>
                <h2>${product.name}</h2>
                <div class="product-detail-meta">
                    <span class="brand-badge">${product.brand}</span>
                    <div class="rating">
                        <i class="fas fa-star"></i>
                        <span>${product.rating}</span>
                        <span class="reviews">(${product.reviews} reviews)</span>
                    </div>
                </div>
            </div>
            <button class="close-btn" onclick="closeModal('productModal')">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <div class="product-detail-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin: 30px 0;">
            <div class="product-detail-image" style="height: 400px; background: linear-gradient(135deg, #f2f2f2, #e5e7eb); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 150px;">
                ${product.image}
            </div>
            
            <div class="product-detail-info">
                <div class="product-detail-price" style="font-size: 48px; font-weight: 900; color: #4daae8; margin-bottom: 15px;">$${product.price}</div>
                <div class="match-score-large" style="display: inline-block; background: #d1fae5; color: #065f46; padding: 10px 20px; border-radius: 8px; font-weight: 700; margin-bottom: 25px;">
                    ${product.matchScore}% Match for Your Needs
                </div>
                
                <div class="detail-section" style="margin-bottom: 25px;">
                    <h3 style="font-size: 20px; margin-bottom: 15px;">Key Features</h3>
                    <div class="detail-features">
                        ${product.features.map(feature => `
                            <div class="detail-item" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                                <i class="fas fa-check" style="color: #10b981;"></i>
                                <span>${feature.name}: ${feature.value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="detail-section" style="margin-bottom: 25px;">
                    <h3 style="font-size: 20px; margin-bottom: 15px;">Availability</h3>
                    <div class="detail-availability">
                        <div class="detail-item" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <i class="fas fa-box" style="color: #10b981;"></i>
                            <span>${product.stock} units in stock</span>
                        </div>
                        ${product.stores.map(store => `
                            <div class="detail-item" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                                <i class="fas fa-map-marker-alt" style="color: #4daae8;"></i>
                                <span>${store.name} - ${store.distance} (${store.quantity} units)</span>
                            </div>
                        `).join('')}
                        <div class="detail-item" style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <i class="fas fa-truck" style="color: #ff9900;"></i>
                            <span>Delivery in 2-3 days</span>
                        </div>
                    </div>
                </div>
                
                <button class="btn-add-cart" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')}); closeModal('productModal')">
                    <i class="fas fa-shopping-cart"></i> Add to Cart - $${product.price}
                </button>
            </div>
        </div>
        
        <div class="ai-note" style="background: #fed7aa; padding: 25px; border-radius: 12px; margin-top: 30px;">
            <h3 style="font-size: 20px; color: #9a3412; margin-bottom: 12px;">
                <i class="fas fa-robot"></i> AI Assistant's Note
            </h3>
            <p style="color: #1f2937; line-height: 1.7;">
                ${product.description} This recommendation is based on our multi-agent system analyzing 
                your preferences, checking real-time inventory across ${product.stores.length} nearby stores, 
                and comparing with 1,200+ similar products in our Neo4j knowledge graph.
            </p>
        </div>
    `;
    
    modal.classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Analytics Functions
function animateKPIs() {
    const kpiValues = document.querySelectorAll('.kpi-value');
    
    kpiValues.forEach(el => {
        const target = parseFloat(el.getAttribute('data-target'));
        if (!target || el.dataset.animated) return;
        
        let current = 0;
        const increment = target / 60;
        const isDecimal = target % 1 !== 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (isDecimal) {
                el.textContent = current.toFixed(1);
            } else {
                el.textContent = Math.round(current).toLocaleString();
            }
        }, 30);
        
        el.dataset.animated = 'true';
    });
}

function animateMetricBars() {
    const metricBars = document.querySelectorAll('.metric-bar');
    
    metricBars.forEach((bar, index) => {
        const value = bar.getAttribute('data-value');
        setTimeout(() => {
            bar.style.width = value + '%';
        }, index * 150);
    });
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements
    const elementsToAnimate = document.querySelectorAll('.feature-card, .tech-card, .story-card, .agent-preview-card, .kpi-card, .arch-layer, .agent-detail-card');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Agents Page Initialization
function initializeAgentsPage() {
    const flowVisualization = document.getElementById('flowVisualization');
    if (!flowVisualization) return;
    
    flowVisualization.innerHTML = `
        <div class="flow-container">
            <h3 style="text-align: center; font-size: 24px; margin-bottom: 40px;">
                Agent Collaboration Flow
            </h3>
            <div class="flow-steps">
                ${agentSteps.map((agent, index) => `
                    <div class="flow-step" style="animation-delay: ${index * 0.2}s;">
                        <div class="flow-step-icon" style="background: ${agent.color};">
                            <i class="fas ${agent.icon}"></i>
                        </div>
                        <div class="flow-step-content">
                            <h4>${agent.name}</h4>
                            <p>${agent.description}</p>
                            <span class="flow-tech">${agent.details.technology}</span>
                        </div>
                        ${index < agentSteps.length - 1 ? '<div class="flow-arrow"><i class="fas fa-arrow-down"></i></div>' : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Toast Notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${type === 'success' ? '#10b981' : '#4daae8'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Comparison Modal
function showComparisonModal() {
    const modal = document.getElementById('comparisonModal');
    const content = document.getElementById('comparisonContent');
    
    content.innerHTML = `
        <div class="comparison-table-container" style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="border-bottom: 2px solid #f2f2f2;">
                        <th style="text-align: left; padding: 20px; font-weight: 700;">Feature</th>
                        ${products.map(p => `
                            <th style="text-align: center; padding: 20px;">
                                <div style="font-size: 60px; margin-bottom: 10px;">${p.image}</div>
                                <div style="font-weight: 700; margin-bottom: 5px;">${p.name}</div>
                                <div style="color: #4daae8; font-size: 20px; font-weight: 700;">${p.price}</div>
                            </th>
                        `).join('')}
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid #f2f2f2;">
                        <td style="padding: 15px; font-weight: 600;">Match Score</td>
                        ${products.map(p => `
                            <td style="text-align: center; padding: 15px;">
                                <span style="background: #d1fae5; color: #065f46; padding: 6px 16px; border-radius: 20px; font-weight: 700;">
                                    ${p.matchScore}%
                                </span>
                            </td>
                        `).join('')}
                    </tr>
                    <tr style="border-bottom: 1px solid #f2f2f2;">
                        <td style="padding: 15px; font-weight: 600;">Rating</td>
                        ${products.map(p => `
                            <td style="text-align: center; padding: 15px;">
                                <i class="fas fa-star" style="color: #fbbf24;"></i>
                                <span style="font-weight: 700; margin-left: 5px;">${p.rating}</span>
                            </td>
                        `).join('')}
                    </tr>
                    <tr style="border-bottom: 1px solid #f2f2f2;">
                        <td style="padding: 15px; font-weight: 600;">Stock Availability</td>
                        ${products.map(p => `
                            <td style="text-align: center; padding: 15px;">
                                <span style="color: ${p.stock > 3 ? '#10b981' : '#ff9900'}; font-weight: 700;">
                                    ${p.stock} units
                                </span>
                            </td>
                        `).join('')}
                    </tr>
                    ${['Waterproof', 'Cushioning', 'Breathable'].map(feature => `
                        <tr style="border-bottom: 1px solid #f2f2f2;">
                            <td style="padding: 15px; font-weight: 600;">${feature}</td>
                            ${products.map(() => `
                                <td style="text-align: center; padding: 15px;">
                                    <i class="fas fa-check" style="color: #10b981; font-size: 20px;"></i>
                                </td>
                            `).join('')}
                        </tr>
                    `).join('')}
                    <tr>
                        <td style="padding: 15px; font-weight: 600;">Stores Nearby</td>
                        ${products.map(p => `
                            <td style="text-align: center; padding: 15px;">
                                <span style="font-weight: 600;">${p.stores.length} locations</span>
                            </td>
                        `).join('')}
                    </tr>
                </tbody>
            </table>
        </div>
        
        <div style="background: #e0f2fe; padding: 20px; border-radius: 12px; margin-top: 30px;">
            <h4 style="color: #146eb4; margin-bottom: 10px;">
                <i class="fas fa-robot"></i> AI Recommendation
            </h4>
            <p style="color: #1f2937; line-height: 1.7;">
                Based on your priority for cushioning in monsoon conditions, the <strong>Adidas Ultraboost</strong> 
                offers the best cushioning (95%) at a competitive price of $89, though with slightly less waterproofing 
                than Nike. The <strong>Nike AirZoom Pro</strong> provides maximum weather protection with 90% waterproofing. 
                For budget-conscious shoppers, the <strong>Puma Nitro Elite</strong> at $75 offers excellent value with 
                good all-round performance.
            </p>
        </div>
    `;
    
    modal.classList.add('active');
}

// Utility Functions
function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

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

// Performance Monitoring
const performanceMonitor = {
    metrics: {},
    
    start(label) {
        this.metrics[label] = performance.now();
    },
    
    end(label) {
        if (this.metrics[label]) {
            const duration = performance.now() - this.metrics[label];
            console.log(`⚡ ${label}: ${duration.toFixed(2)}ms`);
            delete this.metrics[label];
            return duration;
        }
    }
};

// Export functions for global use
window.navigateTo = navigateTo;
window.toggleMobileMenu = toggleMobileMenu;
window.toggleCart = toggleCart;
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.startDemoJourney = startDemoJourney;
window.startMultiAgentDemo = startMultiAgentDemo;
window.showProductModal = showProductModal;
window.showComparisonModal = showComparisonModal;
window.closeModal = closeModal;

console.log('✅ ShellKode AI Multi-Agent System Ready');
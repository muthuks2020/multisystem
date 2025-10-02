// File: demo-integration.js
// Enterprise Integration for Multi-Agent Demo

class DemoIntegration {
    constructor() {
        this.controller = null;
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        const pipelineContainer = document.getElementById('agentPipeline');
        if (!pipelineContainer) {
            console.warn('⚠️ Agent pipeline container not found');
            return;
        }

        // Initialize controller
        this.controller = new DemoAnimationController();
        this.controller.initialize(pipelineContainer);

        // Store reference globally for onclick handlers
        window.demoController = this.controller;

        // Setup callbacks
        this.controller
            .onStepStart((agent) => this.handleStepStart(agent))
            .onStepProgress((agent, progress) => this.handleStepProgress(agent, progress))
            .onStepComplete((agent) => this.handleStepComplete(agent))
            .onAllComplete(() => this.handleAllComplete());

        // Setup start button
        const startButton = document.querySelector('.demo-start-btn');
        if (startButton) {
            startButton.addEventListener('click', () => this.startDemo());
        }

        this.isInitialized = true;
        console.log('✅ Enterprise demo integration initialized');
    }

    async startDemo() {
        if (!this.controller) {
            console.error('❌ Controller not initialized');
            return;
        }

        // Hide results if showing
        const resultsSection = document.getElementById('demoResults');
        if (resultsSection) {
            resultsSection.style.display = 'none';
        }

        // Scroll to pipeline
        const pipelineContainer = document.getElementById('agentPipeline');
        if (pipelineContainer) {
            pipelineContainer.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }

        // Start animation after scroll
        await this.delay(800);
        await this.controller.start();
    }

    handleStepStart(agent) {
        console.log(`🚀 ${agent.name} started`);
        
        // Show subtle notification
        this.showToast(`Processing: ${agent.shortName}`, 'info', 2000);
        
        // Track analytics
        if (window.performanceMonitor) {
            window.performanceMonitor.start(`agent_${agent.id}`);
        }
    }

    handleStepProgress(agent, progress) {
        // Could update external progress indicators here
        if (progress === 50) {
            console.log(`⏳ ${agent.name} - 50% complete`);
        }
    }

    handleStepComplete(agent) {
        console.log(`✅ ${agent.name} completed`);
        
        // Track analytics
        if (window.performanceMonitor) {
            window.performanceMonitor.end(`agent_${agent.id}`);
        }
    }

    handleAllComplete() {
        console.log('🎉 All agents completed successfully!');
        
        // Show results
        this.showResults();
        
        // Show celebration
        this.showCelebration();
        
        // Scroll to results after a moment
        setTimeout(() => {
            const resultsSection = document.getElementById('demoResults');
            if (resultsSection) {
                resultsSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }, 1000);
    }

    showResults() {
        const resultsSection = document.getElementById('demoResults');
        const productsGrid = document.getElementById('productsGrid');
        
        if (!resultsSection || !productsGrid) return;

        // Populate products
        if (typeof products !== 'undefined') {
            productsGrid.innerHTML = products
                .map((product, index) => this.createProductCard(product, index))
                .join('');
        }

        // Show results with animation
        resultsSection.style.display = 'block';
        resultsSection.classList.add('animate-fadeIn');
    }

    createProductCard(product, index) {
        const stockClass = product.stock > 3 ? 'in-stock' : 'low-stock';
        const stockColor = product.stock > 3 ? '#10b981' : '#ff9900';
        
        return `
            <div class="product-card" onclick="showProductModal(${product.id})" style="animation-delay: ${index * 0.1}s">
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

    showCelebration() {
        // Create confetti
        if (typeof createConfetti === 'function') {
            createConfetti();
        }
        
        // Show success message
        this.showToast('🎉 Perfect matches found! All 5 agents collaborated seamlessly.', 'success', 4000);
    }

    showToast(message, type = 'info', duration = 3000) {
        // Remove existing toasts
        document.querySelectorAll('.toast-notification').forEach(t => t.remove());

        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;
        
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle',
            warning: 'fa-exclamation-triangle'
        };

        const colors = {
            success: '#10b981',
            error: '#ef4444',
            info: '#4daae8',
            warning: '#f59e0b'
        };
        
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas ${icons[type]}"></i>
            </div>
            <span class="toast-message">${message}</span>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: ${colors[type]};
            color: white;
            padding: 16px 20px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 600;
            font-size: 14px;
            z-index: 10000;
            animation: slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 450px;
            backdrop-filter: blur(10px);
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    reset() {
        if (this.controller) {
            this.controller.reset();
        }
        
        const resultsSection = document.getElementById('demoResults');
        if (resultsSection) {
            resultsSection.style.display = 'none';
        }
    }

    getStatistics() {
        if (!this.controller) return null;
        
        return {
            totalAgents: this.controller.agents.length,
            isProcessing: this.controller.isProcessing,
            currentStep: this.controller.currentStep
        };
    }
}

// Initialize
const demoIntegration = new DemoIntegration();
demoIntegration.init();

// Export globals
if (typeof window !== 'undefined') {
    window.demoIntegration = demoIntegration;
    window.startMultiAgentDemo = () => demoIntegration.startDemo();
}

// Add toast styles
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    .toast-notification {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .toast-icon {
        font-size: 20px;
        display: flex;
        align-items: center;
    }

    .toast-message {
        flex: 1;
        line-height: 1.4;
    }

    .toast-close {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        color: white;
    }

    .toast-close:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: scale(1.1);
    }

    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    @media (max-width: 640px) {
        .toast-notification {
            left: 20px;
            right: 20px;
            bottom: 20px;
            max-width: none;
        }
    }
`;
document.head.appendChild(toastStyles);

console.log('🔗 Enterprise demo integration ready');
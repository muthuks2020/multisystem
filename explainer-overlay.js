// File: explainer-overlay.js

/**
 * Interactive Explainer Overlay System
 * Provides contextual help and explanations throughout the demo
 */

class ExplainerSystem {
    constructor() {
        this.explainers = this.initializeExplainers();
        this.currentTour = null;
        this.tourStep = 0;
    }
    
    initializeExplainers() {
        return {
            'agent-pipeline': {
                title: 'Multi-Agent Processing Pipeline',
                content: `
                    <div class="explainer-content">
                        <h4>How It Works:</h4>
                        <ol>
                            <li><strong>Sequential Processing:</strong> Each agent processes in order, building on previous results</li>
                            <li><strong>Real-time Updates:</strong> WebSocket connections provide live status</li>
                            <li><strong>Parallel Optimization:</strong> Some tasks run in parallel for speed</li>
                            <li><strong>Error Handling:</strong> Automatic retry and fallback mechanisms</li>
                        </ol>
                        <p class="explainer-highlight">
                            <i class="fas fa-lightbulb"></i>
                            Total processing time: <strong>2.8 seconds</strong> vs 15+ minutes traditional search
                        </p>
                    </div>
                `,
                position: 'bottom'
            },
            
            'neo4j-graph': {
                title: 'Neo4j Knowledge Graph Power',
                content: `
                    <div class="explainer-content">
                        <h4>Why Graph Databases?</h4>
                        <p>Traditional databases store data in tables. Neo4j stores <strong>relationships</strong>.</p>
                        <div class="comparison-grid">
                            <div class="comparison-col">
                                <h5>❌ SQL Database</h5>
                                <ul>
                                    <li>Multiple JOINs slow</li>
                                    <li>Complex queries</li>
                                    <li>Rigid schema</li>
                                </ul>
                            </div>
                            <div class="comparison-col">
                                <h5>✅ Neo4j Graph</h5>
                                <ul>
                                    <li>5-hop traversal in ms</li>
                                    <li>Natural queries (Cypher)</li>
                                    <li>Flexible relationships</li>
                                </ul>
                            </div>
                        </div>
                        <p class="explainer-highlight">
                            <i class="fas fa-rocket"></i>
                            Neo4j: <strong>1000x faster</strong> for relationship queries
                        </p>
                    </div>
                `,
                position: 'right'
            },
            
            'aws-bedrock': {
                title: 'Amazon Bedrock - AI Foundation',
                content: `
                    <div class="explainer-content">
                        <h4>Why Bedrock?</h4>
                        <div class="feature-grid">
                            <div class="feature-item">
                                <i class="fas fa-brain"></i>
                                <strong>Claude 3.5 Sonnet</strong>
                                <p>Most intelligent model for complex reasoning</p>
                            </div>
                            <div class="feature-item">
                                <i class="fas fa-shield-alt"></i>
                                <strong>Enterprise Security</strong>
                                <p>Your data never trains the model</p>
                            </div>
                            <div class="feature-item">
                                <i class="fas fa-bolt"></i>
                                <strong>Fully Managed</strong>
                                <p>No infrastructure to manage</p>
                            </div>
                            <div class="feature-item">
                                <i class="fas fa-dollar-sign"></i>
                                <strong>Cost Effective</strong>
                                <p>Pay per token, no minimum</p>
                            </div>
                        </div>
                        <p class="explainer-highlight">
                            <i class="fab fa-aws"></i>
                            Powers <strong>3 of 5</strong> intelligent agents in our system
                        </p>
                    </div>
                `,
                position: 'bottom'
            },
            
            'match-score': {
                title: 'Understanding Match Scores',
                content: `
                    <div class="explainer-content">
                        <h4>How We Calculate Match Scores:</h4>
                        <div class="score-breakdown">
                            <div class="score-component">
                                <span class="score-label">Feature Match</span>
                                <div class="score-bar">
                                    <div class="score-fill" style="width: 40%; background: #4daae8;"></div>
                                </div>
                                <span class="score-value">40%</span>
                            </div>
                            <div class="score-component">
                                <span class="score-label">Price Match</span>
                                <div class="score-bar">
                                    <div class="score-fill" style="width: 25%; background: #ff9900;"></div>
                                </div>
                                <span class="score-value">25%</span>
                            </div>
                            <div class="score-component">
                                <span class="score-label">User Preferences</span>
                                <div class="score-bar">
                                    <div class="score-fill" style="width: 20%; background: #10b981;"></div>
                                </div>
                                <span class="score-value">20%</span>
                            </div>
                            <div class="score-component">
                                <span class="score-label">Availability</span>
                                <div class="score-bar">
                                    <div class="score-fill" style="width: 15%; background: #7c3aed;"></div>
                                </div>
                                <span class="score-value">15%</span>
                            </div>
                        </div>
                        <p class="explainer-highlight">
                            <i class="fas fa-check-circle"></i>
                            95%+ match = Highly recommended for your needs
                        </p>
                    </div>
                `,
                position: 'left'
            },
            
            'real-time-inventory': {
                title: 'Real-time Inventory Intelligence',
                content: `
                    <div class="explainer-content">
                        <h4>AWS SageMaker Powers Inventory:</h4>
                        <ul class="feature-list">
                            <li><i class="fas fa-sync"></i> <strong>Live Updates:</strong> Stock levels updated every 30 seconds</li>
                            <li><i class="fas fa-chart-line"></i> <strong>ML Predictions:</strong> Forecasts restocking dates</li>
                            <li><i class="fas fa-map-marked-alt"></i> <strong>Location-based:</strong> Shows nearest stores first</li>
                            <li><i class="fas fa-truck"></i> <strong>Delivery Estimation:</strong> ML-powered delivery time</li>
                        </ul>
                        <div class="tech-stack-mini">
                            <span class="tech-tag">SageMaker</span>
                            <span class="tech-tag">Neo4j</span>
                            <span class="tech-tag">ElastiCache</span>
                        </div>
                    </div>
                `,
                position: 'top'
            },
            
            'elasticache-redis': {
                title: 'ElastiCache: Speed at Scale',
                content: `
                    <div class="explainer-content">
                        <h4>Why Redis Caching Matters:</h4>
                        <div class="speed-comparison">
                            <div class="speed-item">
                                <div class="speed-label">Database Query</div>
                                <div class="speed-bar slow">50-100ms</div>
                            </div>
                            <div class="speed-item">
                                <div class="speed-label">ElastiCache</div>
                                <div class="speed-bar fast">&lt; 1ms</div>
                            </div>
                        </div>
                        <h5>What We Cache:</h5>
                        <ul class="cache-list">
                            <li>User session data</li>
                            <li>Conversation history</li>
                            <li>Product embeddings</li>
                            <li>Agent execution state</li>
                        </ul>
                        <p class="explainer-highlight">
                            <i class="fas fa-tachometer-alt"></i>
                            <strong>50-100x faster</strong> response times with caching
                        </p>
                    </div>
                `,
                position: 'bottom'
            }
        };
    }
    
    showExplainer(elementId, explainerId) {
        const element = document.getElementById(elementId);
        const explainer = this.explainers[explainerId];
        
        if (!element || !explainer) return;
        
        // Remove any existing explainers
        this.hideAllExplainers();
        
        // Create explainer overlay
        const overlay = document.createElement('div');
        overlay.className = 'explainer-overlay';
        overlay.innerHTML = `
            <div class="explainer-card ${explainer.position}">
                <div class="explainer-header">
                    <h3>${explainer.title}</h3>
                    <button class="explainer-close" onclick="window.explainerSystem.hideExplainer()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                ${explainer.content}
                <div class="explainer-footer">
                    <button class="explainer-btn" onclick="window.explainerSystem.nextExplainer()">
                        Next Tip <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Position the explainer
        this.positionExplainer(overlay, element, explainer.position);
        
        // Animate in
        setTimeout(() => {
            overlay.classList.add('active');
        }, 10);
    }
    
    positionExplainer(overlay, targetElement, position) {
        const rect = targetElement.getBoundingClientRect();
        const card = overlay.querySelector('.explainer-card');
        
        // Simple positioning - center on screen for now
        card.style.position = 'fixed';
        card.style.top = '50%';
        card.style.left = '50%';
        card.style.transform = 'translate(-50%, -50%)';
    }
    
    hideExplainer() {
        const overlay = document.querySelector('.explainer-overlay');
        if (overlay) {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 300);
        }
    }
    
    hideAllExplainers() {
        document.querySelectorAll('.explainer-overlay').forEach(el => el.remove());
    }
    
    startGuidedTour() {
        this.currentTour = [
            'agent-pipeline',
            'neo4j-graph',
            'aws-bedrock',
            'match-score',
            'real-time-inventory'
        ];
        this.tourStep = 0;
        this.showTourStep();
    }
    
    showTourStep() {
        if (this.tourStep < this.currentTour.length) {
            const explainerId = this.currentTour[this.tourStep];
            const elementId = explainerId; // Assuming matching IDs
            this.showExplainer(elementId, explainerId);
        } else {
            this.endTour();
        }
    }
    
    nextExplainer() {
        this.hideExplainer();
        this.tourStep++;
        setTimeout(() => this.showTourStep(), 300);
    }
    
    endTour() {
        this.currentTour = null;
        this.tourStep = 0;
        this.hideAllExplainers();
        
        // Show completion message
        showToast('Tour completed! 🎉 You now understand the multi-agent system.', 'success');
    }
}

// Enhanced Tooltip System
class SmartTooltip {
    constructor() {
        this.tooltips = {};
        this.init();
    }
    
    init() {
        // Auto-detect elements with data-tooltip attribute
        this.observeTooltips();
    }
    
    observeTooltips() {
        const observer = new MutationObserver(() => {
            this.attachTooltips();
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        this.attachTooltips();
    }
    
    attachTooltips() {
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            if (!element.dataset.tooltipAttached) {
                this.createTooltip(element);
                element.dataset.tooltipAttached = 'true';
            }
        });
    }
    
    createTooltip(element) {
        const content = element.dataset.tooltip;
        const position = element.dataset.tooltipPosition || 'top';
        
        element.addEventListener('mouseenter', (e) => {
            this.showTooltip(e.target, content, position);
        });
        
        element.addEventListener('mouseleave', () => {
            this.hideTooltip();
        });
    }
    
    showTooltip(target, content, position) {
        // Remove existing tooltip
        this.hideTooltip();
        
        const tooltip = document.createElement('div');
        tooltip.className = `smart-tooltip ${position}`;
        tooltip.innerHTML = content;
        document.body.appendChild(tooltip);
        
        // Position tooltip
        const rect = target.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let top, left;
        
        switch(position) {
            case 'top':
                top = rect.top - tooltipRect.height - 10;
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'bottom':
                top = rect.bottom + 10;
                left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
                break;
            case 'left':
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.left - tooltipRect.width - 10;
                break;
            case 'right':
                top = rect.top + (rect.height / 2) - (tooltipRect.height / 2);
                left = rect.right + 10;
                break;
        }
        
        tooltip.style.top = top + 'px';
        tooltip.style.left = left + 'px';
        tooltip.classList.add('visible');
        
        this.currentTooltip = tooltip;
    }
    
    hideTooltip() {
        if (this.currentTooltip) {
            this.currentTooltip.classList.remove('visible');
            setTimeout(() => {
                if (this.currentTooltip) {
                    this.currentTooltip.remove();
                    this.currentTooltip = null;
                }
            }, 200);
        }
    }
}

// Info Hotspots
class InfoHotspots {
    constructor() {
        this.hotspots = [];
        this.init();
    }
    
    init() {
        this.createHotspots();
    }
    
    createHotspots() {
        const hotspotsData = [
            {
                selector: '.agent-preview-card',
                title: 'AI Agent',
                description: 'Click to see how this agent works'
            },
            {
                selector: '.aws-service-box',
                title: 'AWS Service',
                description: 'Hover to learn more about this service'
            },
            {
                selector: '.product-card',
                title: 'Smart Match',
                description: 'See why this product matches your needs'
            }
        ];
        
        hotspotsData.forEach(data => {
            document.querySelectorAll(data.selector).forEach(element => {
                this.addHotspot(element, data);
            });
        });
    }
    
    addHotspot(element, data) {
        const hotspot = document.createElement('div');
        hotspot.className = 'info-hotspot';
        hotspot.innerHTML = '<i class="fas fa-question-circle"></i>';
        
        hotspot.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showHotspotInfo(data);
        });
        
        element.style.position = 'relative';
        element.appendChild(hotspot);
    }
    
    showHotspotInfo(data) {
        const modal = document.createElement('div');
        modal.className = 'hotspot-modal';
        modal.innerHTML = `
            <div class="hotspot-content">
                <h3>${data.title}</h3>
                <p>${data.description}</p>
                <button onclick="this.closest('.hotspot-modal').remove()">Got it!</button>
            </div>
        `;
        document.body.appendChild(modal);
        
        setTimeout(() => modal.classList.add('active'), 10);
    }
}

// Initialize systems
document.addEventListener('DOMContentLoaded', function() {
    window.explainerSystem = new ExplainerSystem();
    window.smartTooltip = new SmartTooltip();
    window.infoHotspots = new InfoHotspots();
    
    console.log('💡 Explainer systems initialized');
});

// Add CSS for explainer system
const explainerStyles = document.createElement('style');
explainerStyles.textContent = `
    .explainer-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(5px);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .explainer-overlay.active {
        opacity: 1;
    }
    
    .explainer-card {
        background: white;
        border-radius: 20px;
        padding: 30px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }
    
    .explainer-overlay.active .explainer-card {
        transform: scale(1);
    }
    
    .explainer-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 2px solid #f2f2f2;
    }
    
    .explainer-header h3 {
        font-size: 24px;
        color: #1f2937;
        margin: 0;
    }
    
    .explainer-close {
        background: #f2f2f2;
        border: none;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .explainer-close:hover {
        background: #4daae8;
        color: white;
        transform: rotate(90deg);
    }
    
    .explainer-content h4 {
        font-size: 18px;
        margin-bottom: 15px;
        color: #1f2937;
    }
    
    .explainer-content ol,
    .explainer-content ul {
        padding-left: 20px;
        line-height: 1.8;
    }
    
    .explainer-content li {
        margin-bottom: 10px;
    }
    
    .explainer-highlight {
        background: linear-gradient(135deg, #e0f2fe, #bae6fd);
        padding: 15px;
        border-radius: 10px;
        margin: 15px 0;
        border-left: 4px solid #4daae8;
    }
    
    .explainer-highlight i {
        color: #ff9900;
        margin-right: 8px;
    }
    
    .comparison-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        margin: 15px 0;
    }
    
    .comparison-col {
        background: #f8fafc;
        padding: 15px;
        border-radius: 10px;
    }
    
    .comparison-col h5 {
        margin-bottom: 10px;
        font-size: 16px;
    }
    
    .feature-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        margin: 15px 0;
    }
    
    .feature-item {
        background: #f8fafc;
        padding: 15px;
        border-radius: 10px;
        text-align: center;
    }
    
    .feature-item i {
        font-size: 28px;
        color: #4daae8;
        margin-bottom: 10px;
    }
    
    .score-breakdown {
        margin: 15px 0;
    }
    
    .score-component {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
    }
    
    .score-label {
        width: 120px;
        font-size: 13px;
        font-weight: 600;
    }
    
    .score-bar {
        flex: 1;
        height: 20px;
        background: #f2f2f2;
        border-radius: 10px;
        overflow: hidden;
    }
    
    .score-fill {
        height: 100%;
        transition: width 1s ease;
    }
    
    .score-value {
        width: 40px;
        text-align: right;
        font-weight: 700;
        font-size: 13px;
    }
    
    .explainer-footer {
        margin-top: 20px;
        padding-top: 15px;
        border-top: 2px solid #f2f2f2;
        text-align: right;
    }
    
    .explainer-btn {
        background: linear-gradient(135deg, #4daae8, #146eb4);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 10px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .explainer-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(77, 170, 232, 0.4);
    }
    
    .smart-tooltip {
        position: fixed;
        background: #1f2937;
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 10000;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s ease;
        max-width: 250px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
    
    .smart-tooltip.visible {
        opacity: 1;
    }
    
    .info-hotspot {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 30px;
        height: 30px;
        background: #4daae8;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 10;
        animation: pulse 2s ease-in-out infinite;
    }
    
    .info-hotspot:hover {
        background: #146eb4;
        transform: scale(1.1);
    }
`;
document.head.appendChild(explainerStyles);

console.log('🎓 Enhanced explainer system loaded');
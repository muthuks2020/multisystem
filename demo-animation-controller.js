// File: demo-animation-controller.js
// Enterprise-Grade Multi-Agent Demo Animation Controller

class EnhancedDemoController {
    constructor() {
        this.baseController = null;
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;

        // Wait for DOM to be ready
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

        // Check if DemoAnimationController is available
        if (typeof DemoAnimationController === 'undefined') {
            console.error('❌ DemoAnimationController not found. Please ensure demo-animation-controller.js is loaded first.');
            return;
        }

        // Initialize base controller
        this.baseController = new DemoAnimationController();
        this.baseController.initialize(pipelineContainer);

        // Store reference globally
        window.demoController = this.baseController;
        window.enhancedDemoController = this;

        // Add enhanced event listeners
        this.setupEnhancedListeners();

        // Add custom CSS enhancements
        this.injectCustomStyles();

        this.isInitialized = true;
        console.log('✅ Enhanced demo controller initialized');
    }

    setupEnhancedListeners() {
        // Enhance the start button
        const startButton = document.querySelector('.demo-start-btn');
        if (startButton) {
            // Add loading state
            const originalClick = startButton.onclick;
            startButton.onclick = async () => {
                startButton.disabled = true;
                startButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                
                if (originalClick) {
                    await originalClick.call(startButton);
                }
                
                startButton.disabled = false;
                startButton.innerHTML = '<i class="fas fa-rocket"></i> Start Multi-Agent Processing';
            };
        }

        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Collapse all expanded agents
                document.querySelectorAll('.agent-box.expanded').forEach(box => {
                    const agentId = box.getAttribute('data-agent-id');
                    if (agentId && window.demoController) {
                        window.demoController.toggleAgent(parseInt(agentId));
                    }
                });
            }
        });

        // Add smooth scroll to active agent
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target.classList.contains('agent-box')) {
                    if (mutation.target.classList.contains('processing')) {
                        // Smooth scroll to active agent
                        setTimeout(() => {
                            mutation.target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            });
                        }, 300);
                    }
                }
            });
        });

        // Observe all agent boxes
        document.querySelectorAll('.agent-box').forEach(box => {
            observer.observe(box, {
                attributes: true,
                attributeFilter: ['class']
            });
        });
    }

    injectCustomStyles() {
        // Add additional inline styles for enhanced animations
        const style = document.createElement('style');
        style.textContent = `
            /* Enhanced glow effects */
            .agent-box.processing {
                position: relative;
            }

            .agent-box.processing::after {
                content: '';
                position: absolute;
                inset: -2px;
                background: linear-gradient(45deg, #4daae8, #3b82f6, #7c3aed, #4daae8);
                background-size: 300% 300%;
                border-radius: 20px;
                z-index: -1;
                opacity: 0.3;
                animation: gradientRotate 3s ease infinite;
                filter: blur(8px);
            }

            @keyframes gradientRotate {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }

            /* Smooth height transitions */
            .agent-expanded {
                max-height: 0;
                overflow: hidden;
                transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .agent-box.expanded .agent-expanded {
                max-height: 2000px;
            }

            /* Enhanced button hover effects */
            .expand-btn {
                position: relative;
                overflow: hidden;
            }

            .expand-btn::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(77, 170, 232, 0.3);
                transform: translate(-50%, -50%);
                transition: width 0.6s, height 0.6s;
            }

            .expand-btn:hover::before {
                width: 300px;
                height: 300px;
            }

            .expand-btn span {
                position: relative;
                z-index: 1;
            }

            /* Progress bar glow */
            .progress-bar-fill {
                box-shadow: 0 0 20px rgba(77, 170, 232, 0.6);
            }

            /* Action item entrance animation */
            .action-item {
                animation: slideInFromLeft 0.5s ease-out backwards;
            }

            .action-item:nth-child(1) { animation-delay: 0.1s; }
            .action-item:nth-child(2) { animation-delay: 0.2s; }
            .action-item:nth-child(3) { animation-delay: 0.3s; }
            .action-item:nth-child(4) { animation-delay: 0.4s; }
            .action-item:nth-child(5) { animation-delay: 0.5s; }

            @keyframes slideInFromLeft {
                from {
                    opacity: 0;
                    transform: translateX(-30px);
                }
                to {
                    opacity: 0.5;
                    transform: translateX(0);
                }
            }

            /* Metric card entrance */
            .metric-card {
                animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) backwards;
            }

            .metric-card:nth-child(1) { animation-delay: 0.1s; }
            .metric-card:nth-child(2) { animation-delay: 0.2s; }
            .metric-card:nth-child(3) { animation-delay: 0.3s; }
            .metric-card:nth-child(4) { animation-delay: 0.4s; }

            @keyframes popIn {
                from {
                    opacity: 0;
                    transform: scale(0.5);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }

            /* Success celebration */
            .pipeline-footer {
                position: relative;
                overflow: hidden;
            }

            .pipeline-footer::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%);
                animation: rotate 10s linear infinite;
            }

            @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            /* Enhanced status badge animations */
            .agent-status-badge {
                position: relative;
            }

            .agent-box.processing .agent-status-badge::after {
                content: '';
                position: absolute;
                inset: -4px;
                border-radius: 50%;
                background: conic-gradient(transparent, #4daae8, transparent);
                animation: spin 2s linear infinite;
            }

            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }

            /* Tooltip for quick stats */
            .quick-stat {
                position: relative;
            }

            .quick-stat:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(77, 170, 232, 0.2);
            }

            /* Enhanced completion state */
            .agent-box.complete .agent-icon {
                animation: successBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            }

            @keyframes successBounce {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.2); }
            }
        `;
        document.head.appendChild(style);
    }

    // Helper method to show notifications
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#4daae8'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Method to add confetti on completion
    celebrateCompletion() {
        // Simple confetti effect
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${['#4daae8', '#10b981', '#7c3aed', '#ff9900'][Math.floor(Math.random() * 4)]};
                top: -10px;
                left: ${Math.random() * 100}%;
                opacity: 1;
                z-index: 10000;
                pointer-events: none;
                animation: confettiFall ${2 + Math.random() * 2}s ease-out forwards;
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }
    }
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            top: 100vh;
            transform: rotate(${Math.random() * 720}deg);
            opacity: 0;
        }
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
`;
document.head.appendChild(confettiStyle);

// Initialize enhanced controller
const enhancedController = new EnhancedDemoController();
enhancedController.init();

// Export for global use
if (typeof window !== 'undefined') {
    window.enhancedDemoController = enhancedController;
}

console.log('🎨 Enhanced demo controller loaded');
// File: animations-handler.js

// Parallax Effects
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    // Hero parallax
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < 600) {
        heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
        heroContent.style.opacity = Math.max(1 - (scrolled / 500), 0);
    }
    
    // Floating elements
    const floatingElements = document.querySelectorAll('.tech-card, .feature-card');
    floatingElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            const offset = (scrolled - rect.top) * 0.05;
            el.style.transform = `translateY(${offset}px)`;
        }
    });
});

// Mouse Follow Effect for Agent Cards
document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.agent-preview-card, .product-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        } else {
            card.style.transform = '';
        }
    });
});

// Typing Effect for Hero Title
function typeWriterEffect(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Number Counter Animation
function animateCounter(element, start, end, duration = 2000) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        
        if (element.textContent.includes('K')) {
            element.textContent = (current / 1000).toFixed(1) + 'K';
        } else if (element.textContent.includes('%')) {
            element.textContent = current.toFixed(1) + '%';
        } else if (element.textContent.includes('s')) {
            element.textContent = current.toFixed(1) + 's';
        } else {
            element.textContent = Math.round(current).toLocaleString();
        }
    }, 16);
}

// Particle Background Effect
function createParticles() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0.3';
    
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 50;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = '#4daae8';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.strokeStyle = `rgba(77, 170, 232, ${1 - distance / 150})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Ripple Effect on Buttons
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
        const button = e.target.tagName === 'BUTTON' ? e.target : e.target.closest('button');
        
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
});

// Smooth Reveal on Scroll
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.15
});

// Progress Bar Animation
function animateProgressBar(bar, targetWidth, duration = 1000) {
    let start = null;
    const startWidth = 0;
    
    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        
        bar.style.width = (startWidth + progress * (targetWidth - startWidth)) + '%';
        
        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }
    
    requestAnimationFrame(step);
}

// Stagger Animation for Lists
function staggerAnimation(elements, delay = 100) {
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * delay);
    });
}

// Glow Effect on Hover
function addGlowEffect(elements) {
    elements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px rgba(77, 170, 232, 0.6)';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Create particle background (optional - can be CPU intensive)
    // createParticles();
    
    // Add glow effects to special elements
    const glowElements = document.querySelectorAll('.cta-btn, .demo-start-btn');
    addGlowEffect(glowElements);
    
    // Observe elements for reveal animation
    const revealElements = document.querySelectorAll('.tech-card, .agent-detail-card, .analytics-card');
    revealElements.forEach(el => revealObserver.observe(el));
    
    // Stagger animation for agent steps
    const agentSteps = document.querySelectorAll('.agent-preview-card');
    if (agentSteps.length > 0) {
        staggerAnimation(agentSteps, 150);
    }
});

// Page transition effects
function pageTransition(callback) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #146eb4, #4daae8);
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        if (callback) callback();
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 300);
    }, 300);
}

// Confetti effect for success actions
function createConfetti() {
    const colors = ['#4daae8', '#ff9900', '#146eb4', '#10b981'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}%;
            opacity: 1;
            transform: rotate(${Math.random() * 360}deg);
            animation: confettiFall ${2 + Math.random() * 2}s ease-out forwards;
            z-index: 10000;
            pointer-events: none;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 4000);
    }
}

// Add confetti animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            top: 100vh;
            transform: translateY(0) rotate(${Math.random() * 720}deg);
            opacity: 0;
        }
    }
    
    .ripple-effect {
        animation: ripple 0.6s ease-out;
    }
    
    .revealed {
        animation: revealAnimation 0.8s ease-out;
    }
    
    @keyframes revealAnimation {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .agent-step-card {
        transition: all 0.3s ease;
    }
    
    .agent-step-card.processing {
        background: linear-gradient(135deg, #e0f2fe, #bae6fd);
        box-shadow: 0 10px 30px rgba(77, 170, 232, 0.3);
    }
    
    .agent-step-card.complete {
        background: linear-gradient(135deg, #d1fae5, #a7f3d0);
    }
    
    .flow-step {
        opacity: 0;
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100px);
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
            transform: translateX(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Export animation functions
window.animateProgressBar = animateProgressBar;
window.staggerAnimation = staggerAnimation;
window.pageTransition = pageTransition;
window.createConfetti = createConfetti;

console.log('✨ Animation system loaded');
// Initialize AOS (Animate On Scroll) library
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });
});

// Waitlist counter animation
function animateCounter() {
    const counter = document.getElementById('waitlist-counter');
    if (!counter) return;
    
    const target = parseInt(counter.textContent.replace(',', ''));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        counter.textContent = Math.floor(current).toLocaleString();
    }, 16);
}

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
            counterObserver.unobserve(entry.target);
        }
    });
});

const counterElement = document.getElementById('waitlist-counter');
if (counterElement) {
    counterObserver.observe(counterElement);
}

// FAQ Accordion functionality
document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Form submission handling
function handleFormSubmission(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const firstName = formData.get('firstName') || form.querySelector('input[type="text"]').value;
        const email = formData.get('email') || form.querySelector('input[type="email"]').value;
        
        if (!firstName || !email) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const button = form.querySelector('.cta-button');
        const originalText = button.textContent;
        
        button.textContent = 'Joining...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = '✓ Joined!';
            button.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            showNotification(`Welcome ${firstName}! You're on the waitlist!`, 'success');
            
            // Reset form
            setTimeout(() => {
                form.reset();
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
            }, 3000);
        }, 1500);
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 12px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #f44336, #d32f2f)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #476750, #5a7d63)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Apply form handlers to all forms
document.querySelectorAll('.waitlist-form, .final-waitlist-form').forEach(handleFormSubmission);

// Smooth scrolling for internal links (if any are added)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced button hover effects
document.querySelectorAll('.cta-button, .voice-button, .book-button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Input field animations
document.querySelectorAll('input[type="text"], input[type="email"]').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Parallax effect removed to fix background image jumping bug

// Phone mockup animation removed - no longer needed

// Voice waveform animation
function animateVoiceWaveform() {
    const waves = document.querySelectorAll('.wave');
    waves.forEach((wave, index) => {
        setInterval(() => {
            const randomHeight = Math.random() * 40 + 20;
            wave.style.height = `${randomHeight}px`;
        }, 100 + index * 50);
    });
}

// AI process animation
function animateAIProcess() {
    const steps = document.querySelectorAll('.ai-step');
    let currentStep = 0;
    
    setInterval(() => {
        steps.forEach(step => step.style.background = '#f8f8f8');
        if (steps[currentStep]) {
            steps[currentStep].style.background = 'linear-gradient(135deg, #E3B750, #d4a843)';
            steps[currentStep].style.color = 'white';
        }
        currentStep = (currentStep + 1) % steps.length;
        
        setTimeout(() => {
            if (steps[currentStep - 1] || steps[steps.length - 1]) {
                const prevStep = steps[currentStep - 1] || steps[steps.length - 1];
                prevStep.style.background = '#f8f8f8';
                prevStep.style.color = '';
            }
        }, 1500);
    }, 2000);
}

// Partner logos scroll animation
function animatePartnerLogos() {
    const logos = document.querySelector('.logos-scroll');
    if (logos) {
        let scrollAmount = 0;
        setInterval(() => {
            scrollAmount += 1;
            logos.style.transform = `translateX(-${scrollAmount}px)`;
            if (scrollAmount >= logos.scrollWidth / 2) {
                scrollAmount = 0;
            }
        }, 50);
    }
}

// Floating elements continuous animation
function enhanceFloatingElements() {
    const floatingItems = document.querySelectorAll('.floating-item');
    floatingItems.forEach((item, index) => {
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            item.style.transform += ` translate(${randomX}px, ${randomY}px)`;
        }, 2000 + index * 500);
    });
}

// Initialize all animations when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        animateVoiceWaveform();
        animateAIProcess();
        enhanceFloatingElements();
    }, 1000);
});

// Add loading animation
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
});

// Add scroll-triggered number counting for stats
function createScrollCounter(element, endValue, duration = 2000) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let startValue = 0;
                const increment = endValue / (duration / 16);
                
                const counter = setInterval(() => {
                    startValue += increment;
                    if (startValue >= endValue) {
                        startValue = endValue;
                        clearInterval(counter);
                    }
                    element.textContent = Math.floor(startValue).toLocaleString();
                }, 16);
                
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(element);
}

// Enhanced micro-interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add ripple effect to buttons
    document.querySelectorAll('.cta-button, .book-button, .voice-button').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add the ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Scroll event listeners removed with parallax fix

console.log('🍜 UMAMI Landing Page loaded successfully!'); 
// Smooth scrolling for navigation links
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

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 54, 93, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'rgba(26, 54, 93, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
    observer.observe(el);
});

// Project tabs functionality
const tabButtons = document.querySelectorAll('.tab-button');
const projectGrids = {
    'ongoing': document.getElementById('ongoing-projects'),
    'completed': document.getElementById('completed-projects')
};

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        // Hide all project grids
        Object.values(projectGrids).forEach(grid => {
            grid.style.display = 'none';
        });
        
        // Show selected grid
        const selectedTab = button.getAttribute('data-tab');
        if (projectGrids[selectedTab]) {
            projectGrids[selectedTab].style.display = 'grid';
        }
    });
});

// Generate floating particles for hero section
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 2-8px
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const isCurrency = target.includes('R');
        const isPlus = target.includes('+');
        
        let finalValue = parseInt(target.replace(/[R%+]/g, ''));
        let currentValue = 0;
        const increment = finalValue / 100;
        
        const updateCounter = () => {
            if (currentValue < finalValue) {
                currentValue += increment;
                let displayValue = Math.ceil(currentValue);
                
                if (isCurrency) {
                    if (finalValue >= 1000000) {
                        displayValue = Math.ceil(currentValue / 1000000) + 'M';
                        counter.textContent = 'R' + displayValue + '+';
                    } else {
                        counter.textContent = 'R' + displayValue.toLocaleString() + '+';
                    }
                } else if (isPercentage) {
                    counter.textContent = displayValue + '%';
                } else if (isPlus) {
                    counter.textContent = displayValue + '+';
                } else {
                    counter.textContent = displayValue;
                }
                
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start animation when element is visible
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        counterObserver.observe(counter);
    });
}

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simple form validation and submission feedback
    const formData = new FormData(this);
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = '#10b981';
        
        // Reset form
        this.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
    }, 2000);
});

// Mobile menu toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    animateCounters();
});

// Add some interactive hover effects
document.querySelectorAll('.service-card, .project-card, .team-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});
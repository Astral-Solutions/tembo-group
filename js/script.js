// Enhanced JavaScript for The Tembo Group Investment Website
// More dynamic and lively interactions with blue/white theme focus

// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Smooth scrolling for navigation links with enhanced easing
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1.2,
                scrollTo: { y: target, offsetY: 80 },
                ease: "power2.inOut"
            });
        }
    });
});

// Enhanced header scroll effect with smooth transitions
let lastScrollY = 0;
let ticking = false;

function updateHeader() {
    const header = document.querySelector('.header');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        gsap.to(header, {
            duration: 0.3,
            backgroundColor: 'rgba(26, 54, 93, 0.98)',
            backdropFilter: 'blur(15px)',
            boxShadow: '0 4px 30px rgba(26, 54, 93, 0.2)',
            ease: "power2.out"
        });
    } else {
        gsap.to(header, {
            duration: 0.3,
            backgroundColor: 'rgba(26, 54, 93, 0.95)',
            backdropFilter: 'blur(10px)',
            boxShadow: 'none',
            ease: "power2.out"
        });
    }
    
    // Hide/show header on scroll direction
    if (scrollY > lastScrollY && scrollY > 200) {
        gsap.to(header, { duration: 0.3, y: -100, ease: "power2.out" });
    } else {
        gsap.to(header, { duration: 0.3, y: 0, ease: "power2.out" });
    }
    
    lastScrollY = scrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
    }
});

// Enhanced GSAP animations with ScrollTrigger
function initScrollAnimations() {
    // Hero text animation
    gsap.timeline()
        .from(".hero-title", {
            duration: 1.2,
            y: 100,
            opacity: 0,
            scale: 0.8,
            ease: "back.out(1.7)"
        })
        .from(".hero-subtitle", {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power2.out"
        }, "-=0.5")
        .from(".cta-group .btn", {
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.3");

    // Section animations
    gsap.utils.toArray('.fade-in').forEach((element, index) => {
        gsap.fromTo(element, 
            {
                y: 60,
                opacity: 0,
                scale: 0.95
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Slide animations
    gsap.utils.toArray('.slide-in-left').forEach(element => {
        gsap.fromTo(element,
            {
                x: -100,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    gsap.utils.toArray('.slide-in-right').forEach(element => {
        gsap.fromTo(element,
            {
                x: 100,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Stats counter animation
    animateCountersWithGSAP();

    // Service cards stagger animation
    gsap.fromTo('.service-card',
        {
            y: 80,
            opacity: 0,
            scale: 0.9
        },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '.services-grid',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        }
    );

    // Project cards animation
    gsap.fromTo('.project-card',
        {
            y: 60,
            opacity: 0,
            rotationY: 15
        },
        {
            y: 0,
            opacity: 1,
            rotationY: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.projects-grid',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        }
    );

    // Team cards animation
    gsap.fromTo('.team-card',
        {
            y: 50,
            opacity: 0,
            scale: 0.8
        },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '.team-grid',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        }
    );
}

// Enhanced counter animation with GSAP
function animateCountersWithGSAP() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const isCurrency = target.includes('R');
        const isPlus = target.includes('+');
        
        let finalValue = parseInt(target.replace(/[R%+M]/g, ''));
        if (target.includes('M')) {
            finalValue = finalValue * 1000000;
        }
        
        ScrollTrigger.create({
            trigger: counter,
            start: "top 85%",
            onEnter: () => {
                gsap.fromTo(counter, 
                    { textContent: 0 },
                    {
                        textContent: finalValue,
                        duration: 2,
                        ease: "power2.out",
                        snap: { textContent: 1 },
                        onUpdate: function() {
                            let currentValue = Math.ceil(this.targets()[0].textContent);
                            let displayValue;
                            
                            if (isCurrency) {
                                if (finalValue >= 1000000) {
                                    displayValue = Math.ceil(currentValue / 1000000) + 'M';
                                    counter.textContent = 'R' + displayValue + '+';
                                } else {
                                    counter.textContent = 'R' + currentValue.toLocaleString() + '+';
                                }
                            } else if (isPercentage) {
                                counter.textContent = currentValue + '%';
                            } else if (isPlus) {
                                counter.textContent = currentValue + '+';
                            } else {
                                counter.textContent = currentValue;
                            }
                        },
                        onComplete: () => {
                            counter.textContent = target;
                            // Add a bounce effect when complete
                            gsap.fromTo(counter.parentElement,
                                { scale: 1 },
                                { scale: 1.1, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.inOut" }
                            );
                        }
                    }
                );
            },
            once: true
        });
    });
}

// Enhanced particle system with dynamic movement
function createEnhancedParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    const particleCount = 80;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 2-12px
        const size = Math.random() * 10 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        particle.style.left = x + '%';
        particle.style.top = y + '%';
        
        // Add opacity variation
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        
        particlesContainer.appendChild(particle);
        particles.push({
            element: particle,
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
        
        // Animate each particle with GSAP
        gsap.to(particle, {
            y: Math.random() * 40 - 20,
            x: Math.random() * 40 - 20,
            rotation: 360,
            duration: Math.random() * 6 + 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random() * 2
        });
    }

    // Mouse interaction with particles
    let mouseX = 0, mouseY = 0;
    
    particlesContainer.addEventListener('mousemove', (e) => {
        const rect = particlesContainer.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) / rect.width * 100;
        mouseY = (e.clientY - rect.top) / rect.height * 100;
        
        particles.forEach((particle, index) => {
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 15) {
                gsap.to(particle.element, {
                    x: particle.x - dx * 2,
                    y: particle.y - dy * 2,
                    scale: 1.5,
                    duration: 0.3,
                    ease: "power2.out"
                });
            } else {
                gsap.to(particle.element, {
                    x: particle.x,
                    y: particle.y,
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        });
    });
}

// Enhanced project tabs with smooth transitions
function initProjectTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const ongoingProjects = document.getElementById('ongoing-projects');
    const completedProjects = document.getElementById('completed-projects');
    
    if (!tabButtons.length) return;

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const selectedTab = button.getAttribute('data-tab');
            
            // Animate out current grid
            const currentGrid = selectedTab === 'ongoing' ? completedProjects : ongoingProjects;
            const newGrid = selectedTab === 'ongoing' ? ongoingProjects : completedProjects;
            
            gsap.to(currentGrid, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                ease: "power2.inOut",
                onComplete: () => {
                    currentGrid.style.display = 'none';
                    newGrid.style.display = 'grid';
                    
                    // Animate in new grid
                    gsap.fromTo(newGrid,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                    );
                    
                    // Stagger animate project cards
                    gsap.fromTo(newGrid.children,
                        { y: 30, opacity: 0, scale: 0.95 },
                        { 
                            y: 0, 
                            opacity: 1, 
                            scale: 1,
                            duration: 0.6,
                            stagger: 0.1,
                            ease: "back.out(1.7)"
                        }
                    );
                }
            });
        });
    });
}

// Enhanced form handling with better UX
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Animate form submission
        gsap.to(submitBtn, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
        
        // Show loading state with animation
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Animate form elements
        gsap.to(form.querySelectorAll('.form-input, .form-textarea'), {
            borderColor: '#f6ad3c',
            duration: 0.3,
            stagger: 0.05
        });
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            
            // Success animation
            gsap.fromTo(submitBtn,
                { scale: 0.9 },
                { scale: 1, duration: 0.5, ease: "back.out(1.7)" }
            );
            
            // Reset form with animation
            gsap.to(form.querySelectorAll('.form-input, .form-textarea'), {
                value: '',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                duration: 0.3
            });
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.innerHTML = '✓ Thank you! We\'ll get back to you soon.';
            successMessage.style.cssText = `
                position: absolute;
                top: -60px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                padding: 12px 24px;
                border-radius: 25px;
                font-weight: 600;
                opacity: 0;
                z-index: 1000;
            `;
            form.style.position = 'relative';
            form.appendChild(successMessage);
            
            gsap.to(successMessage, {
                opacity: 1,
                y: -10,
                duration: 0.5,
                ease: "back.out(1.7)"
            });
            
            setTimeout(() => {
                gsap.to(successMessage, {
                    opacity: 0,
                    y: -20,
                    duration: 0.3,
                    onComplete: () => successMessage.remove()
                });
            }, 3000);
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }, 2000);
    });
    
    // Enhanced form input animations
    form.querySelectorAll('.form-input, .form-textarea').forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                borderColor: '#f6ad3c',
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        input.addEventListener('blur', () => {
            gsap.to(input, {
                borderColor: 'rgba(255, 255, 255, 0.3)',
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Enhanced mobile menu with smooth animations
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!mobileToggle || !navMenu) return;
    
    let isOpen = false;
    
    mobileToggle.addEventListener('click', () => {
        isOpen = !isOpen;
        
        if (isOpen) {
            navMenu.style.display = 'flex';
            gsap.fromTo(navMenu,
                { 
                    opacity: 0, 
                    y: -20,
                    flexDirection: 'column',
                    position: 'absolute',
                    top: '100%',
                    left: '0',
                    right: '0',
                    background: 'rgba(26, 54, 93, 0.98)',
                    backdropFilter: 'blur(15px)',
                    padding: '2rem'
                },
                { 
                    opacity: 1, 
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out"
                }
            );
            
            gsap.fromTo(navMenu.querySelectorAll('li'),
                { opacity: 0, x: -20 },
                { 
                    opacity: 1, 
                    x: 0,
                    duration: 0.3,
                    stagger: 0.1,
                    ease: "power2.out"
                }
            );
            
            mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            gsap.to(navMenu, {
                opacity: 0,
                y: -20,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    navMenu.style.display = 'none';
                }
            });
            
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// Enhanced card hover effects
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.service-card, .project-card, .team-card, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -15,
                scale: 1.03,
                rotationY: 5,
                boxShadow: '0 25px 50px rgba(26, 54, 93, 0.2)',
                duration: 0.4,
                ease: "power2.out"
            });
            
            // Add subtle glow effect
            gsap.to(this, {
                boxShadow: '0 25px 50px rgba(26, 54, 93, 0.2), 0 0 20px rgba(246, 173, 60, 0.1)',
                duration: 0.4,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                scale: 1,
                rotationY: 0,
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                duration: 0.4,
                ease: "power2.out"
            });
        });
    });
}

// Enhanced parallax effect
function initParallaxEffects() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        gsap.to(hero, {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: hero,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }
    
    // Parallax for section backgrounds
    gsap.utils.toArray('.about, .services, .projects').forEach(section => {
        gsap.to(section, {
            yPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });
}

// Add loading animation
function showLoadingAnimation() {
    gsap.set("body", { overflow: "hidden" });
    
    const loader = document.createElement('div');
    loader.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #1a365d 0%, #2d5a87 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            flex-direction: column;
        ">
            <div style="
                width: 80px;
                height: 80px;
                border: 4px solid rgba(246, 173, 60, 0.3);
                border-top: 4px solid #f6ad3c;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-bottom: 20px;
            "></div>
            <h3 style="color: white; font-family: 'Segoe UI', sans-serif; font-weight: 600;">Loading...</h3>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(loader);
    
    // Remove loader after page loads
    window.addEventListener('load', () => {
        gsap.to(loader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                loader.remove();
                gsap.set("body", { overflow: "auto" });
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    showLoadingAnimation();
    createEnhancedParticles();
    initScrollAnimations();
    initProjectTabs();
    initContactForm();
    initMobileMenu();
    initCardHoverEffects();
    initParallaxEffects();
    
    // Add some random floating animations to decorative elements
    gsap.utils.toArray('.service-icon, .team-avatar').forEach((element, index) => {
        gsap.to(element, {
            y: Math.sin(index) * 10,
            rotation: Math.cos(index) * 5,
            duration: 3 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.2
        });
    });
    
    // Add breathing animation to CTA buttons
    gsap.to('.btn-primary', {
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
});

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #f6ad3c 0%, #ed8936 100%);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
addScrollProgress();
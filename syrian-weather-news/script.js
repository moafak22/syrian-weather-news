// ============================================
// Syrian Weather News - JavaScript
// Pure vanilla JavaScript - No frameworks
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Mobile Navigation Toggle
    // ============================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a nav link
        const navLinks = document.querySelectorAll('.nav-menu li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // ============================================
    // Smooth Scrolling for Navigation Links
    // ============================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // Header Scroll Effect
    // ============================================
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    // ============================================
    // Weather Cards Animation on Scroll
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe weather cards
    const weatherCards = document.querySelectorAll('.weather-card');
    weatherCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        fadeInObserver.observe(card);
    });
    
    // Observe team members
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        member.style.transitionDelay = `${index * 0.1}s`;
        fadeInObserver.observe(member);
    });
    
    // Observe process steps
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        step.style.transitionDelay = `${index * 0.15}s`;
        fadeInObserver.observe(step);
    });
    
    // ============================================
    // Gallery Tabs Functionality
    // ============================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const galleryContents = document.querySelectorAll('.gallery-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all gallery contents
            galleryContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show target gallery content
            const targetContent = document.querySelector(`[data-content="${targetTab}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // ============================================
    // Weather Card Interactive Effects
    // ============================================
    weatherCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.weather-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.weather-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        // Click effect - could be used for showing more details
        card.addEventListener('click', function() {
            const region = this.getAttribute('data-region');
            console.log(`Weather card clicked: ${region}`);
            // You can add modal or detail view functionality here
        });
    });
    
    // ============================================
    // Gallery Image Zoom Effect
    // ============================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img && img.src) {
                // Simple zoom effect - could be enhanced with a modal
                console.log('Image clicked:', img.alt);
                // You can add lightbox/modal functionality here
            }
        });
    });
    
    // ============================================
    // Counter Animation for Numbers
    // ============================================
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16); // 60 FPS
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }
    
    // ============================================
    // Parallax Effect for Hero Section
    // ============================================
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
    
    // ============================================
    // Dynamic Time-based Greeting
    // ============================================
    function updateGreeting() {
        const hour = new Date().getHours();
        let greeting = 'Welcome to Syrian Weather News';
        
        if (hour >= 5 && hour < 12) {
            greeting = 'Good Morning - صباح الخير';
        } else if (hour >= 12 && hour < 17) {
            greeting = 'Good Afternoon - مساء الخير';
        } else if (hour >= 17 && hour < 22) {
            greeting = 'Good Evening - مساء الخير';
        } else {
            greeting = 'Good Night - تصبح على خير';
        }
        
        // You can display this greeting somewhere if needed
        console.log(greeting);
    }
    
    updateGreeting();
    
    // ============================================
    // Scroll to Top Button (Optional Enhancement)
    // ============================================
    function createScrollToTopButton() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '↑';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #2c5aa0;
            color: white;
            border: none;
            font-size: 24px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        `;
        
        document.body.appendChild(scrollBtn);
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.transform = 'scale(1)';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.transform = 'scale(0.8)';
            }
        });
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        scrollBtn.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#5b9bd5';
            this.style.transform = 'scale(1.1)';
        });
        
        scrollBtn.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#2c5aa0';
            this.style.transform = 'scale(1)';
        });
    }
    
    createScrollToTopButton();
    
    // ============================================
    // Loading Animation Complete
    // ============================================
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // ============================================
    // Weather Data Update Simulation (Optional)
    // ============================================
    function updateWeatherData() {
        // This is a placeholder for dynamic weather updates
        // In a real application, you would fetch data from an API
        console.log('Weather data could be updated here');
    }
    
    // Update weather every 5 minutes (optional)
    // setInterval(updateWeatherData, 300000);
    
    // ============================================
    // Console Welcome Message
    // ============================================
    console.log('%c Syrian Weather News ', 'background: #2c5aa0; color: white; font-size: 20px; padding: 10px;');
    console.log('%c Website loaded successfully! ', 'color: #5b9bd5; font-size: 14px;');
    
    // ============================================
    // Performance Monitoring (Optional)
    // ============================================
    window.addEventListener('load', function() {
        if (window.performance) {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${pageLoadTime}ms`);
        }
    });
    
    // ============================================
    // Add subtle animations to section titles
    // ============================================
    const sectionTitles = document.querySelectorAll('.section-title');
    
    const titleObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(-20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                titleObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sectionTitles.forEach(title => {
        titleObserver.observe(title);
    });
    
});

// ============================================
// Utility Functions
// ============================================

// Debounce function for performance optimization
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================================
// Error Handling
// ============================================
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
});

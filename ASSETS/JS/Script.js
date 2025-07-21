// Mobile Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-navigation');
  const overlay = document.createElement('div');
  overlay.className = 'mobile-menu-overlay';
  document.body.appendChild(overlay);

  mobileToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    mobileNav.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  overlay.addEventListener('click', function() {
    mobileToggle.classList.remove('active');
    mobileNav.classList.remove('active');
    this.classList.remove('active');
    document.body.classList.remove('no-scroll');
  });

  // Mobile submenu toggle
  const mobileSubmenus = document.querySelectorAll('.mobile-has-submenu > a');
  mobileSubmenus.forEach(item => {
    item.addEventListener('click', function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const submenu = this.nextElementSibling;
        const icon = this.querySelector('.mobile-dropdown-icon');
        
        if (submenu.style.display === 'block') {
          submenu.style.display = 'none';
          icon.textContent = '▼';
        } else {
          submenu.style.display = 'block';
          icon.textContent = '▲';
        }
      }
    });
  });
});

  /* Gallery start*/

 // Gallery Carousel Functionality
    document.addEventListener("DOMContentLoaded", () => {
      // Elements
      const slides = document.querySelectorAll('.gc-carousel input');
      const navDots = document.querySelectorAll('.gc-nav-dot');
      const totalSlides = slides.length;
      let currentSlide = 0;
      let slideInterval;
      let isAutoRotating = true;
      let touchStartX = 0;
      let touchEndX = 0;
      const SWIPE_THRESHOLD = 50;

      // Initialize
      function initCarousel() {
        updateActiveDot();
        startAutoRotation();
        setupEventListeners();
        setupIntersectionObserver();
      }

      // Update active navigation dot
      function updateActiveDot() {
        navDots.forEach((dot, i) => {
          dot.classList.toggle('active', i === currentSlide);
        });
      }

      // Go to specific slide
      function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        
        slides[currentSlide].checked = false;
        currentSlide = index;
        slides[currentSlide].checked = true;
        updateActiveDot();
      }

      // Next slide
      function nextSlide() {
        goToSlide(currentSlide + 1);
      }

      // Previous slide
      function prevSlide() {
        goToSlide(currentSlide - 1);
      }

      // Start auto rotation
      function startAutoRotation() {
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(() => {
          if (isAutoRotating) nextSlide();
        }, 4000);
      }

      // Setup event listeners
      function setupEventListeners() {
        const carousel = document.querySelector('.gc-carousel');
        
        // Mouse events
        carousel.addEventListener('mouseenter', () => {
          isAutoRotating = false;
        });
        
        carousel.addEventListener('mouseleave', () => {
          isAutoRotating = true;
          startAutoRotation();
        });

        // Navigation dots
        navDots.forEach((dot, i) => {
          dot.addEventListener('click', () => {
            goToSlide(i);
            startAutoRotation();
          });
        });

        // Touch events for mobile swipe
        carousel.addEventListener('touchstart', e => {
          touchStartX = e.changedTouches[0].screenX;
          isAutoRotating = false;
        }, { passive: true });

        carousel.addEventListener('touchend', e => {
          touchEndX = e.changedTouches[0].screenX;
          handleSwipe();
          isAutoRotating = true;
          startAutoRotation();
        }, { passive: true });
      }

      // Handle swipe gestures
      function handleSwipe() {
        if (touchEndX < touchStartX - SWIPE_THRESHOLD) {
          nextSlide();
        } else if (touchEndX > touchStartX + SWIPE_THRESHOLD) {
          prevSlide();
        }
      }

      // Intersection Observer for animations
      function setupIntersectionObserver() {
        const heading = document.querySelector(".gc-gallery-heading");
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate");
            }
          });
        }, { threshold: 0.2 });

        observer.observe(heading);
      }

      // Initialize the carousel
      initCarousel();
    });
  /* Gallery end */

/* Scroll to Top Button Functionality */
      document.addEventListener('DOMContentLoaded', function() {
    const scrollButton = document.getElementById('kt-scroll-up');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        scrollButton.classList.add('scroll-visible');
      } else {
        scrollButton.classList.remove('scroll-visible');
      }
    });

    // Smooth scroll to top
    scrollButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });
/* Scroll to Top Button Functionality end */


function adjustOrbitLayout() {
    const orbitItems = document.querySelectorAll('.orbit-item');

    if (window.innerWidth <= 768) {
      // Mobile: stack items vertically
      orbitItems.forEach((item) => {
        item.style.position = 'relative';
        item.style.top = 'auto';
        item.style.left = 'auto';
        item.style.transform = 'none';
        item.style.margin = '20px 0';
      });
    } else {
      // Desktop: apply orbit
      orbitItems.forEach((item) => {
        const angle = item.style.getPropertyValue('--angle');
        const orbitRadius = getComputedStyle(document.documentElement)
                              .getPropertyValue('--orbit-radius');

        item.style.position = 'absolute';
        item.style.top = '50%';
        item.style.left = '50%';
        item.style.margin = 'calc(-1 * var(--service-circle-size) / 2)';
        item.style.transform = `rotate(${angle}) translateX(${orbitRadius}) rotate(calc(-1 * ${angle}))`;
      });
    }
  }

  // Initial call
  adjustOrbitLayout();

  // Re-run on window resize
  window.addEventListener('resize', adjustOrbitLayout);
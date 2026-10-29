/**
 * Deepak | Developer Portfolio JavaScript Logic
 * Enhanced with Formspree Integration
 * 
 * - Sticky Navbar Header & Glassmorphic Backdrop
 * - Active Navigation Link Highlighting (IntersectionObserver)
 * - Mobile Navigation Menu Drawer Toggle & Morphing Hamburger
 * - Animated Stats Suffixes & Scroll-Triggered Progress Bars
 * - Real-time Form Validation & Accessible Toast Notifications
 * - Formspree Integration for Email Submission
 * - Fully Interactive Live Demo Modals for All Featured Projects
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements Selection
  const html = document.documentElement;
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const navOverlay = document.getElementById('navOverlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const contactForm = document.getElementById('contactForm');
  const formSuccessToast = document.getElementById('formSuccessToast');
  const globalToast = document.getElementById('globalToast');
  const globalToastMsg = document.getElementById('globalToastMsg');

  // Set current year in footer
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     Theme Management: Auto-detect system preference (prefers-color-scheme)
     ========================================================================== */
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      html.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      html.setAttribute('data-theme', 'light');
    }
    // Otherwise dark mode is default (already set in HTML)
  };

  // Listen for system theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
      if (!localStorage.getItem('theme')) {
        html.setAttribute('data-theme', e.matches ? 'light' : 'dark');
      }
    });
  }

  // Theme toggle function (can be called via script console or future button)
  window.toggleTheme = () => {
    const current = html.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  initTheme();

  /* ==========================================================================
     1. Sticky Navbar Header Effect
     ========================================================================== */
  const handleScrollHeader = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScrollHeader, { passive: true });

  /* ==========================================================================
     2. Mobile Menu Toggle & Navigation Links Handling
     ========================================================================== */
  if (hamburgerBtn && navMenu) {
    const closeMobileMenu = () => {
      navMenu.classList.remove('open');
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      if (navOverlay) navOverlay.classList.remove('open');
      document.body.style.overflow = '';
    };

    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburgerBtn.classList.toggle('active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
      if (navOverlay) navOverlay.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', closeMobileMenu);
    }

    // Close mobile menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target) && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });

    // Keyboard navigation: Close menu on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  /* ==========================================================================
     3. Active Link Highlighting on Scroll (IntersectionObserver)
     ========================================================================== */
  const observerOptions = {
    root: null,
    rootMargin: '-10% 0px -40% 0px',  // Reduced from -20%/-50% for better accuracy
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));

        // Add active class to corresponding link
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  /* ==========================================================================
     4. Animated Counter Stats with Suffix Preservation
     ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const suffix = stat.getAttribute('data-suffix') !== null ? stat.getAttribute('data-suffix') : '';
      if (isNaN(target)) return;

      let count = 0;
      const duration = 1400; // ms
      const increment = Math.max(1, Math.ceil(target / (duration / 30)));

      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          stat.textContent = target + suffix;
          clearInterval(timer);
        } else {
          stat.textContent = count + suffix;
        }
      }, 30);
    });
  };

  const heroSection = document.getElementById('hero');
  if (heroSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          animateCounters();
          animatedStats = true;
        }
      });
    }, { threshold: 0.2 });

    statsObserver.observe(heroSection);
  }

  /* ==========================================================================
     5. Scroll-Triggered Skill Progress Bars Animation
     ========================================================================== */
  const skillBars = document.querySelectorAll('.progress-bar-fill');
  const skillsSection = document.getElementById('skills');
  if (skillsSection && skillBars.length > 0) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-progress') || '100%';
            bar.style.width = targetWidth;
          });
          skillsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    skillsObserver.observe(skillsSection);
  }

  /* ==========================================================================
     6. Contact Form Real-time Validation & Formspree Submission
     ========================================================================== */
  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    // Email regex pattern
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const validateField = (input, isValid) => {
      if (isValid) {
        input.classList.remove('invalid');
        input.setAttribute('aria-invalid', 'false');
      } else {
        input.classList.add('invalid');
        input.setAttribute('aria-invalid', 'true');
      }
      return isValid;
    };

    // Real-time typing & blur validation
    nameInput.addEventListener('blur', () => {
      validateField(nameInput, nameInput.value.trim().length > 0);
    });
    nameInput.addEventListener('input', () => {
      if (nameInput.classList.contains('invalid')) {
        validateField(nameInput, nameInput.value.trim().length > 0);
      }
    });

    emailInput.addEventListener('blur', () => {
      validateField(emailInput, isValidEmail(emailInput.value.trim()));
    });
    emailInput.addEventListener('input', () => {
      if (emailInput.classList.contains('invalid')) {
        validateField(emailInput, isValidEmail(emailInput.value.trim()));
      }
    });

    messageInput.addEventListener('blur', () => {
      validateField(messageInput, messageInput.value.trim().length >= 10);
    });
    messageInput.addEventListener('input', () => {
      if (messageInput.classList.contains('invalid')) {
        validateField(messageInput, messageInput.value.trim().length >= 10);
      }
    });

    // Form submit handler with Formspree integration
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Validate all fields
      const isNameValid = validateField(nameInput, nameInput.value.trim().length > 0);
      const isEmailValid = validateField(emailInput, isValidEmail(emailInput.value.trim()));
      const isMessageValid = validateField(messageInput, messageInput.value.trim().length >= 10);

      // If validation fails, stop here
      if (!isNameValid || !isEmailValid || !isMessageValid) {
        return;
      }

      // Disable button and show loading state
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span>';

      try {
        // Prepare form data for Formspree
        const formData = new FormData(contactForm);

        // Send to Formspree endpoint
        const response = await fetch('https://formspree.io/f/meaazqjg', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          // Success: Show success toast
          formSuccessToast.hidden = false;

          // Reset form
          contactForm.reset();
          nameInput.classList.remove('invalid');
          emailInput.classList.remove('invalid');
          messageInput.classList.remove('invalid');

          // Reset button
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;

          // Auto hide success toast after 6 seconds
          setTimeout(() => {
            formSuccessToast.hidden = true;
          }, 6000);
        } else {
          // Handle error response from Formspree
          throw new Error(`Formspree error: ${response.status}`);
        }
      } catch (error) {
        // Network or server error
        console.error('Form submission error:', error);

        // Show error message in toast (reuse formSuccessToast or create error variant)
        const errorMsg = 'Failed to send message. Please try again or email directly: ramraj101214@gmail.com';
        formSuccessToast.textContent = errorMsg;
        formSuccessToast.style.background = 'rgba(248, 113, 113, 0.1)'; // Red-ish
        formSuccessToast.hidden = false;

        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Auto hide error toast after 6 seconds
        setTimeout(() => {
          formSuccessToast.hidden = true;
          formSuccessToast.style.background = ''; // Reset background
          formSuccessToast.textContent = '✅ Thank you! Your message has been sent successfully. I\'ll get back to you soon.';
        }, 6000);
      }
    });
  }
});
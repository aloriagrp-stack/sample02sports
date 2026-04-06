import './style.css'

// Intersection Observer for Scroll Reveals
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.scroll-reveal').forEach(el => {
  revealObserver.observe(el);
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('bg-[#ffea00]/80', 'py-2');
    navbar.classList.remove('bg-[#ffea00]/50', 'py-3');
  } else {
    navbar.classList.remove('bg-[#ffea00]/80', 'py-2');
    navbar.classList.add('bg-[#ffea00]/50', 'py-3');
  }
});




// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Mini Interaction (Cart example)
const cartBtn = document.querySelector('button relative');
let cartCount = 0;

document.querySelectorAll('button').forEach(btn => {
  if(btn.querySelector('svg')?.innerHTML.includes('line x1="12" y1="5"')) {
    btn.addEventListener('click', () => {
      cartCount++;
      const badge = document.querySelector('nav .bg-accent');
      if(badge) {
        badge.textContent = cartCount;
        badge.classList.add('scale-125');
        setTimeout(() => badge.classList.remove('scale-125'), 200);
      }
    });
  }
});

// Hero Slider Logic
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((s, i) => {
    if (i === index) {
      s.classList.add('opacity-100');
      s.classList.remove('opacity-0');
    } else {
      s.classList.add('opacity-0');
      s.classList.remove('opacity-100');
    }
  });
  dots.forEach((d, i) => {
    d.classList.toggle('active-dot', i === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Auto slide every 4 seconds
let slideInterval = setInterval(nextSlide, 4000);

// Mobile Dropdown Toggle Logic (Smooth Animation)
const menuToggle = document.getElementById('menu-toggle');
const mobileDropdown = document.getElementById('mobile-dropdown');
const mobileLinks = document.querySelectorAll('.mobile-link');

function closeDropdown() {
  if (mobileDropdown) {
    mobileDropdown.classList.add('max-h-0', 'opacity-0');
    mobileDropdown.classList.remove('max-h-96', 'opacity-100');
  }
}

function openDropdown() {
  if (mobileDropdown) {
    mobileDropdown.classList.remove('max-h-0', 'opacity-0');
    mobileDropdown.classList.add('max-h-96', 'opacity-100');
  }
}

if (menuToggle && mobileDropdown) {
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isClosed = mobileDropdown.classList.contains('max-h-0');
    if (isClosed) {
      openDropdown();
    } else {
      closeDropdown();
    }
  });

  document.addEventListener('click', (e) => {
    if (!mobileDropdown.contains(e.target) && !menuToggle.contains(e.target)) {
      closeDropdown();
    }
  });
}

// Close when link clicked
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeDropdown();
  });
});

console.log('DEMO Performance System Initialized.');

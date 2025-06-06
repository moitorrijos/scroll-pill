import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins once
gsap.registerPlugin(ScrollTrigger);

// Import modular animations
import { pillScaleAnimation } from './pillScaleAnimation';
import { imagesOpacityAnimation } from './imagesOpacityAnimation';
import { fixedTextAnimation } from './fixedTextAnimation';
import { fixedHeadingAnimation } from './fixedHeadingAnimation';

// Handle window resize events globally
window.addEventListener('resize', () => {
  // Reset scroll position on resize for better user experience
  window.scrollTo({ top: 0, behavior: 'auto' });
  // Refresh all ScrollTrigger instances
  ScrollTrigger.refresh();
});

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
  pillScaleAnimation();
  imagesOpacityAnimation();
  fixedTextAnimation();
  fixedHeadingAnimation();
});


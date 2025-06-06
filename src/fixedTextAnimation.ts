import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function fixedTextAnimation() {
  const fixedText = document.querySelector('.fixed-text') as HTMLElement;
  const mainContainer = document.querySelector('.main-container') as HTMLElement;

  // Early return if required elements don't exist
  if (!fixedText || !mainContainer) {
    console.warn('Fixed text animation: Required elements not found');
    return;
  }

  const heading = fixedText.querySelector('h1');
  const subheading = fixedText.querySelector('h2');
  const ctaButton = fixedText.querySelector('.cta');

  // Make sure all child elements exist
  if (!heading || !subheading || !ctaButton) {
    console.warn('Fixed text animation: Child elements not found');
    return;
  }

  // First make the container visible
  gsap.to(fixedText, {
    opacity: 1,
    duration: 0.01,
    scrollTrigger: {
      trigger: ".main-container",
      start: "top top",
      toggleActions: "play none none reverse",
      markers: {
        startColor: "transparent",
        endColor: "transparent",
        fontSize: "1px",
      },
    },
    onComplete: animateChildElements
  });

  // Animation function for child elements
  function animateChildElements() {
    // Set initial state
    gsap.set([heading, subheading, ctaButton], { opacity: 0, y: 30 });

    // Animate heading
    gsap.to(heading, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: createScrollTrigger()
    });

    // Animate subheading
    gsap.to(subheading, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: 0.1,
      ease: "power2.out",
      scrollTrigger: createScrollTrigger()
    });

    // Animate CTA button
    gsap.to(ctaButton, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      delay: 0.3,
      ease: "power2.out",
      scrollTrigger: createScrollTrigger()
    });
  }

  // Create consistent ScrollTrigger configuration
  function createScrollTrigger() {
    return {
      trigger: ".main-container",
      start: "bottom bottom",
      toggleActions: "play none none reverse",
    };
  }
}

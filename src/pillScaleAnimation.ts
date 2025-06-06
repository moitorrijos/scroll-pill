import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function pillScaleAnimation() {
  const maskedContent = document.querySelector('.masked-content') as HTMLElement;
  const fixedContent = document.querySelector('.fixed-content') as HTMLElement;

  // Early return if required elements don't exist
  if (!maskedContent || !fixedContent) {
    console.warn('Pill scale animation: Required elements not found');
    return;
  }

  let currentScale = 1;

  /**
   * Calculate the appropriate scale based on viewport dimensions
   * relative to the pill's original dimensions
   */
  function getResponsiveScale() {
    // Original pill dimensions
    const pillWidth = 536;
    const pillHeight = 240;

    // Target viewport dimensions with some extra space
    const vw = window.innerWidth * 1.4;
    const vh = window.innerHeight * 1.4;

    // Calculate scale factors
    const scaleX = vw / pillWidth;
    const scaleY = vh / pillHeight;

    // Return the smaller scale with a maximum limit
    return Math.min(scaleX, scaleY, 12);
  }

  let targetScale = getResponsiveScale();

  // Set initial transform
  fixedContent.style.transform = `scale(${1 / currentScale})`;

  // Create the scale animation
  gsap.to(maskedContent, {
    scale: () => targetScale,
    transformOrigin: "50% 50%",
    scrollTrigger: {
      trigger: ".main-container",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: () => {
        currentScale = gsap.getProperty(maskedContent, "scale") as number;
        fixedContent.style.transform = `scale(${1 / currentScale})`;
      }
    }
  });
}

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function fixedHeadingAnimation() {
  const fixedHeading = document.querySelector('.fixed-heading') as HTMLElement;
  const leftSide = fixedHeading?.querySelector('.left-side') as HTMLElement;
  const rightSide = fixedHeading?.querySelector('.right-side') as HTMLElement;
  const mainContainer = document.querySelector('.main-container') as HTMLElement;

  // Early return if required elements don't exist
  if (!leftSide || !rightSide || !mainContainer || !fixedHeading) {
    console.warn('Fixed heading animation: Required elements not found');
    return;
  }

  // Reset initial positions
  gsap.set(leftSide, { x: 0 });
  gsap.set(rightSide, { x: 0 });

  // Create common ScrollTrigger configuration
  const triggerConfig = {
    trigger: mainContainer,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
  };

  // Animate left side moving left
  gsap.to(leftSide, {
    x: () => `-${window.innerWidth / 2}px`,
    scrollTrigger: triggerConfig,
  });

  // Animate right side moving right
  gsap.to(rightSide, {
    x: () => `${window.innerWidth / 2}px`,
    scrollTrigger: triggerConfig,
  });
}

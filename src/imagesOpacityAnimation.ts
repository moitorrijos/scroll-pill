import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function imagesOpacityAnimation() {
  const images = document.querySelectorAll<HTMLLIElement>('.fixed-images li');
  const mainContainer = document.querySelector('.main-container') as HTMLElement;

  // Early return if required elements don't exist
  if (!images.length || !mainContainer) {
    console.warn('Images opacity animation: Required elements not found');
    return;
  }

  const numImages = images.length;

  // Only run animation if we have multiple images
  if (numImages <= 1) {
    return;
  }

  const totalScrollHeight = mainContainer.scrollHeight;
  const segmentHeight = totalScrollHeight / numImages;
  const transitionDelayFactor = 0.5; // Start transition after 50% of segment

  images.forEach((image, index) => {
    // Last image should always remain visible
    if (index === numImages - 1) {
      gsap.set(image, { opacity: 1 });
      return;
    }

    const fadeStartPosition = index * segmentHeight + segmentHeight * transitionDelayFactor;
    const fadeEndPosition = (index + 1) * segmentHeight;

    gsap.fromTo(
      image,
      { opacity: 1 },
      {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".main-container",
          start: `top+=${fadeStartPosition}vh top`,
          end: `top+=${fadeEndPosition}vh top`,
          scrub: true,
        }
      }
    );
  });
}

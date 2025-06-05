import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function pillScaleAnimation() {
  const maskedContent = document.querySelector('.masked-content') as HTMLElement;
  const fixedContent = document.querySelector('.fixed-content') as HTMLElement;

  let currentScale = 1;

  function getResponsiveScale() {
    const pillWidth = 536;
    const pillHeight = 240;
    const vw = window.innerWidth * 1.4;
    const vh = window.innerHeight * 1.4;
    const scaleX = vw / pillWidth;
    const scaleY = vh / pillHeight;
    return Math.min(scaleX, scaleY, 12);
  }

  let targetScale = getResponsiveScale();

  window.addEventListener('resize', () => {
    targetScale = getResponsiveScale();
    window.scrollTo({ top: 0, behavior: 'auto' });
    ScrollTrigger.refresh();
  });

  fixedContent.style.transform = `scale(${1 / currentScale})`;

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

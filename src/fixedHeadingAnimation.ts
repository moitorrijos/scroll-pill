import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function fixedHeadingAnimation() {
  const fixedHeading = document.querySelector('.fixed-heading') as HTMLElement;
  const leftSide = fixedHeading?.querySelector('.left-side') as HTMLElement;
  const rightSide = fixedHeading?.querySelector('.right-side') as HTMLElement;
  const mainContainer = document.querySelector('.main-container') as HTMLElement;

  if (leftSide && rightSide && mainContainer) {
    gsap.set(leftSide, { x: 0 });
    gsap.set(rightSide, { x: 0 });

    gsap.to(leftSide, {
      x: () => `-${window.innerWidth / 2}px`,
      scrollTrigger: {
        trigger: mainContainer,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    gsap.to(rightSide, {
      x: () => `${window.innerWidth / 2}px`,
      scrollTrigger: {
        trigger: mainContainer,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    });

    window.addEventListener('resize', () => {
      ScrollTrigger.refresh();
    });
  }
}

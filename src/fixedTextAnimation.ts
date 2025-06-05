import { gsap } from 'gsap';

export function fixedTextAnimation() {
  const fixedText = document.querySelector('.fixed-text') as HTMLElement;
  const mainContainer = document.querySelector('.main-container') as HTMLElement;
  if (fixedText && mainContainer) {
    const h1 = fixedText.querySelector('h1');
    const h2 = fixedText.querySelector('h2');
    const cta = fixedText.querySelector('.cta');

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
      onComplete: () => {
        if (h1 && h2 && cta) {
          gsap.set([h1, h2, cta], { opacity: 0, y: 30 });

          gsap.to(h1, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".main-container",
              start: "bottom bottom",
              toggleActions: "play none none reverse",
            },
          });
          gsap.to(h2, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".main-container",
              start: "bottom bottom",
              toggleActions: "play none none reverse",
            },
          });
          gsap.to(cta, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".main-container",
              start: "bottom bottom",
              toggleActions: "play none none reverse",
            },
          });
        }
      }
    });
  }
}

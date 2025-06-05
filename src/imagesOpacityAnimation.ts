import { gsap } from 'gsap';

export function imagesOpacityAnimation() {
  const images = document.querySelectorAll<HTMLLIElement>('.fixed-images li');
  const mainContainer = document.querySelector('.main-container') as HTMLElement;
  const numImages = images.length;

  if (numImages > 1 && mainContainer) {
    const totalScroll = mainContainer.scrollHeight;
    const segment = totalScroll / numImages;
    const delayFraction = 0.5;

    images.forEach((img, i) => {
      if (i === numImages - 1) {
        gsap.set(img, { opacity: 1 });
        return;
      }
      const delayStart = i * segment + segment * delayFraction;
      const fadeEnd = (i + 1) * segment;

      gsap.fromTo(
        img,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".main-container",
            start: `top+=${delayStart}vh top`,
            end: `top+=${fadeEnd}vh top`,
            scrub: true,
          }
        }
      );
    });
  }
}

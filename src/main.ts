import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const maskedContent = document.querySelector('.masked-content') as HTMLElement;
const fixedContent = document.querySelector('.fixed-content') as HTMLElement;
const mainContainer = document.querySelector('.main-container') as HTMLElement;

let currentScale = 1;

// Set initial transform for fixedContent
fixedContent.style.transform = `scale(${1 / currentScale})`;

function getResponsiveScale() {
  // The original pill width/height
  const pillWidth = 536;
  const pillHeight = 240;
  // Get viewport dimensions
  const vw = window.innerWidth * 1.4;
  const vh = window.innerHeight * 1.4;
  // Calculate max scale that fits in viewport
  const scaleX = vw / pillWidth;
  const scaleY = vh / pillHeight;
  // Limit scale to a maximum 
  return Math.min(scaleX, scaleY, 5);
}

let targetScale = getResponsiveScale();

window.addEventListener('resize', () => {
  targetScale = getResponsiveScale();
  // Optionally, update the GSAP tween if needed
});

// Animate the pill scale using GSAP ScrollTrigger
gsap.to(maskedContent, {
  scale: () => targetScale,
  transformOrigin: "50% 50%",
  scrollTrigger: {
    trigger: ".main-container",
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    onUpdate: () => {
      // Get the current scale value from the tween
      currentScale = gsap.getProperty(maskedContent, "scale") as number;
      // Inversely scale the fixedContent to keep it visually the same size
      fixedContent.style.transform = `scale(${1 / currentScale})`;
    }
  }
});

// Animate opacity for each image using individual ScrollTriggers based on scroll height
const images = document.querySelectorAll<HTMLLIElement>('.fixed-images li');
const numImages = images.length;

if (numImages > 1 && mainContainer) {
  const totalScroll = mainContainer.scrollHeight; // main-container height in vh
  const segment = totalScroll / numImages; // Each image's segment in vh
  const delayFraction = 0.5; // 50% delay, 50% fade

  images.forEach((img, i) => {
    if (i === numImages - 1) {
      // Last image always visible
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
const fixedText = document.querySelector('.fixed-text') as HTMLElement;
if (fixedText && mainContainer) {
  const h1 = fixedText.querySelector('h1');
  const h2 = fixedText.querySelector('h2');
  const cta = fixedText.querySelector('.cta');

  // Animate container opacity in, then animate children
  gsap.to(fixedText, {
    opacity: 1,
    duration: 0.01,
    scrollTrigger: {
      trigger: ".main-container",
      start: "top top",
      toggleActions: "play none none reverse",
      markers: true // for debugging, remove after
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
            // markers: true // for debugging, remove after
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
            // markers: true // for debugging, remove after
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
            // markers: true // for debugging, remove after
          },
        });
      }
    }
  });
}
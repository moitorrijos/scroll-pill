import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const maskedContent = document.querySelector('.masked-content') as HTMLElement;
const fixedContent = document.querySelector('.fixed-content') as HTMLElement;

let currentScale = 1;

// Animate the pill scale using GSAP ScrollTrigger
gsap.to(maskedContent, {
  scale: 12,
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

// Set initial transform for fixedContent
fixedContent.style.transform = "scale(1)";


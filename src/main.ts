const maskedContent = document.querySelector('.masked-content') as SVGElement;
const fixedContent = document.querySelector('.fixed-content') as SVGElement;

function updatePillScale() {
  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = Math.min(Math.max(scrollY / docHeight, 0), 1);
  const scale = 1 + 11 * progress;
  maskedContent.style.transform = `translate(-50%, -50%) scale(${scale})`;
  maskedContent.style.transformOrigin = "50% 50%";
  fixedContent.style.transform = `scale(${1 / scale})`;
}

window.addEventListener('scroll', updatePillScale);
window.addEventListener('resize', updatePillScale);
updatePillScale();


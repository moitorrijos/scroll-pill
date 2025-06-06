/**
 * Helper function to safely query DOM elements
 * Returns the element if found, or null if not found
 */
export function getElement<T extends HTMLElement>(selector: string): T | null {
  return document.querySelector<T>(selector);
}

/**
 * Helper function to safely query multiple DOM elements
 * Returns a NodeList of matching elements, which may be empty
 */
export function getElements<T extends HTMLElement>(selector: string): NodeListOf<T> {
  return document.querySelectorAll<T>(selector);
}

/**
 * Helper function to check if all required elements exist
 * Logs a warning and returns false if any element is missing
 */
export function validateElements(
  elements: (HTMLElement | null)[],
  animationName: string
): boolean {
  const allElementsExist = elements.every(element => element !== null);

  if (!allElementsExist) {
    console.warn(`${animationName}: Required elements not found`);
  }

  return allElementsExist;
}

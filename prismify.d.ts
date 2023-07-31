/**
 * Prismifies a given element
 * Adds the "prismify" class and "active" and "prismified" attributes to the passed element.
 * @param el The element to prismify
 */
export function prismifyElement(el: HTMLElement): void
/**
 * Prismifies all elements with the "prismify" class within the root element or page.
 * @param root If set, only prismifies elements inside the given element. Otherwise, prismifies the whole document.
 */
export function prismifyOnPage(root?: HTMLElement): void

/**
 * Prismifies a given element
 * Adds the "prismify" class and "active" and "prismified" attributes to the passed element.
 * @param el {HTMLElement} The element to prismify
 */
export function prismifyElement(el) {
  if (el.childNodes.length === 0) throw new Error("No element to prismify")
  if (el.childNodes.length > 1)
    throw new Error(
      "There must be one element to prismify. Wrap multiple elements in one <span> or <div>"
    )

  const node = el.childNodes[0]

  let contentEl
  if (node.nodeType === Node.ELEMENT_NODE) {
    contentEl = node
  } else if (node.nodeType === Node.TEXT_NODE) {
    contentEl = document.createElement("span")
    contentEl.innerText = node.nodeValue
    node.remove()
    el.appendChild(contentEl)
  } else {
    throw new Error("Unknown node type")
  }

  el.classList.add("prismify")

  const layerCountStr = getComputedStyle(el).getPropertyValue("--layer-count")
  let layerCount
  if (layerCountStr === "") layerCount = 50
  else {
    layerCount = parseInt(layerCountStr, 10)
  }

  for (let layerN = 0; layerN < layerCount; layerN += 1) {
    // Reuse the original content node for the final layer
    const layerEl =
      layerN === layerCount - 1 ? contentEl : contentEl.cloneNode(true)
    layerEl.style.setProperty(
      "--index",
      ((layerCount - layerN) / layerCount).toString()
    )
    el.insertBefore(layerEl, contentEl)
  }

  el.setAttribute("prismified", "")
  el.setAttribute("active", "")
}

/**
 * Prismifies all elements with the "prismify" class within the root element or page.
 * @param root {HTMLElement} If set, only prismifies elements inside the given element. Otherwise, prismifies the whole document.
 */
export function prismifyOnPage(root = document) {
  const toPrismify = root.querySelectorAll(".prismify:not([prismified])")
  for (const el of toPrismify) {
    try {
      prismifyElement(el)
    } catch (err) {
      console.error(err)
    }
  }
}

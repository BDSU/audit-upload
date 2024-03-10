export function copyToClipboard(
  content: string,
  asHtml: boolean,
  fallbackElement?: HTMLDivElement
) {
  if (asHtml) {
    if (fallbackElement) return copyToClipboardFallback(fallbackElement)

    const text = new Blob([content], { type: "text/html" })
    const item = new ClipboardItem({
      "text/html": text,
    })
    return navigator.clipboard.write([item])
  }

  return navigator.clipboard.writeText(content)
}

async function copyToClipboardFallback(element: HTMLDivElement) {
  if (!window || !window.getSelection() || !document) {
    console.error(
      "copyToClipboardFallback: window, window.getSelection() or document is not defined"
    )
  }

  const range = document.createRange()
  range.setStartBefore(element)
  range.setEndAfter(element)
  window.getSelection()?.removeAllRanges()
  window.getSelection()?.addRange(range)
  document.execCommand("copy")
  window.getSelection()?.removeAllRanges()
}

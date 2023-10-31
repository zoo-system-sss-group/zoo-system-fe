import DOMPurify from "dompurify";

export function cleanContent(content) {
  const cleanedContent = document.createElement("div");
  cleanedContent.innerHTML = DOMPurify.sanitize(content).toString();
  return cleanedContent.textContent;
}

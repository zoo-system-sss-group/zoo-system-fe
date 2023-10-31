<<<<<<< HEAD
import DOMPurify from "dompurify";

export function cleanContent(content) {
  const cleanedContent = document.createElement("div");
  cleanedContent.innerHTML = DOMPurify.sanitize(content).toString();
  return cleanedContent.textContent;
}
=======
function formatVndCurrency(amount) {
    if (typeof amount !== 'number' || isNaN(amount)) {
      return 'Invalid input';
    }
  
    const formattedAmount = amount.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });
  
    return formattedAmount;
  }
  
  export { formatVndCurrency };
>>>>>>> cb4182559b32e0558f08ccba03ebda6b77a39c96

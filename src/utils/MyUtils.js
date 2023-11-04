import DOMPurify from "dompurify";

export function cleanContent(content) {
	const cleanedContent = document.createElement("div");
	cleanedContent.innerHTML = DOMPurify.sanitize(content).toString();
	return cleanedContent.textContent;
}
function formatVndCurrency(amount) {
	if (typeof amount !== "number" || isNaN(amount)) {
		return "Invalid input";
	}

	const formattedAmount = amount.toLocaleString("vi-VN", {
		style: "currency",
		currency: "VND",
	});

	return formattedAmount;
}

export { formatVndCurrency };
export function uuidv4() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0,
			v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

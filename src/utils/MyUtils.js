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
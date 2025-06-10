// Utility functions for formatting data

// Format currency
export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return '$0.00';
  
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Format date
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

// Format percentage
export const formatPercentage = (value) => {
  if (value === undefined || value === null) return '0%';
  
  return `${parseFloat(value).toFixed(2)}%`;
};

export default {
  formatCurrency,
  formatDate,
  formatPercentage
};
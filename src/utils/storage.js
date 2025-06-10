// Utility functions for localStorage management

// Client Data
export const getClientData = () => {
  try {
    const data = localStorage.getItem('cooperSlip_clientData');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting client data:', error);
    return null;
  }
};

export const saveClientData = (data) => {
  try {
    localStorage.setItem('cooperSlip_clientData', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving client data:', error);
  }
};

// Products
export const getProducts = () => {
  try {
    const data = localStorage.getItem('cooperSlip_products');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
};

export const saveProducts = (products) => {
  try {
    localStorage.setItem('cooperSlip_products', JSON.stringify(products));
  } catch (error) {
    console.error('Error saving products:', error);
  }
};

// Discounts
export const getDiscounts = () => {
  try {
    const data = localStorage.getItem('cooperSlip_discounts');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting discounts:', error);
    return [];
  }
};

export const saveDiscounts = (discounts) => {
  try {
    localStorage.setItem('cooperSlip_discounts', JSON.stringify(discounts));
  } catch (error) {
    console.error('Error saving discounts:', error);
  }
};

// Clear all data
export const clearAllData = () => {
  try {
    localStorage.removeItem('cooperSlip_clientData');
    localStorage.removeItem('cooperSlip_products');
    localStorage.removeItem('cooperSlip_discounts');
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};

export default {
  getClientData,
  saveClientData,
  getProducts,
  saveProducts,
  getDiscounts,
  saveDiscounts,
  clearAllData
};
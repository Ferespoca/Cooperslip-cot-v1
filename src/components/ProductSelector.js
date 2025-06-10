import React, { useState, useEffect } from 'react';
import { getProducts, saveProducts, getClientData } from '../utils/storage';
import { getProductList } from '../mock/products';

const ProductSelector = ({ onSubmit }) => {
  const [products, setProducts] = useState(() => {
    return getProducts() || [];
  });
  
  const [newProduct, setNewProduct] = useState({
    reference: '',
    model: '',
    panelType: 'verde',
    quantity: '',
    bundles: 0,
    weight: 0, // Este será el peso total calculado
    priceGreen: 0,
    priceBlack: 0
  });
  
  const clientData = getClientData();
  const priceListType = clientData ? clientData.priceList : 'LGRAL'; // Actualizado el valor por defecto
  const productList = getProductList(priceListType);
  
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'reference') {
      const selectedProduct = productList.find(p => p.reference === value) || {};
      const currentQuantity = parseInt(newProduct.quantity, 10) || 0;
      const calculatedWeight = selectedProduct.weightPerUnit ? selectedProduct.weightPerUnit * currentQuantity : 0;

      setNewProduct({
        ...newProduct,
        reference: value,
        model: selectedProduct.model || '',
        bundles: Math.floor(currentQuantity / 10),
        weight: calculatedWeight,
        priceGreen: selectedProduct.priceGreen || 0,
        priceBlack: selectedProduct.priceBlack || 0
      });
    } else if (name === 'quantity') {
      const parsedQuantity = parseInt(value, 10) || 0;
      const calculatedBundles = Math.floor(parsedQuantity / 10);
      const selectedProduct = productList.find(p => p.reference === newProduct.reference) || {};
      const calculatedWeight = selectedProduct.weightPerUnit ? selectedProduct.weightPerUnit * parsedQuantity : 0;

      setNewProduct({
        ...newProduct,
        quantity: value,
        bundles: calculatedBundles,
        weight: calculatedWeight
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value
      });
    }
  };
  
  const addProduct = () => {
    const quantityValue = parseInt(newProduct.quantity, 10);
    if (!newProduct.reference || isNaN(quantityValue) || quantityValue <= 0) {
      alert('Por favor seleccione un producto y especifique una cantidad válida.');
      return;
    }
    
    const productExists = products.findIndex(p => 
      p.reference === newProduct.reference && p.panelType === newProduct.panelType
    );
    
    const selectedProductBase = productList.find(p => p.reference === newProduct.reference) || {};
    const weightPerUnit = selectedProductBase.weightPerUnit || 0;

    if (productExists >= 0) {
      const updatedProducts = [...products];
      updatedProducts[productExists].quantity += quantityValue;
      updatedProducts[productExists].bundles = Math.floor(updatedProducts[productExists].quantity / 10);
      updatedProducts[productExists].weight = updatedProducts[productExists].quantity * weightPerUnit;
      updatedProducts[productExists].total = (updatedProducts[productExists].panelType === 'verde' ? updatedProducts[productExists].priceGreen : updatedProducts[productExists].priceBlack) * updatedProducts[productExists].quantity;
      setProducts(updatedProducts);
    } else {
      const price = newProduct.panelType === 'verde' ? newProduct.priceGreen : newProduct.priceBlack;
      const total = price * quantityValue;
      
      setProducts([
        ...products,
        {
          ...newProduct,
          id: Date.now(),
          quantity: quantityValue,
          bundles: Math.floor(quantityValue / 10),
          weight: quantityValue * weightPerUnit,
          total
        }
      ]);
    }
    
    setNewProduct({
      reference: '',
      model: '',
      panelType: 'verde',
      quantity: '',
      bundles: 0,
      weight: 0,
      priceGreen: 0,
      priceBlack: 0
    });
  };
  
  const removeProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (products.length === 0) {
      alert('Por favor agregue al menos un producto a la lista.');
      return;
    }
    
    saveProducts(products);
    onSubmit(products);
  };
  
  useEffect(() => {
    saveProducts(products);
  }, [products]);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">Selección de Productos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Producto (N/REF)
          </label>
          <select
            name="reference"
            value={newProduct.reference}
            onChange={handleProductChange}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">Seleccionar producto</option>
            {productList.map((product) => (
              <option key={product.reference} value={product.reference}>
                {product.reference} - {product.model}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Panel
          </label>
          <select
            name="panelType"
            value={newProduct.panelType}
            onChange={handleProductChange}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="verde">Panel Verde</option>
            <option value="negra">Panel Negra</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cantidad
          </label>
          <div className="flex">
            <input
              type="number"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleProductChange}
              min="0"
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Cantidad"
            />
            <button
              type="button"
              onClick={addProduct}
              className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
      
      {products.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Productos Seleccionados</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N/REF</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modelo</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Atados</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peso</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{product.reference}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{product.model}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {product.panelType === 'verde' ? 'Verde' : 'Negra'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{product.quantity}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{product.bundles}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{product.weight.toFixed(2)} kg</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      ${product.panelType === 'verde' ? product.priceGreen.toFixed(2) : product.priceBlack.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">${product.total.toFixed(2)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <div className="mt-6 text-right">
        <button
          onClick={handleSubmit}
          disabled={products.length === 0}
          className={`px-6 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            products.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Agregar Productos a Cotización
        </button>
      </div>
    </div>
  );
};

export default ProductSelector;

// DONE
import React, { useState, useEffect } from 'react';
import { getDiscounts, saveDiscounts } from '../utils/storage';

const DiscountSelector = ({ onSubmit }) => {
  const [discounts, setDiscounts] = useState(() => {
    return getDiscounts() || [];
  });
  
  const [newDiscount, setNewDiscount] = useState({
    type: '',
    percentage: '',
    customType: ''
  });
  
  const discountTypes = [
    { id: 'loyalty', name: 'Descuento de lealtad' },
    { id: 'minimum', name: 'Descuento compra mínima' },
    { id: 'prompt', name: 'Descuento por pronto pago' },
    { id: 'special', name: 'Descuento especial' },
    { id: 'vip', name: 'Descuento especial VIP' },
    { id: 'custom', name: 'Otro (especificar)' }
  ];
  
  const handleDiscountChange = (e) => {
    const { name, value } = e.target;
    setNewDiscount({
      ...newDiscount,
      [name]: value
    });
  };
  
  const addDiscount = () => {
    if (!newDiscount.type || !newDiscount.percentage) {
      alert('Por favor seleccione un tipo de descuento y especifique un porcentaje.');
      return;
    }
    
    if (newDiscount.type === 'custom' && !newDiscount.customType) {
      alert('Por favor especifique el tipo de descuento personalizado.');
      return;
    }
    
    const percentage = parseFloat(newDiscount.percentage);
    if (isNaN(percentage) || percentage <= 0 || percentage > 100) {
      alert('Por favor ingrese un porcentaje válido entre 0 y 100.');
      return;
    }
    
    const discountName = newDiscount.type === 'custom' 
      ? newDiscount.customType 
      : discountTypes.find(d => d.id === newDiscount.type)?.name || '';
    
    const discountExists = discounts.findIndex(d => 
      d.type === newDiscount.type && 
      (newDiscount.type !== 'custom' || d.customType === newDiscount.customType)
    );
    
    if (discountExists >= 0) {
      const updatedDiscounts = [...discounts];
      updatedDiscounts[discountExists].percentage = percentage;
      setDiscounts(updatedDiscounts);
    } else {
      setDiscounts([
        ...discounts,
        {
          id: Date.now(),
          type: newDiscount.type,
          name: discountName,
          customType: newDiscount.type === 'custom' ? newDiscount.customType : '',
          percentage
        }
      ]);
    }
    
    setNewDiscount({
      type: '',
      percentage: '',
      customType: ''
    });
  };
  
  const removeDiscount = (id) => {
    setDiscounts(discounts.filter(discount => discount.id !== id));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    saveDiscounts(discounts);
    onSubmit(discounts);
  };
  
  useEffect(() => {
    saveDiscounts(discounts);
  }, [discounts]);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">Selección de Descuentos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Descuento
          </label>
          <select
            name="type"
            value={newDiscount.type}
            onChange={handleDiscountChange}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">Seleccionar descuento</option>
            {discountTypes.map((discount) => (
              <option key={discount.id} value={discount.id}>
                {discount.name}
              </option>
            ))}
          </select>
        </div>
        
        {newDiscount.type === 'custom' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Especificar Descuento
            </label>
            <input
              type="text"
              name="customType"
              value={newDiscount.customType}
              onChange={handleDiscountChange}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Nombre del descuento"
            />
          </div>
        )}
        
        <div className="flex items-end"> {/* Contenedor para alinear input y botón */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Porcentaje (%)
            </label>
            <input
              type="number"
              name="percentage"
              value={newDiscount.percentage}
              onChange={handleDiscountChange}
              min="0.01"
              max="100"
              step="0.01"
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-l-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Ej: 10"
            />
          </div>
          <button
            type="button"
            onClick={addDiscount}
            className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 h-[42px] mt-auto" // Ajuste de altura y margen
          >
            Agregar
          </button>
        </div>
      </div>
      
      {discounts.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Descuentos Seleccionados</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Descuento</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Porcentaje</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {discounts.map((discount) => (
                  <tr key={discount.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{discount.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{discount.percentage}%</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      <button
                        onClick={() => removeDiscount(discount.id)}
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
          disabled={discounts.length === 0}
          className={`px-6 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            discounts.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Agregar Descuentos a Cotización
        </button>
      </div>
    </div>
  );
};

export default DiscountSelector;

// DONE
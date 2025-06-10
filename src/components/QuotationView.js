import React from 'react';
import { formatCurrency } from '../utils/formatters';
import { getClientData, getProducts, getDiscounts } from '../utils/storage';

const QuotationView = () => {
  const clientData = getClientData() || {};
  const products = getProducts() || [];
  const discounts = getDiscounts() || [];
  
  const calculateSubtotal = () => {
    return products.reduce((sum, product) => sum + product.total, 0);
  };
  
  // Factor de descuento acumulativo para el subtotal general
  const calculateOverallDiscountFactor = () => {
    let factor = 1;
    discounts.forEach(discount => {
      factor /= (1 + (discount.percentage / 100));
    });
    return factor;
  };

  const overallDiscountFactor = calculateOverallDiscountFactor();
  
  const calculateDiscountAmount = (subtotal) => {
    return subtotal - (subtotal * overallDiscountFactor);
  };
  
  const subtotal = calculateSubtotal();
  const discountAmount = calculateDiscountAmount(subtotal);
  const subtotalAfterDiscount = subtotal - discountAmount;
  const iva = subtotalAfterDiscount * 0.16;
  const total = subtotalAfterDiscount + iva;

  // Cálculos para los nuevos campos
  const totalBundles = products.reduce((sum, product) => sum + product.bundles, 0);
  const totalWeight = products.reduce((sum, product) => sum + product.weight, 0);

  // Nueva fórmula para el identificador
  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, '0')}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getFullYear()).slice(-2)}`;
  
  const identifierValue = (subtotalAfterDiscount && totalWeight > 0)
    ? (subtotalAfterDiscount / totalWeight).toFixed(2)
    : '0.00';
  
  const identifier = `ID-${formattedDate}-${clientData.priceList || 'N/A'}-${identifierValue}`;

  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 print:shadow-none print:p-0 print:max-h-[279mm]">
      <div className="flex justify-between items-center mb-2 print:mb-1">
        <div className="flex items-center">
          <img 
            src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0XTeFlNq7MqavcHK34VzhrR2we8dDg6BAFCsl" 
            alt="Logo Cooper Slip" 
            className="h-8 mr-2 print:block" 
          />
          <h2 className="text-lg font-semibold">Cooper Slip Cotización</h2>
        </div>
        <button
          onClick={handlePrint}
          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 print:hidden text-sm"
        >
          Imprimir
        </button>
      </div>
      
      {/* Slogan */}
      <p className="text-center text-sm font-bold text-gray-700 mb-2 print:mb-1">
        ¡Si piensas en seguridad piensa en Cooper Slip!
      </p>

      {/* Encabezado superior con datos clave */}
      <div className="flex justify-between items-start mb-2 print:mb-1">
        <div className="text-right">
          <p className="text-xs font-medium">Cooper Slip Cotizador v1</p>
        </div>
        <div>
          <p className="text-xs text-gray-600">Cotización: {clientData.quoteNumber || 'N/A'}</p>
          <p className="text-xs text-gray-600">Fecha: {clientData.date || 'N/A'}</p>
        </div>
      </div>
      
      <div className="border-b border-gray-200 pb-2 mb-2 print:pb-1 print:mb-1">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Columna Izquierda: Datos del Cliente y Dirección */}
          <div className="mb-2 md:mb-0 w-full md:w-1/2">
            {/* El logo se movió arriba */}
            <h3 className="text-sm font-medium mb-1">Cliente</h3>
            <p className="text-xs text-gray-600">{clientData.name || 'N/A'}</p>
            <p className="text-xs text-gray-600">RFC: {clientData.rfc || 'N/A'}</p>
            <p className="text-xs text-gray-600">Contacto: {clientData.clientName || 'N/A'}</p>
            <p className="text-xs text-gray-600">Tel: {clientData.phone || 'N/A'}</p>
            <p className="text-xs text-gray-600">Email: {clientData.email || 'N/A'}</p>
            
            <h3 className="text-sm font-medium mt-1 mb-1">Dirección</h3>
            <p className="text-xs text-gray-600">
              {clientData.address?.street || 'N/A'}, {clientData.address?.neighborhood || 'N/A'}
            </p>
            <p className="text-xs text-gray-600">
              {clientData.address?.municipality || 'N/A'}, {clientData.address?.state || 'N/A'}, C.P. {clientData.address?.zipCode || 'N/A'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-2 print:mb-1">
        <h3 className="text-base font-medium mb-1">Descripción</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-1 py-1 text-left text-[9px] font-medium text-gray-500 uppercase tracking-wider">N/REF</th>
                <th className="px-1 py-1 text-left text-[9px] font-medium text-gray-500 uppercase tracking-wider">Modelos</th>
                <th className="px-1 py-1 text-left text-[9px] font-medium text-gray-500 uppercase tracking-wider w-[50px]">CANTIDAD (pza)</th>
                <th className="px-1 py-1 text-left text-[9px] font-medium text-gray-500 uppercase tracking-wider w-[40px]">P/ VERDE</th>
                <th className="px-1 py-1 text-left text-[9px] font-medium text-gray-500 uppercase tracking-wider w-[40px]">P/ NEGRA</th>
                <th className="px-1 py-1 text-left text-[9px] font-medium text-gray-500 uppercase tracking-wider">Atados</th>
                <th className="px-1 py-1 text-left text-[9px] font-medium text-gray-500 uppercase tracking-wider">Peso</th>
                <th className="px-1 py-1 text-left text-[9px] font-medium text-gray-500 uppercase tracking-wider">P/U</th>
                <th className="px-1 py-1 text-left text-[9px] font-medium text-gray-500 uppercase tracking-wider">C/DESC</th>
                <th className="px-1 py-1 text-left text-[9px] font-medium text-gray-500 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => {
                const originalPrice = product.panelType === 'verde' ? product.priceGreen : product.priceBlack;
                
                // Calcular el precio con descuento para C/DESC
                let priceForCDesc = originalPrice;
                discounts.forEach(discount => {
                  priceForCDesc /= (1 + (discount.percentage / 100));
                });

                return (
                  <tr key={product.id}>
                    <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-900">{product.reference}</td>
                    <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-900">{product.model}</td>
                    <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-900">{product.quantity}</td>
                    <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-900 text-center">
                      {product.panelType === 'verde' ? (
                        <span className="inline-block w-2 h-2 rounded-full border border-black"></span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-900 text-center">
                      {product.panelType === 'negra' ? (
                        <span className="inline-block w-2 h-2 rounded-full border border-black"></span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-900">{product.bundles}</td>
                    <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-900">{product.weight.toFixed(2)}</td>
                    <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-900">
                      {formatCurrency(originalPrice)}
                    </td>
                    <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-900">
                      {formatCurrency(priceForCDesc)}
                    </td>
                    <td className="px-1 py-1 whitespace-nowrap text-xs text-gray-900">
                      {formatCurrency(product.total * overallDiscountFactor)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-2 print:pt-1">
        <h3 className="text-base font-medium mb-1">Liquidación</h3>
        <div className="flex justify-end">
          <div className="w-full md:w-1/3">
            <div className="flex justify-between py-0.5">
              <span className="text-xs text-gray-600">Subtotal:</span>
              <span className="text-xs font-medium">{formatCurrency(subtotal)}</span>
            </div>
            
            {/* Mostrar cada descuento como el subtotal restante después de aplicar ese descuento */}
            {discounts.reduce((acc, discount) => {
              const currentSubtotal = acc.length === 0 ? subtotal : acc[acc.length - 1].subtotalAfterThisDiscount;
              const subtotalAfterThisDiscount = currentSubtotal / (1 + (discount.percentage / 100));

              acc.push({
                id: discount.id,
                name: discount.name,
                percentage: discount.percentage,
                subtotalAfterThisDiscount: subtotalAfterThisDiscount
              });
              return acc;
            }, []).map((discountInfo) => (
              <div key={discountInfo.id} className="flex justify-between py-0.5">
                <span className="text-xs text-gray-600">{discountInfo.name} ({discountInfo.percentage}%):</span>
                <span className="text-xs font-medium">
                  {formatCurrency(discountInfo.subtotalAfterThisDiscount)}
                </span>
              </div>
            ))}
            
            <div className="flex justify-between py-0.5">
              <span className="text-xs text-gray-600">Subtotal con descuento:</span>
              <span className="text-xs font-medium">{formatCurrency(subtotalAfterDiscount)}</span>
            </div>
            
            <div className="flex justify-between py-0.5">
              <span className="text-xs text-gray-600">IVA (16%):</span>
              <span className="text-xs font-medium">{formatCurrency(iva)}</span>
            </div>
            
            <div className="flex justify-between py-0.5 border-t border-gray-200 mt-1 pt-1">
              <span className="text-sm font-medium">Total:</span>
              <span className="text-sm font-bold">{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Slogan adicional */}
      <p className="text-right text-sm font-bold text-gray-700 mt-2 print:mt-1">
        ¡Más ganancia por el mismo esfuerzo!
      </p>

      {/* Nuevos campos de Identificador y Totales */}
      <div className="mt-2 text-xs text-gray-600 print:mt-1">
        <p><strong>Identificador:</strong> {identifier}</p>
        <p><strong>Cantidad total de Atados:</strong> {totalBundles}</p>
        <p><strong>Cantidad total de KG:</strong> {totalWeight.toFixed(2)} kg</p>
      </div>
      
      <div className="mt-2 text-xs text-gray-600 print:mt-1">
        <p>Condiciones de pago: {clientData.paymentTerms || 'N/A'} {clientData.paymentTerms === 'Credito' && clientData.creditDays ? `a ${clientData.creditDays} días` : ''}</p>
        <p>Tiempo de entrega: {clientData.deliveryTime ? `${clientData.deliveryTime} días hábiles` : 'N/A'} después de confirmado el pedido</p>
        <p>Vigencia de cotización: {clientData.quoteValidity ? `${clientData.quoteValidity} días` : 'N/A'}</p>
      </div>
      
      <div className="mt-2 text-right text-xs text-gray-500 print:mt-1">
        Página 1 de 1
      </div>
    </div>
  );
};

export default QuotationView;

// DONE
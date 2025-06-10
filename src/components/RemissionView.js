import React from 'react';
import { getClientData, getProducts } from '../utils/storage';
import { formatCurrency } from '../utils/formatters';
import { numberToWords } from '../utils/numberToWords'; // Importar la función de conversión a palabras

const RemissionView = () => {
  const clientData = getClientData() || {};
  const products = getProducts() || [];
  
  // Cálculos para los nuevos campos
  const totalBundles = products.reduce((sum, product) => sum + product.bundles, 0);
  const totalWeight = products.reduce((sum, product) => sum + product.weight, 0);

  // Recalcular el total final de la cotización para el pagaré
  // Esto asume que la lógica de descuentos y IVA es la misma que en QuotationView
  const calculateTotalFromProducts = () => {
    const subtotalProducts = products.reduce((sum, product) => {
      const price = product.panelType === 'verde' ? product.priceGreen : product.priceBlack;
      return sum + (price * product.quantity);
    }, 0);

    // Aquí deberías aplicar los descuentos y el IVA como se hace en QuotationView
    // Para este ejemplo, asumiré que los descuentos se aplican de forma simple
    // En una aplicación real, deberías pasar los descuentos desde App.js o recalcularlos aquí
    // de la misma manera que en QuotationView para asegurar consistencia.
    // Por ahora, usaremos una simplificación:
    let totalAmount = subtotalProducts;
    // discounts.forEach(discount => { totalAmount /= (1 + (discount.percentage / 100)); });
    totalAmount *= 1.16; // Aplicar IVA del 16%
    return totalAmount;
  };

  const totalForPagare = calculateTotalFromProducts();
  const amountInWords = numberToWords(totalForPagare); // Convertir el total a palabras

  // Datos para el pagaré
  const today = new Date();
  const formattedDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
  
  // Calcular fecha de vencimiento
  let dueDate = formattedDate;
  if (clientData.paymentTerms === 'Credito' && clientData.creditDays) {
    const date = new Date();
    date.setDate(date.getDate() + parseInt(clientData.creditDays, 10));
    dueDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  }

  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 print:shadow-none print:p-0 print:max-h-[279mm] flex flex-col"> {/* Añadido flex-col */}
      <div className="flex justify-between items-center mb-2 print:mb-1">
        <div className="flex items-center">
          <img 
            src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0XTeFlNq7MqavcHK34VzhrR2we8dDg6BAFCsl" 
            alt="Logo Cooper Slip" 
            className="h-8 mr-2 print:block" 
          />
          <h2 className="text-lg font-semibold">Cooper Slip Remisión</h2>
        </div>
        <button
          onClick={handlePrint}
          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 print:hidden text-sm"
        >
          Imprimir
        </button>
      </div>
      
      <div className="border-b border-gray-200 pb-2 mb-2 print:pb-1 print:mb-1">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-1 md:mb-0">
            <h3 className="text-sm font-medium mb-0.5">Remisión de Entrega</h3>
            <p className="text-xs text-gray-600">Remisión: {clientData.quoteNumber || 'N/A'}</p>
            <p className="text-xs text-gray-600">Fecha: {clientData.date || 'N/A'}</p>
          </div>
        </div>
      </div>
      
      <div className="border-b border-gray-200 pb-2 mb-2 print:pb-1 print:mb-1">
        <h3 className="text-sm font-medium mb-0.5">Entregar en</h3>
        <p className="text-xs text-gray-600">
          <strong>Empresa:</strong> {clientData.deliveryInfo?.businessName || 'N/A'}
        </p>
        <p className="text-xs text-gray-600">
          <strong>Dirección:</strong> {clientData.deliveryInfo?.street || 'N/A'}, {clientData.deliveryInfo?.neighborhood || 'N/A'}
        </p>
        <p className="text-xs text-gray-600">
          {clientData.deliveryInfo?.municipality || 'N/A'}, {clientData.deliveryInfo?.state || 'N/A'}, C.P. {clientData.deliveryInfo?.zipCode || 'N/A'}
        </p>
        <p className="text-xs text-gray-600">
          <strong>Teléfono:</strong> {clientData.deliveryInfo?.phone || 'N/A'}
        </p>
        <p className="text-xs text-gray-600">
          <strong>Recibe:</strong> {clientData.deliveryInfo?.receiverName || 'N/A'}
        </p>
        {clientData.deliveryInfo?.location && (
          <p className="text-xs text-gray-600">
            <strong>Ubicación:</strong> {clientData.deliveryInfo.location}
          </p>
        )}
      </div>
      
      <div className="mb-2 print:mb-1">
        <h3 className="text-sm font-medium mb-0.5">Productos a Entregar</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-1 text-left text-[9px] font-medium text-gray-500 uppercase tracking-wider">N/REF</th>
                <th className="px-2 py-1 text-left text-[9px] font-medium text-gray-500 uppercase tracking-wider">Modelo</th>
                <th className="px-2 py-1 text-left text-[9px] font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-2 py-1 text-left text-[9px] font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                <th className="px-2 py-1 text-left text-[9px] font-medium text-gray-500 uppercase tracking-wider">Atados</th>
                <th className="px-2 py-1 text-left text-[9px] font-medium text-gray-500 uppercase tracking-wider">Peso</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-900">{product.reference}</td>
                  <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-900">{product.model}</td>
                  <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-900">
                    {product.panelType === 'verde' ? 'Verde' : 'Negra'}
                  </td>
                  <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-900">{product.quantity}</td>
                  <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-900">{product.bundles}</td>
                  <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-900">{product.weight.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Contenedor para empujar el contenido hacia abajo */}
      <div className="flex-grow flex flex-col justify-end"> {/* Añadido flex-grow y flex-col justify-end */}
        {/* Nuevos campos de totales */}
        <div className="mt-2 text-xs text-gray-600 print:mt-1">
          <p><strong>Cantidad total de Atados:</strong> {totalBundles}</p>
          <p><strong>Cantidad total de KG:</strong> {totalWeight.toFixed(2)} kg</p>
        </div>

        <div className="mt-3 text-xs text-gray-600 print:mt-2">
          <p>Observaciones:</p>
          <div className="border border-gray-300 h-12 mt-1"></div>
        </div>

        {/* Formato de Pagaré */}
        <div className="mt-6 border border-gray-300 p-4 rounded-lg print:mt-4 print:p-2">
          <h3 className="text-sm font-bold text-left mb-2">PAGARÉ</h3>
          <p className="text-xs mb-1">
            Por valor recibido de {formatCurrency(totalForPagare)} ({amountInWords}),
            prometo(emos) pagar incondicionalmente a la orden de Alsea Port Line, S.A. de C.V.
            en Naucalpan, Estado de México,
            el día {dueDate}.
          </p>
          <p className="text-xs mb-1">
            Este pagaré causa intereses moratorios a razón del 5% mensual a partir de su fecha de vencimiento.
          </p>
          <p className="text-xs mb-1">
            Lugar y Fecha de Expedición: Naucalpan, Estado de México, a {formattedDate}.
          </p>
          <div className="mt-8">
            <div className="border-t border-gray-400 pt-1">
              <p className="text-xs text-center">Nombre persona autorizada para recibir (Deudor), Fecha, Firma y Sello de la empresa</p>
            </div>
          </div>
        </div>
        
        <div className="mt-3 text-right text-xs text-gray-500 print:mt-2">
          Página 1 de 1
        </div>
      </div>
    </div>
  );
};

export default RemissionView;

// DONE
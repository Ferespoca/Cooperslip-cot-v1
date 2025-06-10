import React, { useState, useEffect } from 'react';
import { getClientData, saveClientData } from '../utils/storage';

const ClientDataForm = ({ onSubmit, loggedInUser, generateQuoteNumber }) => { // loggedInUser y generateQuoteNumber ya no son necesarios aquí
  const [clientData, setClientData] = useState(() => {
    const savedData = getClientData();
    const today = new Date();
    const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    // Generar el quoteNumber inicial con el nuevo formato
    const formattedQuoteDate = `${String(today.getDate()).padStart(2, '0')}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getFullYear()).slice(-2)}`;
    const initialConsecutive = savedData?.consecutive || 1; // Obtener el último consecutivo o iniciar en 1
    const initialQuoteNumber = `COT${formattedQuoteDate}${String(initialConsecutive).padStart(3, '0')}`;

    return savedData || {
      quoteNumber: initialQuoteNumber,
      date: formattedToday,
      name: '',
      rfc: '',
      clientName: '',
      phone: '',
      email: '',
      address: {
        street: '',
        neighborhood: '',
        municipality: '',
        state: '',
        zipCode: ''
      },
      deliveryInfo: {
        useSameData: false,
        businessName: '',
        street: '',
        neighborhood: '',
        municipality: '',
        state: '',
        zipCode: '',
        phone: '',
        receiverName: '',
        location: ''
      },
      priceList: 'LGRAL',
      paymentTerms: 'Contado',
      creditDays: '',
      deliveryTime: '',
      quoteValidity: '',
      consecutive: initialConsecutive // Guardar el consecutivo
    };
  });

  // Actualizar el consecutivo y el quoteNumber cuando se envíe el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const newConsecutive = (clientData.consecutive || 0) + 1;
    const today = new Date();
    const formattedQuoteDate = `${String(today.getDate()).padStart(2, '0')}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getFullYear()).slice(-2)}`;
    const newQuoteNumber = `COT${formattedQuoteDate}${String(newConsecutive).padStart(3, '0')}`;

    const updatedClientData = {
      ...clientData,
      quoteNumber: newQuoteNumber,
      consecutive: newConsecutive
    };

    saveClientData(updatedClientData);
    onSubmit(updatedClientData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setClientData({
        ...clientData,
        [section]: {
          ...clientData[section],
          [field]: value
        }
      });
    } else {
      setClientData({
        ...clientData,
        [name]: value
      });
    }
  };

  const handleDeliveryChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'useSameData') {
      setClientData({
        ...clientData,
        deliveryInfo: {
          ...clientData.deliveryInfo,
          useSameData: checked,
          businessName: checked ? clientData.name : clientData.deliveryInfo.businessName,
          street: checked ? clientData.address.street : clientData.deliveryInfo.street,
          neighborhood: checked ? clientData.address.neighborhood : clientData.deliveryInfo.neighborhood,
          municipality: checked ? clientData.address.municipality : clientData.deliveryInfo.municipality,
          state: checked ? clientData.address.state : clientData.deliveryInfo.state,
          zipCode: checked ? clientData.address.zipCode : clientData.deliveryInfo.zipCode
        }
      });
    } else {
      setClientData({
        ...clientData,
        deliveryInfo: {
          ...clientData.deliveryInfo,
          [name]: type === 'checkbox' ? checked : value
        }
      });
    }
  };

  useEffect(() => {
    if (clientData.deliveryInfo.useSameData) {
      setClientData({
        ...clientData,
        deliveryInfo: {
          ...clientData.deliveryInfo,
          businessName: clientData.name,
          street: clientData.address.street,
          neighborhood: clientData.address.neighborhood,
          municipality: clientData.address.municipality,
          state: clientData.address.state,
          zipCode: clientData.address.zipCode
        }
      });
    }
  }, [
    clientData.name,
    clientData.address.street,
    clientData.address.neighborhood,
    clientData.address.municipality,
    clientData.address.state,
    clientData.address.zipCode,
    clientData.deliveryInfo.useSameData
  ]);

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Información General</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número de Cotización
              </label>
              <input
                type="text"
                name="quoteNumber"
                value={clientData.quoteNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
                readOnly // Hacerlo de solo lectura ya que se genera automáticamente
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha
              </label>
              <input
                type="date"
                name="date"
                value={clientData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre / Razón Social
            </label>
            <input
              type="text"
              name="name"
              value={clientData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                RFC
              </label>
              <input
                type="text"
                name="rfc"
                value={clientData.rfc}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Cliente
              </label>
              <input
                type="text"
                name="clientName"
                value={clientData.clientName}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                value={clientData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                value={clientData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
          </div>
          
          <h3 className="text-lg font-medium mt-4 border-b pb-2">Dirección</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Calle y Número
            </label>
            <input
              type="text"
              name="address.street"
              value={clientData.address.street}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Colonia
              </label>
              <input
                type="text"
                name="address.neighborhood"
                value={clientData.address.neighborhood}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Municipio
              </label>
              <input
                type="text"
                name="address.municipality"
                value={clientData.address.municipality}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <input
                type="text"
                name="address.state"
                value={clientData.address.state}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                C.P.
              </label>
              <input
                type="text"
                name="address.zipCode"
                value={clientData.address.zipCode}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">Información de Entrega</h2>
          
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="useSameData"
                checked={clientData.deliveryInfo.useSameData}
                onChange={handleDeliveryChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Mismos datos del cliente</span>
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de la Empresa
            </label>
            <input
              type="text"
              name="businessName"
              value={clientData.deliveryInfo.businessName}
              onChange={handleDeliveryChange}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              disabled={clientData.deliveryInfo.useSameData}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Calle y Número
            </label>
            <input
              type="text"
              name="street"
              value={clientData.deliveryInfo.street}
              onChange={handleDeliveryChange}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              disabled={clientData.deliveryInfo.useSameData}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Colonia
              </label>
              <input
                type="text"
                name="neighborhood"
                value={clientData.deliveryInfo.neighborhood}
                onChange={handleDeliveryChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                disabled={clientData.deliveryInfo.useSameData}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Municipio
              </label>
              <input
                type="text"
                name="municipality"
                value={clientData.deliveryInfo.municipality}
                onChange={handleDeliveryChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                disabled={clientData.deliveryInfo.useSameData}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <input
                type="text"
                name="state"
                value={clientData.deliveryInfo.state}
                onChange={handleDeliveryChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                disabled={clientData.deliveryInfo.useSameData}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                C.P.
              </label>
              <input
                type="text"
                name="zipCode"
                value={clientData.deliveryInfo.zipCode}
                onChange={handleDeliveryChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                disabled={clientData.deliveryInfo.useSameData}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono del Negocio
              </label>
              <input
                type="tel"
                name="phone"
                value={clientData.deliveryInfo.phone}
                onChange={handleDeliveryChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Persona que Recibe
              </label>
              <input
                type="text"
                name="receiverName"
                value={clientData.deliveryInfo.receiverName}
                onChange={handleDeliveryChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ubicación del Negocio
            </label>
            <input
              type="text"
              name="location"
              value={clientData.deliveryInfo.location}
              onChange={handleDeliveryChange}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enlace de Google Maps o descripción"
            />
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Lista de Precios
            </label>
            <select
              name="priceList"
              value={clientData.priceList}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            >
              <option value="LGRAL">LGRAL</option>
              <option value="LLAM">LLAM</option>
              <option value="LAR">LAR</option>
              <option value="LRECU">LRECU</option>
            </select>
          </div>

          {/* Nuevas opciones en una sola fila */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Condiciones de Pago
              </label>
              <select
                name="paymentTerms"
                value={clientData.paymentTerms}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="Contado">Contado</option>
                <option value="Credito">Crédito</option>
              </select>
              {clientData.paymentTerms === 'Credito' && (
                <input
                  type="number"
                  name="creditDays"
                  value={clientData.creditDays}
                  onChange={handleChange}
                  placeholder="Días de crédito"
                  className="w-full mt-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  min="1"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tiempo de Entrega (días)
              </label>
              <input
                type="number"
                name="deliveryTime"
                value={clientData.deliveryTime}
                onChange={handleChange}
                placeholder="Días aprox."
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vigencia Cotización (días)
              </label>
              <input
                type="number"
                name="quoteValidity"
                value={clientData.quoteValidity}
                onChange={handleChange}
                placeholder="Días de vigencia"
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                min="1"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-right">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Agregar a Cotización
        </button>
      </div>
    </form>
  );
};

export default ClientDataForm;
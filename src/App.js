import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ClientDataForm from './components/ClientDataForm';
import ProductSelector from './components/ProductSelector';
import DiscountSelector from './components/DiscountSelector';
import QuotationView from './components/QuotationView';
import RemissionView from './components/RemissionView';
import PinAccess from './components/PinAccess';
import { clearAllData, saveClientData, getClientData } from './utils/storage';

const App = () => {
  const [activeSection, setActiveSection] = useState(1);
  const [hasAccess, setHasAccess] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [clientData, setClientData] = useState(() => getClientData());
  const [products, setProducts] = useState([]);
  const [discounts, setDiscounts] = useState([]);

  // Función para generar el número de cotización
  const generateQuoteNumber = (date, username, priceList) => {
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getFullYear()).slice(-2)}`;
    const userPrefix = username ? username.substring(0, 3).toUpperCase() : 'USR';
    // Obtener el último consecutivo del localStorage o iniciar en 0
    const lastConsecutive = parseInt(localStorage.getItem('lastQuoteConsecutive') || '0', 10);
    const newConsecutive = lastConsecutive + 1;
    localStorage.setItem('lastQuoteConsecutive', newConsecutive.toString()); // Guardar el nuevo consecutivo
    
    return `COT${formattedDate}${String(newConsecutive).padStart(3, '0')}`;
  };

  const handleClientDataSubmit = (data) => {
    // El número de cotización ya se genera y actualiza en ClientDataForm
    setClientData(data);
    saveClientData(data);
    setActiveSection(2); // Avanza a la sección de Productos
  };

  const handleProductsSubmit = (products) => {
    setProducts(products);
    setActiveSection(3); // Avanza a la sección de Descuentos
  };

  const handleDiscountsSubmit = (discounts) => {
    setDiscounts(discounts);
    setActiveSection(4); // Avanza a la sección de Cotización
  };

  const handleReset = () => {
    clearAllData(); // Limpia todos los datos del localStorage
    localStorage.removeItem('lastQuoteConsecutive'); // Reiniciar el consecutivo
    setClientData(null); // Reinicia el estado del cliente
    setProducts([]); // Reinicia el estado de los productos
    setDiscounts([]); // Reinicia el estado de los descuentos
    setActiveSection(1); // Vuelve a la primera sección (Datos del Cliente)
    alert('Cotizador reiniciado. ¡Puedes empezar una nueva cotización!');
  };

  const handleAccessGranted = (username) => {
    setHasAccess(true);
    setLoggedInUser(username);
  };

  // Efecto para inicializar el número de cotización cuando el usuario inicia sesión
  useEffect(() => {
    if (hasAccess && loggedInUser) {
      const today = new Date();
      const initialClientData = getClientData() || {};
      
      // Generar el número de cotización completo al cargar la página si no existe o si el usuario cambia
      const newQuoteNumber = generateQuoteNumber(
        today, 
        loggedInUser, 
        initialClientData.priceList || 'LGRAL'
      );

      setClientData(prevData => ({
        ...initialClientData,
        quoteNumber: newQuoteNumber,
        date: initialClientData.date || `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
      }));
    }
  }, [hasAccess, loggedInUser]);


  if (!hasAccess) {
    return <PinAccess onAccessGranted={handleAccessGranted} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} onReset={handleReset} username={loggedInUser} />
      
      <main className="container mx-auto py-6 px-4">
        {activeSection === 1 && (
          <ClientDataForm onSubmit={handleClientDataSubmit} loggedInUser={loggedInUser} generateQuoteNumber={generateQuoteNumber} />
        )}
        
        {activeSection === 2 && (
          <ProductSelector onSubmit={handleProductsSubmit} />
        )}
        
        {activeSection === 3 && (
          <DiscountSelector onSubmit={handleDiscountsSubmit} />
        )}
        
        {activeSection === 4 && (
          <QuotationView />
        )}
        
        {activeSection === 5 && (
          <RemissionView />
        )}
      </main>
      
      <style jsx global>{`
        @media print {
          @page {
            size: letter portrait;
            margin: 1.5cm; /* Márgenes de 1.5 cm */
          }
          body {
            background-color: white;
            font-size: 10px; /* Reducido el tamaño de fuente base para impresión */
          }
          .print\\:hidden {
            display: none !important;
          }
          /* Ajuste para que el contenido se ajuste al tamaño de la página */
          .print\\:max-h-\\[279mm\\] {
            max-height: calc(279mm - 3cm); /* Altura de carta - 2 * margen */
            overflow: hidden;
          }
        }
      `}</style>
    </div>
  );
};

export default App;
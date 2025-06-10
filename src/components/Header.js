import React from 'react';

const Header = ({ activeSection, setActiveSection, onReset, username }) => {
  const sections = [
    { id: 1, name: 'Datos del Cliente' },
    { id: 2, name: 'Productos' },
    { id: 3, name: 'Descuentos' },
    { id: 4, name: 'Cotización' },
    { id: 5, name: 'Remisión' }
  ];

  return (
    <header className="bg-white text-gray-800 py-4 px-6 print:hidden shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-start mb-4 md:mb-0">
          <div className="flex items-center">
            <img 
              src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0XTeFlNq7MqavcHK34VzhrR2we8dDg6BAFCsl" 
              alt="Logo Cooper Slip" 
              className="h-10 mr-3" 
            />
            <h1 className="text-2xl font-bold text-red-500">Cooper Slip Cotizador v1</h1>
          </div>
          {username && (
            <p className="text-sm text-gray-600 mt-1 ml-14">Bienvenido {username}</p>
          )}
        </div>
        <div className="flex flex-wrap justify-center items-center">
          <nav className="flex flex-wrap justify-center mr-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 mx-1 my-1 rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                {section.name}
              </button>
            ))}
          </nav>
          <div className="ml-auto">
            <button
              onClick={onReset}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white"
            >
              REINICIAR
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
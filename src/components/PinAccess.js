import React, { useState } from 'react';

const PinAccess = ({ onAccessGranted }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Credenciales permitidas
  const VALID_CREDENTIALS = [
    { username: 'Fer', password: '1551' },
    { username: 'Andres', password: '6602' },
    { username: 'Cesar', password: '3156' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const foundUser = VALID_CREDENTIALS.find(
      (cred) => cred.username === username && cred.password === password
    );

    if (foundUser) {
      onAccessGranted(foundUser.username); // Pasa el nombre de usuario al App
    } else {
      setError('Usuario o contraseña incorrectos. Intenta de nuevo.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center">
        <img 
          src="https://4tsix0yujj.ufs.sh/f/2vMRHqOYUHc0XTeFlNq7MqavcHK34VzhrR2we8dDg6BAFCsl" 
          alt="Logo Cooper Slip" 
          className="h-20 mx-auto mb-6" 
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Acceso al Cotizador</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="sr-only">Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(''); }}
              placeholder="Usuario"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Contraseña"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            ACCEDER
          </button>
        </form>
      </div>
    </div>
  );
};

export default PinAccess;
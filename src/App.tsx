import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Quiz App - Teste</h1>
      <p className="text-gray-700 mb-6">Esta é uma versão simplificada para teste</p>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Verificando se o React está funcionando</h2>
        <p className="text-gray-600">
          Se você consegue ver esta mensagem, a configuração básica do React está funcionando corretamente.
        </p>
        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={() => alert('O React está funcionando!')}
        >
          Clique para testar
        </button>
      </div>
    </div>
  );
}

export default App;

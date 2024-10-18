import Link from 'next/link';
import React from 'react';


const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="mt-4 text-3xl font-bold text-gray-800">Pagina no encontrada</h1>
      <p className="mt-2 text-gray-600">Lo siento, la página que buscas no existe.</p>
      <Link href={"/login"} className="mt-4 px-4 py-2 bg-blue-950 text-white rounded hover:bg-blue-900">
        Volver a la página de inicio
      </Link>
    </div>
  );
};

export default NotFound;

// components/LoadingFallback.js
const LoadingFallback = () => {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-4 text-lg text-gray-700">Cargando el editor...</span>
      </div>
    );
  };
  
  export default LoadingFallback;
  
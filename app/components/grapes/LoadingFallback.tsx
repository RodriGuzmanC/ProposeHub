// components/LoadingFallback.js
import '../../../public/styles/loader.css';  // Asegúrate de importar el archivo CSS

const LoadingFallback = () => {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader></Loader>
      </div>
    );
  };
  
  export default LoadingFallback;
  

  
  const Loader = () => {
    return (
      /* From Uiverse.io by Nawsome */ 
<div className="boxes">
    <div className="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div className="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div className="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div className="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</div>
    );
  };
  
  
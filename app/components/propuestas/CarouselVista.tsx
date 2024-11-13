'use client'
import React, { useState } from 'react';

interface CarouselProps {
  items: string;  // El parámetro 'items' será un string con todos los elementos HTML
}

const CarouselVista: React.FC<CarouselProps> = ({ items }) => {
  // Estado para el índice del elemento actual
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Parsear el string 'items' a un array de elementos
  const parsedItems = items.split('<div class="page-container">').filter(item => item).map(item => {
    // Devolver cada bloque HTML correctamente formateado como un string
    return `<div class="page-container">${item}`;
  });

  // Función para ir al siguiente elemento
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === parsedItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Función para ir al elemento anterior
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? parsedItems.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="carousel">
      <button onClick={prevSlide}>Anterior</button>
      
      <div className="carousel-container">
        {parsedItems.map((item, index) => (
          <div
            key={index}
            className="page-container"
            style={{
              display: index === currentIndex ? 'block' : 'none'
            }}
            dangerouslySetInnerHTML={{ __html: item }}
          />
        ))}
      </div>

      <button onClick={nextSlide}>Siguiente</button>
    </div>
  );
};

export default CarouselVista;

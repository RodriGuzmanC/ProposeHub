
import React, { useState } from 'react';

interface CardProps{
  id: number,
  title: string,
  description: string,
  imageUrl: string,
  isSelected: boolean,
  handleCardSelect: (arg : any) => void,
}

const Card = ({ id, title, description, imageUrl, isSelected, handleCardSelect } : CardProps) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-200 ${
        isSelected ? 'ring-2 card-seleccionable-active scale-105' : ''
      }`}
      onClick={() => handleCardSelect(id)}
    >
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-950">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      {isSelected && (
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Card;
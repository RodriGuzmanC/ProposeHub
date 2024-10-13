import React from 'react';

interface UserItemProps{
  name: string,
  company?: string,
  phone: number,
  isSelected: boolean,
  onClick: () => void
}

export const UserProfileItem = ({ name, company, phone, isSelected, onClick } : UserItemProps) => {
  return (
    <div 
      className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
        isSelected ? 'item-seleccionable-active' : 'bg-white border-gray-200 hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <div className="w-8 h-8 bg-principal rounded-full flex items-center justify-center text-white font-bold mr-4">
        {name.charAt(0)}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
        <p className="text-xs text-gray-800">{company}</p>
        <p className="text-xs text-gray-800">{phone}</p>
      </div>
    </div>
  );
};

interface ServItemProps{
  name: string,
  description: string,
  isSelected: boolean,
  onClick: () => void
}

export const ServiceItem = ({ name, description, isSelected, onClick } : ServItemProps) => {
  return (
    <div 
      className={`flex w-full items-center p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
        isSelected ? 'item-seleccionable-active' : 'bg-white border-gray-200 hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <div className="w-8 h-8 bg-principal rounded-full flex items-center justify-center text-white font-bold mr-4">
        {name.charAt(0)}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
        <p className="text-xs text-gray-800">{description}</p>
      </div>
    </div>
  );
};




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
        isSelected ? 'bg-primary text-primary-foreground' : 'bg-popover-foreground text-primary border-gray-200 hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <div className="w-8 h-8 bg-popover text-popover-foreground rounded-full flex items-center justify-center font-bold mr-4">
        {name.charAt(0)}
      </div>
      <div>
        <h3 className="text-sm font-semibold ">{name}</h3>
        <p className="text-xs ">{company}</p>
        <p className="text-xs ">{phone}</p>
      </div>
    </div>
  );
};

interface ServItemProps{
  name: string,
  isSelected: boolean,
  onClick: () => void
}

export const ServiceItem = ({ name, isSelected, onClick } : ServItemProps) => {
  return (
    <div 
      className={`flex w-full items-center p-4 border rounded-lg cursor-pointer transition-colors duration-200 ${
        isSelected ? 'bg-primary text-primary-foreground' : 'text-primary bg-white border-gray-200 hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      <div className="w-8 h-8 bg-popover text-popover-foreground rounded-full flex items-center justify-center font-bold mr-4">
        {name.charAt(0)}
      </div>
      <div>
        <h3 className="text-sm font-semibold">{name}</h3>
      </div>
    </div>
  );
};




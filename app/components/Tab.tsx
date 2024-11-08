import React, { useState } from 'react';
import { UserProfileItem } from './UserProfile';

interface TabProps{
  contactsData: Array<string|any>,
  organizationsData: Array<string|any>,
  selectedContact: any,
  setSelectedContact: any
}

export default function Tab({ contactsData, organizationsData, selectedContact, setSelectedContact } : TabProps) {
  const [activeTab, setActiveTab] = useState('Organizacion');

  const tabs = [
    /*{
      key: 'Contactos',
      label: 'Contactos',
      icon: (
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
        </svg>
      ),
      content: (
        <div className='flex flex-col gap-5'>
          {contactsData.map(contact => (
            <UserProfileItem
              key={contact.id}
              name={contact.nombre}
              company={contact.nombreOrganizacion}
              phone={contact.telefono}
              isSelected={selectedContact === contact.id}
              onClick={() => setSelectedContact(contact.id)}
            />
          ))}
        </div>
      )
    },*/
    {
      key: 'Organizacion',
      label: 'Organización',
      icon: (
        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      ),
      content: (
        <div className='flex flex-col gap-5'>
          {organizationsData.map(org => (
              <UserProfileItem
                key={org.id}
                name={org.nombre}
                phone={org.correo}
                isSelected={selectedContact === org.id}
                onClick={() => setSelectedContact(org.id)}
              />
          ))}
        </div>
      )
    }
  ];

  return (
    <div className="w-full">
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`py-2 px-4 font-semibold ${
              activeTab === tab.key
                ? 'text-black border-b-2 border-principal'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            <div className="flex items-center">
              {tab.icon}
              {tab.label}
            </div>
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-10">
        {tabs.find(tab => tab.key === activeTab)?.content}
      </div>
    </div>
  );
}
'use client'
import React, { useState } from 'react';
import Breadcrumb from '@/app/components/Breadcrumb';
import Button from '@/app/components/Button';
import Tab from '@/app/components/Tab';
import { UserProfileItem } from '@/app/components/UserProfile';

interface Contact {
  id: number;
  name: string;
  company: string;
  phone: string;
}

interface Organization {
  id: number;
  name: string;
  details: string;
}

interface Page2Props {
  selectedContact: Contact | null;
  setSelectedContact: (contact: Contact | null) => void;
  nextStep: () => void;
}

const contactsData: Contact[] = [
  { id: 1, name: 'Julio Abraham', company: 'Armstrong SAC', phone: '993 943 812' },
  { id: 2, name: 'Ana Martínez', company: 'TechCorp', phone: '987 654 321' },
  { id: 3, name: 'Carlos Rodríguez', company: 'InnovaSoft', phone: '912 345 678' },
];

const organizationsData: Organization[] = [
  { id: 10, name: 'Armstrong SAC', details: 'Tecnología' },
  { id: 11, name: 'TechCorp', details: 'Consultoría' },
  { id: 20, name: 'InnovaSoft', details: 'Desarrollo de software' },
];

export default function Page2({ selectedContact, setSelectedContact, nextStep }: Page2Props) {
  const [selectedUser, setSelectedUser] = useState<Contact | null>(null);

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex gap-10 items-center'>
        <div className='texto-contenido'>
          <h2 className='text-gray-950 font-bold text-2xl'>Selecciona el contacto</h2>
          <p className='text-gray-900 text-sm'>Asigna quienes recibirán la propuesta que vas a crear</p>
        </div>
        <Button
            disabled={false}
          variant='purple'
          onClick={() => console.log("B")}
          href={'/crear/contacto'}
        >
          Crear contacto
        </Button>
      </div>
      <Tab 
        contactsData={contactsData} 
        organizationsData={organizationsData} 
        selectedContact={selectedContact}
        setSelectedContact={setSelectedContact}
      />
      <div className="flex justify-center">
        <Button
          variant="primary"
          onClick={nextStep}
          disabled={!selectedContact}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}

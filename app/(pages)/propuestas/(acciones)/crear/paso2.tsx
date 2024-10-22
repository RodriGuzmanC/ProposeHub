'use client'
import React, { useState } from 'react';
import Breadcrumb from '@/app/components/Breadcrumb';
import Button from '@/app/components/Button';
import Tab from '@/app/components/Tab';
import { UserProfileItem } from '@/app/components/UserProfile';
import { obtenerClientes } from '@/lib/services/cliente';
import { obtenerOrganizaciones } from '@/lib/services/organizacion';


interface Page2Props {
  selectedContact: any;
  setSelectedContact: (contact: any) => void;
  nextStep: () => void;
}


export default function Page2({ selectedContact, setSelectedContact, nextStep }: Page2Props) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [contactos, setContactos] = useState<any>([])
  const [organizaciones, setOrganizaciones] = useState<any>([])

  async function fetchContactos(){
    setContactos(await obtenerClientes())
  }
  async function fetchOrganizaciones(){
    setOrganizaciones(await obtenerOrganizaciones())
  }
  fetchContactos()
  fetchOrganizaciones()

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
        contactsData={contactos} 
        organizationsData={organizaciones} 
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

'use client'
import React, { useEffect, useState } from 'react';
import Breadcrumb from '@/app/components/Breadcrumb';
import Button from '@/app/components/Button';
import Tab from '@/app/components/Tab';
import { UserProfileItem } from '@/app/components/UserProfile';
import { obtenerClientes } from '@/lib/services/cliente';
import { obtenerOrganizaciones } from '@/lib/services/organizacion';


interface Page2Props {
  organizacionesData: Array<any>
  selectedContact: any;
  setSelectedContact: (contact: any) => void;
  nextStep: () => void;
}


export default function Page2({ organizacionesData, selectedContact, setSelectedContact, nextStep }: Page2Props) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [contactos, setContactos] = useState<any>([])
  const [organizaciones, setOrganizaciones] = useState<any>([])
  const [organizacionesCargadas, setOrganizacionesCargadas] = useState(false); // Estado para controlar la carga

  async function fetchContactos(){
    setContactos(await obtenerClientes())
  }
  async function fetchOrganizaciones(){
    setOrganizaciones(await obtenerOrganizaciones())
  }
  useEffect(()=>{
    if (!organizacionesCargadas) { // Solo carga si no se han cargado
      fetchOrganizaciones();
    }
  }, [organizacionesCargadas])

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
        organizationsData={organizacionesData} 
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

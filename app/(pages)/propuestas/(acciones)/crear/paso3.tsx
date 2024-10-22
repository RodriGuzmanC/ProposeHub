'use client'
import Button from '@/app/components/Button';
import { ServiceItem } from '@/app/components/UserProfile';
import { obtenerServicios } from '@/lib/services/servicio';
import React, { useState } from 'react';


interface Page3Props {
  selectedService: any
  setSelectedService: (id: any) => void;
  nextStep: () => void;
}


export default function Page3({ selectedService, setSelectedService, nextStep }: Page3Props) {
  const [servicios, setServicios] = useState<any>([])

  async function fetchServicios(){
    setServicios(await obtenerServicios())
  }
  fetchServicios()

  return (
    <div className="flex-col flex gap-6 items-center w-full">
      <h2 className="text-2xl font-bold text-gray-950">Selecciona el Servicio</h2>
      {servicios.map((servicio: any) => (
        <ServiceItem
          key={servicio.id}
          name={servicio.nombre}
          isSelected={servicio.id === selectedService}
          onClick={() => setSelectedService(servicio.id)}
        />
      ))}
      <div className="flex justify-center">
        <Button
          variant="primary"
          onClick={nextStep}
          disabled={!selectedService}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}


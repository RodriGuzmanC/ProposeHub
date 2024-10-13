'use client'
import Button from '@/app/components/Button';
import { ServiceItem } from '@/app/components/UserProfile';
import React from 'react';

interface Servicio {
  id: number;
  name: string;
  details: string;
}

interface Page3Props {
  selectedService: number | null;
  setSelectedService: (id: number) => void;
  nextStep: () => void;
}

const servicios: Servicio[] = [
  { id: 1, name: 'Diseño web', details: 'Servicio de diseño web' },
  { id: 2, name: 'Aplicación web', details: 'Servicio de aplicación web' },
  { id: 3, name: 'Meta Ads', details: 'Servicio de anuncios de Facebook' },
];

export default function Page3({ selectedService, setSelectedService, nextStep }: Page3Props) {
  return (
    <div className="flex-col flex gap-6 items-center w-full">
      <h2 className="text-2xl font-bold text-gray-950">Selecciona el Servicio</h2>
      {servicios.map((servicio) => (
        <ServiceItem
          key={servicio.id}
          name={servicio.name}
          description={servicio.details}
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


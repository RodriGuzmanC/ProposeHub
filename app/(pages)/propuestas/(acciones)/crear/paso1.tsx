'use client'
import Button from '@/app/components/Button';
import Card from '@/app/components/Card';
import React, { useState } from 'react';

const plantillas = [
  { id: 1, title: 'Plantilla 1', description: 'Descripción corta de la plantilla' },
  { id: 2, title: 'Plantilla 2', description: 'Descripción corta de la plantilla' },
  { id: 3, title: 'Plantilla 3', description: 'Descripción corta de la plantilla' },
  { id: 4, title: 'Plantilla 4', description: 'Descripción corta de la plantilla' },
];

interface Paso1Props {
  plantillaSeleccionada: number | null;
  setPlantillaSeleccionada: (id: number | null) => void;
  nextStep: () => void;
}

export default function Paso1({ plantillaSeleccionada, setPlantillaSeleccionada, nextStep }: Paso1Props) {
  const [selectedCard, setSelectedCard] = useState<number | null>(null); // Maneja la tarjeta seleccionada en el padre

  const handleCardSelect = (id: number) => {
    setPlantillaSeleccionada(id === plantillaSeleccionada ? null : id); // Permite deseleccionar la tarjeta
  };

  return (
    <div className='flex items-center flex-col'>
      <h1 className="text-2xl font-bold mb-6 text-gray-950">Selecciona la plantilla</h1>
      <div className="grid grid-cols-2 gap-6 mb-6">
        {plantillas.map((plantilla) => (
          <Card
            key={plantilla.id}
            id={plantilla.id}
            title={plantilla.title}
            description={plantilla.description}
            imageUrl="/imgs/plantilla-ejemplo.png"
            isSelected={plantillaSeleccionada === plantilla.id}
            handleCardSelect={() => handleCardSelect(plantilla.id)}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          variant="primary"
          onClick={nextStep}
          disabled={plantillaSeleccionada === null}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}

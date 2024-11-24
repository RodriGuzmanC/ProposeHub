'use client'
import Button from '@/app/components/Button';
import Card from '@/app/components/Card';
import { obtenerPlantillas } from '@/lib/services/plantilla';
import { Plantilla } from '@/lib/utils/definitions';
import React, { useEffect, useState } from 'react';



interface Paso1Props {
  plantillasData: Plantilla[]
  plantillaSeleccionada: number;
  setPlantillaSeleccionada: (id: number) => void;
  nextStep: () => void;
}

export default function Paso1({ plantillasData, plantillaSeleccionada, setPlantillaSeleccionada, nextStep }: Paso1Props) {
  const [selectedCard, setSelectedCard] = useState<number | null>(null); // Maneja la tarjeta seleccionada en el padre
  const [plantillas, setPlantillas] = useState<any>([])

  const handleCardSelect = (id: number) => {
    setPlantillaSeleccionada(id === plantillaSeleccionada ? 0 : id); // Permite deseleccionar la tarjeta
  };

  /*async function fetchPlantillas(){
    setPlantillas(await obtenerPlantillas())
  }

  useEffect(()=>{
    fetchPlantillas()
  }, [])*/

  return (
    <div className='flex items-center flex-col'>
      <h1 className="text-2xl font-bold mb-6 text-primary">Selecciona la plantilla</h1>
      <div className="grid grid-cols-2 gap-6 mb-6">
        {plantillasData.map((plantilla: Plantilla) => (
          <Card
            key={plantilla.id}
            id={plantilla.id}
            title={plantilla.nombre}
            description={plantilla.descripcion}
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

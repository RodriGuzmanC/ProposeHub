import { FormEvent, useState } from 'react';
import ModalBackground from '../global/ModalBackground';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { crearPlantilla } from '@/lib/services/plantilla';
import { crearConToast, notificacionAsyncrona } from '@/lib/utils/alertToast';
import { crearRol } from '@/lib/services/rol';
import { Rol } from '@/lib/utils/definitions';
import { useRouter } from 'next/navigation';

interface CreateTemplateModalProps {
  closeEvent: () => void;
  revalidate: any;
}

export default function CreateRolModal({ closeEvent, revalidate }: CreateTemplateModalProps) {

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    try {
      
      const nombre = formData.get('nombre') as string;
      const descripcion = formData.get('descripcion') as string;
      const rolNuevo: Partial<Rol> = {
        nombre: nombre,
        descripcion: descripcion
      }
      await notificacionAsyncrona(crearRol(rolNuevo), 'Creando...', 'Rol creado correctamente', 'Ocurrio un error, intentalo mas tarde')
      revalidate()
      closeEvent(); // Cierra el modal después de crear la plantilla

    } catch (error) {
      console.log(error)
    }

  };

  return (
    <ModalBackground>
      <Card className="w-[90%] max-w-md mx-auto bg-white text-primary">
        <form onSubmit={handleCreate}>

          <CardHeader className="flex flex-row items-center">
            <CardTitle className="text-2xl font-bold">Crear rol</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={closeEvent}
              aria-label="Cerrar"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Nombre:
            </CardDescription>
            <Input
              name='nombre'
              id='nombre'
              placeholder="Nombre del rol"
              required
            />
            <CardDescription className="mb-4 mt-4">
              Ingresa la descripcion
            </CardDescription>
            <Input
              name='descripcion'
              id='descripcion'
              placeholder="Descripcion corta"
              required
            />
          </CardContent>

          <CardFooter className="flex justify-end space-x-2">
            <Button variant="ghost" onClick={closeEvent}>
              Cancelar
            </Button>
            <Button type="submit">
              Crear
            </Button>
          </CardFooter>
        </form>

      </Card>
    </ModalBackground>
  );
}
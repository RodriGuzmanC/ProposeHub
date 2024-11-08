import { FormEvent, useState } from 'react';
import ModalBackground from '../global/ModalBackground';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { crearPlantilla } from '@/lib/services/plantilla';
import { crearConToast } from '@/lib/utils/alertToast';
import { crearRol } from '@/lib/services/rol';
import { crearServicio } from '@/lib/services/servicio';

interface CreateTemplateModalProps {
  closeEvent: () => void;
}

export default function CreateServiceModal({ closeEvent }: CreateTemplateModalProps) {
  const [templateName, setTemplateName] = useState('');

  const handleCreate = async (e : FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    console.log(data)
    try {
      await crearConToast({
        cuerpo: data,
        event: crearServicio
      });
    } catch (error) {
      console.log(error)
    }

    closeEvent(); // Cierra el modal después de crear la plantilla
  };

  return (
    <ModalBackground>
      <Card className="w-[90%] max-w-md mx-auto bg-white text-primary">
      <form onSubmit={handleCreate}>

        <CardHeader className="flex flex-row items-center">
          <CardTitle className="text-2xl font-bold">Crear servicio</CardTitle>
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
              placeholder="Nombre del servicio"
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
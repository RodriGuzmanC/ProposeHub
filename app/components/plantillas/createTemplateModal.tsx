import { FormEvent, useState } from 'react';
import ModalBackground from '../global/ModalBackground';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { crearPlantilla } from '@/lib/services/plantilla';
import { crearConToast, notificacionAsyncrona } from '@/lib/utils/alertToast';
import { useRouter } from 'next/navigation';
import { Plantilla } from '@/lib/utils/definitions';

interface CreateTemplateModalProps {
  closeEvent: () => void;
}

export default function CreateTemplateModal({ closeEvent }: CreateTemplateModalProps) {
  const [templateName, setTemplateName] = useState('');
  const router = useRouter()
  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    console.log(data)
    try {
      /*await crearConToast({
        cuerpo: data,
        event: crearPlantilla
      });*/
      const nombre = formData.get('nombre') as string;
      const descripcion = formData.get('descripcion') as string;

      const plantillaNueva: Partial<Plantilla> = {
        nombre: nombre,
        descripcion: descripcion,
        is_active: true
      }
      const plantilla : Partial<Plantilla> = await notificacionAsyncrona(crearPlantilla(plantillaNueva), 'Creando...', 'Plantilla creada correctamente', 'Ocurrio un error, intentalo mas tarde')
      closeEvent(); // Cierra el modal después de crear la plantilla
      router.push(`/constructor/plantilla/editar/${plantilla.id}`)

    } catch (error) {
      console.log(error)
    }
  };

  return (
    <ModalBackground>
      <Card className="w-[90%] max-w-md mx-auto bg-white text-primary">
        <form onSubmit={handleCreate}>

          <CardHeader className="flex flex-row items-center">
            <CardTitle className="text-2xl font-bold">Crear plantilla</CardTitle>
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
              Ingresa el nombre de la nueva plantilla
            </CardDescription>
            <Input
              name='nombre'
              id='nombre'
              placeholder="Nombre de la plantilla"
              required
            />
            <CardDescription className="mb-4 mt-4">
              Ingresa la descripcion
            </CardDescription>
            <Input
              name='descripcion'
              id='descripcion'
              placeholder="Descripcion corta de la plantilla"
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
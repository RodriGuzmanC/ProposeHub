import { FormEvent, useState } from 'react';
import ModalBackground from '../global/ModalBackground';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { crearPlantilla } from '@/lib/services/plantilla';
import { crearConToast, editarConToast, notificacionAsyncrona } from '@/lib/utils/alertToast';
import { crearRol, editarRol } from '@/lib/services/rol';
import { Rol } from '@/lib/utils/definitions';

interface CreateTemplateModalProps {
  id: number;
  closeEvent: () => void;
}

export default function EditRolModal({ id, closeEvent }: CreateTemplateModalProps) {
  const [templateName, setTemplateName] = useState('');

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    console.log(data)
    try {
      /*await editarConToast({
        id: id,
        cuerpo: data,
        event: editarRol
      });*/
      const nombre = formData.get('nombre') as string;
      const descripcion = formData.get('descripcion') as string;

      const organizacionActualizar: Partial<Rol> = {
        nombre: nombre,
        descripcion: descripcion,
      }
      await notificacionAsyncrona(editarRol(organizacionActualizar), 'Creando...', 'Rol creado con exito', 'Error, intentalo mas tarde')
    } catch (error) {
      console.log(error)
    }

    closeEvent(); // Cierra el modal después de crear la plantilla
  };

  return (
    <ModalBackground>
      <Card className="w-[90%] max-w-md mx-auto">
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
            <CardDescription className="mb-4">
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
            <Button variant="outline" onClick={closeEvent}>
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
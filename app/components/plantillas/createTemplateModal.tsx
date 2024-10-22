import { useState } from 'react';
import ModalBackground from '../global/ModalBackground';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface CreateTemplateModalProps {
  closeEvent: () => void;
}

export default function CreateTemplateModal({ closeEvent }: CreateTemplateModalProps) {
  const [templateName, setTemplateName] = useState('');

  const handleCreate = () => {
    console.log('Creando plantilla:', templateName);
    setTemplateName('');
    closeEvent(); // Cierra el modal después de crear la plantilla
  };

  return (
    <ModalBackground>
      <Card className="w-[90%] max-w-md mx-auto">
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
            value={templateName} 
            onChange={(e) => setTemplateName(e.target.value)} 
            placeholder="Nombre de la plantilla" 
          />
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={closeEvent}>
            Cancelar
          </Button>
          <Button onClick={handleCreate} disabled={!templateName.trim()}>
            Crear
          </Button>
        </CardFooter>
      </Card>
    </ModalBackground>
  );
}
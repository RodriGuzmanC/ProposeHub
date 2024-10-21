import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, UserX } from "lucide-react"
import ModalBackground from "./ModalBackground"
import { toast } from "react-toastify";

interface DeleteFormModalProps {
  userId: number;
  userName: string;
  closeEvent: () => void;
  deleteEvent: (id: number) => any;
}


export default function DeleteFormModal({userId, userName, closeEvent, deleteEvent} : DeleteFormModalProps) {
  function eliminarConToast(id: number){
    toast.promise(
      () => deleteEvent(id),
      {
        pending: 'Eliminando...',
        success: {
            render({data} : any) {
                closeEvent(); // Llama a closeEvent cuando la promesa se resuelve
                return data?.message ?? 'Eliminado correctamente ';
            },
        },
        error: {
          render({ data } : any) {
            // Aquí 'data' contiene el error rechazado
            return data?.message ?? 'Error al eliminar'; // Usa el mensaje de error o un mensaje predeterminado
        },
        },
    }
    )
  }
  return (
    <ModalBackground>
      
      <Card className="w-full max-w-lg mx-4 border-0 shadow-lg">
        <CardHeader className="space-y-1 pb-2">
          <CardTitle className="text-center text-2xl font-bold flex items-center justify-center text-destructive">
            <AlertTriangle className="w-6 h-6 mr-2" />
            Confirmar Eliminación
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="text-center space-y-2">
            <p className="text-lg text-muted-foreground">Estas por eliminar a:</p>
            <div className="flex items-center justify-center space-x-2 text-xl font-semibold bg-destructive/10 py-2 rounded-md">
              <UserX className="w-6 h-6 text-destructive" />
              <span>{userName}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Esta acción no se puede deshacer.
          </p>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4 pt-6">
          <Button variant="outline" onClick={closeEvent}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={() => eliminarConToast(userId)} >
            Eliminar
          </Button>
        </CardFooter>
      </Card>
    </ModalBackground>
  )
}
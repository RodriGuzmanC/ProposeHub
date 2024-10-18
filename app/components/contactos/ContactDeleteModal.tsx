import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, UserX } from "lucide-react"
import ModalBackground from "../global/ModalBackground";


interface DeleteFormModalProps {
  contactId: number;
  userName: string;
  closeEvent: () => void;
}

const deleteContact = (contactId: any) => {

}

export default function ContactDeleteModal({contactId, userName, closeEvent} : DeleteFormModalProps) {
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
            <p className="text-lg text-muted-foreground">Estar por eliminar A:</p>
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
          <Button variant="destructive" onClick={(contactId) => { deleteContact(contactId) }}>
            Eliminar
          </Button>
        </CardFooter>
      </Card>
    </ModalBackground>
  )
}
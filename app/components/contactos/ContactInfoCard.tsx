import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Edit, Eye, Trash } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import DeleteFormModal from "../global/DeleteForm"

interface ContactInfoProps{
    id: number,
    correo?: string,
    nombre: string,
    telefono?: number,
    organizacion?: number
}

export default function ContactInfoCard({ id, correo, nombre, telefono, organizacion } : ContactInfoProps) {
  {/** Oculta la ventana de eliminacion */}
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const showHideDeleteForm = () => {
    setShowDeleteModal(!showDeleteModal);
  }
  
  return (
    <Card className="w-full">
      {showDeleteModal && <DeleteFormModal userId={id} userName={nombre} closeEvent={showHideDeleteForm}></DeleteFormModal>}
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-principal-100 p-2 rounded-full">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{nombre}</h3>
            <div className="flex space-x-2 text-sm text-muted-foreground">
            {correo && <span>{correo}</span>}
            {correo && telefono && <span>|</span>}
            {telefono && <span>{telefono}</span>}
            {telefono && organizacion && <span>|</span>}
            {organizacion && <span>{organizacion}</span>}
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link href={'/viewer/123'}>
            <Button variant="ghost" size="icon">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={`personas/editar/${id}`}>
          <Button variant="ghost" size="icon">
            <Edit className="h-4 w-4" />
          </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={showHideDeleteForm}>
            <Trash className="h-4 w-4" color={'red'} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
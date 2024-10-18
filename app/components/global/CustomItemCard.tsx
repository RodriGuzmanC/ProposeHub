import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Edit, Eye, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import DeleteFormModal from "../global/DeleteForm";

interface ContactInfoCardProps {
  id: number;
  nombre: string;
  elementos: Array<string | number>; // Array de información genérica
  verHref: string;
  editarHref: string;
  eliminarAction: (id: number) => void;
  IconCard: React.ElementType;
}

export default function CustomItemCard({ id, nombre, elementos, verHref, editarHref, IconCard, eliminarAction }: ContactInfoCardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const showHideDeleteForm = () => {
    setShowDeleteModal(!showDeleteModal);
  };

  return (
    <Card className="w-full">
      {showDeleteModal && (
        <DeleteFormModal userId={id} userName={nombre} closeEvent={showHideDeleteForm} deleteEvent={eliminarAction}></DeleteFormModal>
      )}
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-principal-100 p-2 rounded-full">
            <IconCard className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{nombre}</h3>
            <div className="flex space-x-2 text-sm text-muted-foreground info-list">
              {elementos.map((elemento, index) => (
                <span key={index}>{elemento}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link href={verHref}>
            <Button variant="ghost" size="icon">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={editarHref}>
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
  );
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { X } from "lucide-react"

interface ProposalModalProps {
  isOpen: boolean
  onClose: () => void
  proposalName: string
  organizationName: string
  acceptFun: () => any
}

export default function AcceptModal({ 
  isOpen = true, 
  onClose = () => {}, 
  proposalName = "Nombre de la propuesta", 
  organizationName = "Nombre de la organización",
  acceptFun
}: ProposalModalProps) {
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const currentDate = new Date().toLocaleDateString('es-ES')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    acceptFun()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary">
            Aceptar propuesta
          </DialogTitle>
          <p>¡Estamos encantados de que haya elegido nuestra empresa para llevar adelante su proyecto! Por favor, revise los detalles y confirme para continuar.</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="proposal">Propuesta</Label>
              <div id="proposal" className="p-2 bg-gray-100 rounded-md text-gray-700">{proposalName}</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization">Organización</Label>
              <div id="organization" className="p-2 bg-gray-100 rounded-md text-gray-700">{organizationName}</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Fecha</Label>
              <div id="date" className="p-2 bg-gray-100 rounded-md text-gray-700">{currentDate}</div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
              />
              <Label
                htmlFor="terms"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Acepto los términos y condiciones de la aplicación
              </Label>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!acceptedTerms}>
              Aceptar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
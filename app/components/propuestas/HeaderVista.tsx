'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, Download, Menu, X } from "lucide-react"
import Image from 'next/image'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { getClientIdFromSession, logoutClientSession } from '@/lib/services/auth/auth'
import AcceptModal from './AcceptModal'
import { obtenerPropuesta } from '@/lib/services/propuesta'
import { obtenerClientes, obtenerClientesDeOrganizacion } from '@/lib/services/cliente'
import { Propuesta } from '@/lib/utils/definitions'

interface headerInt{
  slug: number | null,
  aceptarPropuestaFun: () => void,
  obtenerHtmlYGenerarPDF: () => void
}

export default function HeaderVistaPropuesta({ slug, aceptarPropuestaFun, obtenerHtmlYGenerarPDF }: headerInt) {

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false)
  const [isButtonActive, setIsButtonActive] = useState(false)

  const [Propuesta, setPropuesta] = useState<Partial<Propuesta>>()


  function logout() {
    logoutClientSession()
  }

  function aceptarPropuestaFunc(){
    const estado = aceptarPropuestaFun()
    setIsButtonActive(false)
  }

  useEffect(() => {
    async function cargar() {
      if (slug != null) {
        const propuesta = await obtenerPropuesta(slug)
        console.log("Propuesta objeto:")
        console.log(propuesta)
        setPropuesta(propuesta)
        if (propuesta.id_organizacion == undefined) throw new Error("Id organizacion no se difinio")
        const clientesDeOrganizacion = await obtenerClientesDeOrganizacion(propuesta.id_organizacion)
        const clienteIdSession = getClientIdFromSession()
        // Buscar si el cliente actual esta en la lista permitida
        const esPermitido = clientesDeOrganizacion.find((cliente : any)=> Number(cliente.id) === Number(clienteIdSession))

        console.log(clientesDeOrganizacion)
        if (propuesta.id_cliente == null && esPermitido !== undefined) {
          setIsButtonActive(true)
        }
      }

    }
    cargar()
  }, [])

  return (
    <header className="sticky top-0 left-0 w-full bg-white z-50">
      {isAcceptModalOpen ? <AcceptModal
        isOpen={isAcceptModalOpen}
        onClose={() => setIsAcceptModalOpen(false)}
        proposalName={Propuesta?.titulo ?? ''}
        organizationName={"a"}
        acceptFun={aceptarPropuestaFunc}
      /> : ''}
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Abrir menú" className='bg-black hover:bg-black'>
                  <Menu className="h-6 w-6 text-white hover:text-white" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-primary text-primary-foreground border-none w-[250px] sm:w-[300px]">
                <SheetHeader>
                  <SheetTitle>Menú</SheetTitle>

                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-8">
                  <Button variant="outline" className='text-primary' onClick={logout}>
                    Salir
                  </Button>
                  
                </nav>
              </SheetContent>
            </Sheet>
            <img src='https://th.bing.com/th/id/R.04c773a524584062fccbb8a85a172456?rik=gfuyLYbK2imAZw&pid=ImgRaw&r=0' height={30} width={175}></img>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="default" className="bg-primary text-white" onClick={() => setIsAcceptModalOpen(true)}
              disabled={!isButtonActive} // Deshabilita el botón cuando isButtonActive es false

            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Aceptar propuesta
            </Button>
            <Button className='hover:border-none' variant="outline" size="icon" onClick={obtenerHtmlYGenerarPDF}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>


    </header>
  )
}
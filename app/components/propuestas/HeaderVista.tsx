'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, Download, Menu, X } from "lucide-react"
import Image from 'next/image'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { logoutClientSession } from '@/lib/services/auth/auth'

export default function HeaderVistaPropuesta({ aceptarPropuestaFun, obtenerHtmlYGenerarPDF }: { 
  aceptarPropuestaFun: () => void, 
  obtenerHtmlYGenerarPDF: () => void 
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function logout(){
    logoutClientSession()
  }

  return (
    <header className="sticky top-0 left-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Abrir menú" className='bg-black hover:bg-black'>
                  <Menu className="h-6 w-6 text-white hover:text-white"/>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                <SheetHeader>
                  <SheetTitle>Menú</SheetTitle>
                  
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-8">
                  <Button variant="outline" onClick={logout}>
                    Salir
                  </Button>
                  <Button variant="outline" onClick={() => {
                    // Lógica para no aceptar propuesta
                    setIsMenuOpen(false)
                  }}>
                    No aceptar propuesta
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
            <img src='https://cdn.tres.pe/wp-content/uploads/2018/12/tresmedia-logo.png' height={30} width={175}></img>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="default" className="bg-green-600 hover:bg-green-700 text-white" onClick={aceptarPropuestaFun}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Aceptar propuesta
            </Button>
            <Button variant="outline" size="icon" onClick={obtenerHtmlYGenerarPDF}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      
    </header>
  )
}
'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface Paso4Props {
  tituloPropuesta: string
  setTituloPropuesta: (value: string) => void
  orgDescripcion: string
  setOrgDescripcion: (value: string) => void
  presupuesto: string
  setPresupuesto: (value: string) => void
  instruccionesAi: string
  setInstruccionesAi: (value: string) => void
  usarAi: boolean
  setUsarAi: (value: boolean) => void
  handleSubmit: () => void
}

export default function Paso4({
  tituloPropuesta, setTituloPropuesta,
  orgDescripcion, setOrgDescripcion,
  presupuesto, setPresupuesto,
  instruccionesAi, setInstruccionesAi,
  usarAi, setUsarAi,
  handleSubmit
}: Paso4Props) {

  return (
    <div className="w-full text-primary">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Información General</CardTitle>
        <CardDescription className="text-center">potenciado con AI</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre de la propuesta</Label>
            <Input
              id="nombre"
              value={tituloPropuesta}
              onChange={(e) => setTituloPropuesta(e.target.value)}
              placeholder="Propuesta"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="presupuesto">Presupuesto</Label>
            <Input
              type="number"
              id="presupuesto"
              value={presupuesto}
              onChange={(e) => setPresupuesto(e.target.value)}
              placeholder="Presupuesto de la propuesta"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="usarAi"
              checked={usarAi}
              onCheckedChange={(checked) => setUsarAi(checked as boolean)}
            />
            <Label htmlFor="usarAi">Crear propuesta con inteligencia artificial</Label>
          </div>

          {usarAi && (
            <>
              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción de la empresa</Label>
                <Textarea
                  id="descripcion"
                  value={orgDescripcion}
                  onChange={(e) => setOrgDescripcion(e.target.value)}
                  placeholder="Una breve descripción de la empresa"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="comentariosAdicionales">Comentarios adicionales</Label>
                <Textarea
                  id="comentariosAdicionales"
                  value={instruccionesAi}
                  onChange={(e) => setInstruccionesAi(e.target.value)}
                  placeholder="Indica en que tiene que poner énfasis la AI."
                  rows={4}
                />
              </div>
            </>
          )}

          <div className="flex justify-center">
            <Button type="submit">
              Generar Propuesta
            </Button>
          </div>
        </form>
      </CardContent>
    </div>
  )
}



/*interface Paso4Props {
  tituloPropuesta: string;
  setTituloPropuesta: (e: any) => void
  orgDescripcion: string
  setOrgDescripcion: (e: any) => void
  presupuesto: string
  setPresupuesto: (e: any) => void
  instruccionesAi: string
  setInstruccionesAi: (e: any) => void
  // Handle
  handleSubmit: () => void
}

export default function Paso4({ 
  tituloPropuesta, setTituloPropuesta, 
  orgDescripcion, setOrgDescripcion, 
  presupuesto, setPresupuesto, 
  instruccionesAi, setInstruccionesAi, 
  handleSubmit 
}: Paso4Props) {



  return (
    <div className="w-full">
      <h1 className="text-2xl text-gray-950 font-bold text-center mb-2">Información General</h1>
      <p className="text-center text-sm text-gray-950 mb-8">potenciado con AI</p>

      <form className="space-y-6">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre de la propuesta
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={tituloPropuesta}
            onChange={(e)=>{setTituloPropuesta(e.currentTarget.value)}}
            placeholder="Propuesta"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción de la empresa
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={orgDescripcion}
            onChange={(e)=>{setOrgDescripcion(e.currentTarget.value)}}
            placeholder="Una breve descripción de la empresa"
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div>
          <label htmlFor="presupuesto" className="block text-sm font-medium text-gray-700 mb-1">
            Presupuesto
          </label>
          <input
            type="number"
            id="presupuesto"
            name="presupuesto"
            value={presupuesto}
            onChange={(e)=>{setPresupuesto(e.currentTarget.value)}}
            placeholder="Presupuesto de la propuesta"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="comentariosAdicionales" className="block text-sm font-medium text-gray-700 mb-1">
            Comentarios adicionales
          </label>
          <textarea
            id="comentariosAdicionales"
            name="comentariosAdicionales"
            value={instruccionesAi}
            onChange={(e)=>{setInstruccionesAi(e.currentTarget.value)}}
            placeholder="Indica en que tiene que poner enfasis la AI."
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <div className="flex justify-center">
          <Button onClick={handleSubmit} variant='primary'>
            Generar Propuesta
          </Button>
        </div>
      </form>
    </div>
  );
}*/

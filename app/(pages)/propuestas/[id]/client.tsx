'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, DollarSignIcon, BuildingIcon, UsersIcon } from 'lucide-react'
import { Cliente, Propuesta } from '@/lib/utils/definitions'
import { obtenerClientesDeOrganizacion } from '@/lib/services/cliente'
import { formatearFechaSimple } from '@/lib/utils/datetimeFormater'
import { editarPropuesta } from '@/lib/services/propuesta'

const estados = [
    { id: 1, nombre: 'Progreso' },
    { id: 2, nombre: 'Abierto' },
    { id: 3, nombre: 'Aceptado' },
    { id: 4, nombre: 'Declinado' }
]

export default function PropuestaDetalle({ data }: { data: Propuesta }) {

    const [propuesta, setPropuesta] = useState<Propuesta>(data)
    const [clientes, setClientes] = useState<Cliente[]>([])
    const handleEstadoChange = async (nuevoEstado: '1' | '2' | '3' | '4') => {
        const propuestaCopia = propuesta
        propuestaCopia.id_estado = parseInt(nuevoEstado)
        setPropuesta(propuestaCopia)
        await editarPropuesta(propuesta.id, {
            id_estado: parseInt(nuevoEstado)
        })
    }

    const getEstadoColor = (estado: number) => {
        switch (estado) {
            case 1: return 'bg-yellow-100 text-yellow-800'
            case 2: return 'bg-yellow-100 text-yellow-800'
            case 3: return 'bg-green-100 text-green-800'
            case 4: return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    useEffect(() => {
        async function cargar() {
            const clientesData = await obtenerClientesDeOrganizacion(propuesta.id_organizacion ?? 0);
            setClientes(clientesData)
        }
        cargar()
    })

    return (
        <div className="container overflow-auto h-screen mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">{propuesta.titulo}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-2 mb-2">
                                <CalendarIcon className="w-5 h-5 text-gray-500" />
                                <span>Creada el: {formatearFechaSimple(propuesta.created_at ?? '')}</span>
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                                <DollarSignIcon className="w-5 h-5 text-gray-500" />
                                <span>Monto: S/{propuesta.monto.toLocaleString()}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Organización</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-2">
                                <BuildingIcon className="w-5 h-5 text-gray-500" />
                                <span>{propuesta.organizacion?.nombre}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Estado de la propuesta</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label htmlFor="estado" className='mb-2'>Cambiar estado</Label>
                                <Select onValueChange={handleEstadoChange} defaultValue={propuesta.id_estado?.toString() ?? '0'}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecciona un estado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Progreso</SelectItem>

                                        <SelectItem value="2">Abierto</SelectItem>
                                        <SelectItem value="3">Aceptado</SelectItem>
                                        <SelectItem value="4">Declinado</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className='flex flex-col'>
                                <Label>Estado actual</Label>
                                <Badge className={`w-fit mt-4 text-md ${getEstadoColor(propuesta.id_estado ?? 0)} capitalize`}>
                                    {estados.map((estado: any) => (
                                        <div>
                                            {propuesta.id_estado == estado.id && (
                                                estado.nombre
                                            )}
                                        </div>
                                    ))}
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className='overflow-auto'>
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold">Clientes</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                {clientes.map((cliente) => (
                                    <Card key={cliente.id} className="relative">
                                        <CardContent className="pt-6">
                                            {cliente.id == propuesta.id_cliente && (
                                                <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
                                                    Acepto
                                                </Badge>
                                            )}
                                            <h3 className="font-semibold text-lg mb-2">{cliente.nombre}</h3>
                                            <div className="space-y-1 text-sm">
                                                <p>Email: {cliente.correo}</p>
                                                <p>Teléfono: {cliente.telefono}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}


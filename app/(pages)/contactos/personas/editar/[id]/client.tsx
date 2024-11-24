'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Building, Mail, Phone, User, Users } from 'lucide-react'
import ButtonTheme from "@/app/components/global/ButtonTheme"
import { postData } from "@/lib/utils/methods"
import Link from "next/link"
import { FormEvent, useEffect, useState } from "react"
import BackLink from "@/app/components/global/BackLink"
import { editarCliente, obtenerCliente } from "@/lib/services/cliente"
import { Cliente, Organizacion } from "@/lib/utils/definitions"
import { editarConToast, notificacionAsyncrona } from "@/lib/utils/alertToast"
import { useRouter } from "next/navigation"




type PageProps = {
    datosContactoActual: Cliente
    organizaciones: Organizacion[]
}




export default function EditarClienteClient({ datosContactoActual, organizaciones }: PageProps) {
    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formEntries = Object.fromEntries(formData.entries());
        console.log(formEntries)
        try {
            /*await editarConToast({
                id: datosContactoActual.id,
                cuerpo: formEntries, 
                event: editarCliente 
            });*/

            const nombre = formData.get('nombre') as string;
            const telefono = formData.get('telefono') as string;
            const correo = formData.get('correo') as string;
            const organizacionId = formData.get('organizacion') as string;

            const clienteEditar: Partial<Cliente> = {
                id: datosContactoActual.id,
                nombre: nombre,
                telefono: telefono,
                correo: correo,
                organizacion: {
                    id: parseInt(organizacionId),
                    correo: '',
                    created_at: '',
                    nombre: '',
                    telefono: '',
                    updated_at: ''
                }
            }
            await notificacionAsyncrona(editarCliente(clienteEditar), 'Editando...', 'Contacto editado correctamente', 'Ocurrio un error, intentalo mas tarde')
            router.push('/contactos/personas')

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="container mx-auto px-8 py-8">
            <BackLink href="/contactos/personas">Volver a contactos</BackLink>

            <h1 className="text-3xl font-bold mb-6">Editar Contacto - {datosContactoActual?.id}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <div className="relative">
                        <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            id="nombre"
                            name="nombre"
                            className="pl-8"
                            defaultValue={datosContactoActual?.nombre}
                            required
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="correo">Correo</Label>
                    <div className="relative">
                        <Mail className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            id="correo"
                            name="correo"
                            type="email"
                            className="pl-8"
                            defaultValue={datosContactoActual?.correo}
                            required
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <div className="relative">
                        <Phone className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            id="telefono"
                            name="telefono"
                            type="tel"
                            className="pl-8"
                            defaultValue={datosContactoActual?.telefono}
                            required
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="organizacion">Organización</Label>
                    <div className="relative">
                        <Building className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 z-10" />
                        <Select name="organizacion" defaultValue={datosContactoActual?.organizacion.id.toString()}>
                            <SelectTrigger className="pl-8">
                                <SelectValue placeholder="Selecciona una organización" />
                            </SelectTrigger>
                            <SelectContent>
                                {organizaciones.map((organizacion: Organizacion) => (
                                    <SelectItem key={organizacion.id} value={organizacion.id.toString()}>
                                        {organizacion.nombre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className='w-full flex justify-end'>
                    <ButtonTheme type="submit" className='w-fit'>
                        <Users className="mr-2 h-4 w-4" />
                        Editar Contacto
                    </ButtonTheme>
                </div>
            </form>
        </div>
    )
}

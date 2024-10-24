"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Phone, Users, Mail } from 'lucide-react'
import ButtonTheme from "@/app/components/global/ButtonTheme"
import { FormEvent } from 'react'
import BackLink from "@/app/components/global/BackLink"
import { editarOrganizacion } from "@/lib/services/organizacion"
import { editarConToast } from "@/lib/utils/alertToast"

interface PageProps {
    organizacion: any
}


export default async function EditarOrganizacionesClient({ organizacion }: PageProps) {

     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const formEntries = Object.fromEntries(formData.entries())
    
        try {
            await editarConToast({
                id: organizacion.id,
                cuerpo: formEntries, 
                event: editarOrganizacion 
            });
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className="container mx-auto px-8 py-8">

            <BackLink href="/contactos/organizaciones">Volver a organizaciones</BackLink>

            <h1 className="text-3xl font-bold mb-6">Editar Organizacion - {organizacion.id}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <div className="relative">
                        <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            id="nombre"
                            name="nombre"
                            className="pl-8"
                            defaultValue={organizacion.nombre}
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
                            defaultValue={organizacion.correo}
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
                            defaultValue={organizacion.telefono}
                            required
                        />
                    </div>
                </div>

                <div className='w-full flex justify-end'>
                    <ButtonTheme
                        type="submit"
                        className='w-fit'
                    >
                        <Users className="mr-2 h-4 w-4" />
                        Editar Organizacion
                    </ButtonTheme>
                </div>
            </form>
        </div>
    )
}

"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Phone, Users, Mail, Group } from 'lucide-react'
import ButtonTheme from "@/app/components/global/ButtonTheme"
import { FormEvent, useEffect, useState } from 'react'
import BackLink from "@/app/components/global/BackLink"
import { editarOrganizacion } from "@/lib/services/organizacion"
import { editarConToast } from "@/lib/utils/alertToast"
import { editarRol, obtenerRol } from "@/lib/services/rol"

interface PageProps {
    rol: any
}


export default function EditarRolesClient({ rol }: PageProps) {
    const [rolActual, setRolActual] = useState<any>({})

     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const formEntries = Object.fromEntries(formData.entries())
    
        try {
            await editarConToast({
                id: parseInt(rol.id),
                cuerpo: formEntries, 
                event: editarRol 
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container mx-auto px-8 py-8">

            <BackLink href="/roles/">Volver a roles</BackLink>

            <h1 className="text-3xl font-bold mb-6">Editar Rol</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <div className="relative">
                        <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            id="nombre"
                            name="nombre"
                            className="pl-8"
                            defaultValue={rol.nombre}
                            required
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="descripcion">Descripcion</Label>
                    <div className="relative">
                        <Mail className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            id="descripcion"
                            name="descripcion"
                            type="text"
                            className="pl-8"
                            defaultValue={rol.descripcion}
                            required
                        />
                    </div>
                </div>

                <div className='w-full flex justify-end'>
                    <ButtonTheme
                        type="submit"
                        className='w-fit'
                    >
                        <Group className="mr-2 h-4 w-4" />
                        Editar Rol
                    </ButtonTheme>
                </div>
            </form>
        </div>
    )
}
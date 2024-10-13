'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Phone, ArrowLeft, MapPin, Building, Users, X, Mail } from 'lucide-react'
import ButtonTheme from "@/app/components/global/ButtonTheme"
import { postData } from "@/lib/methods"
import Link from "next/link"
import { FormEvent } from 'react'
import { OrganizationsDataExample } from "@/lib/api"
import BackLink from "@/app/components/global/BackLink"

interface PageProps {
    params: { id: string }
}

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const formEntries = Object.fromEntries(formData.entries())
    console.log('Form submitted:', formEntries)

    try {
        postData('https://proposehub.p.rapidapi.com/personas', { formEntries })
            .then(data => {
                console.log(data); // JSON data parsed by `data.json()` call
            });
    } catch (error) {
        console.log(error)
    }
}


export default function Page({ params }: PageProps) {
    const organizacionActual = OrganizationsDataExample.find((c) => c.id == parseInt(params.id))

    if (!organizacionActual) return <p>Organización no encontrada</p>

    return (
        <div className="container mx-auto px-8 py-8">

            <BackLink href="/contactos/organizaciones">Volver a organizaciones</BackLink>

            <h1 className="text-3xl font-bold mb-6">Editar Organizacion - {params.id}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <div className="relative">
                        <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            id="nombre"
                            name="nombre"
                            className="pl-8"
                            defaultValue={organizacionActual.nombre}
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
                            defaultValue={organizacionActual.correo}
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
                            defaultValue={organizacionActual.telefono}
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

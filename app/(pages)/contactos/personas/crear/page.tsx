'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Phone, ArrowLeft, Building, Users, Mail } from 'lucide-react'
import ButtonTheme from "@/app/components/global/ButtonTheme"
import { postData } from "@/lib/methods"
import Link from "next/link"
import { FormEvent } from "react"
import BackLink from "@/app/components/global/BackLink"

interface Organization {
    id: number
    nombre: string
    telefono: string
    correo: string
}

const organizationsData: Organization[] = [
    { id: 1, nombre: "Organización Alpha", telefono: "555-1234", correo: "contacto@alpha.com" },
    { id: 2, nombre: "Beta Solutions", telefono: "555-5678", correo: "info@beta.com" },
    { id: 3, nombre: "Gamma Corp", telefono: "555-9101", correo: "support@gamma.com" },
    { id: 4, nombre: "Delta Group", telefono: "555-1213", correo: "sales@delta.com" },
    { id: 5, nombre: "Epsilon Enterprises", telefono: "555-1415", correo: "contact@epsilon.com" },
    { id: 6, nombre: "Zeta Innovations", telefono: "555-1617", correo: "hello@zeta.com" },
    { id: 7, nombre: "Eta Solutions", telefono: "555-1819", correo: "info@eta.com" },
    { id: 8, nombre: "Theta Technologies", telefono: "555-2021", correo: "support@theta.com" },
    { id: 9, nombre: "Iota Ventures", telefono: "555-2223", correo: "hello@iota.com" },
    { id: 10, nombre: "Kappa Labs", telefono: "555-2425", correo: "contact@kappa.com" }
]

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const formEntries = Object.fromEntries(formData.entries())
    console.log('Form submitted:', formEntries)

    try {
        postData('https://proposehub.p.rapidapi.com/personas', { formEntries })
            .then(data => {
                console.log(data) // JSON data parsed by `data.json()` call
            })
    } catch (error) {
        console.error(error)
    }
}

export default function Page() {
    return (
        <div className="container mx-auto px-8 py-8">
            <BackLink href="/contactos/personas">Volver a contactos</BackLink>

            <h1 className="text-3xl font-bold mb-6">Crear Nuevo Contacto</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <div className="relative">
                        <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input id="nombre" name="nombre" className="pl-8" required />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="correo">Correo</Label>
                    <div className="relative">
                        <Mail className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input id="correo" name="correo" type="email" className="pl-8" required />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <div className="relative">
                        <Phone className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input id="telefono" name="telefono" type="tel" className="pl-8" required />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="organization">Organización</Label>
                    <div className="relative">
                        <Building className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 z-10" />
                        <Select name="organization">
                            <SelectTrigger className="pl-8">
                                <SelectValue placeholder="Selecciona una organización" />
                            </SelectTrigger>
                            <SelectContent>
                                {organizationsData.map((organizacion) => (
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
                        Crear Contacto
                    </ButtonTheme>
                </div>
            </form>
        </div>
    )
}

'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Phone, ArrowLeft, Building, Users, Mail, Key } from 'lucide-react'
import ButtonTheme from "@/app/components/global/ButtonTheme"
import { postData } from "@/lib/methods"
import Link from "next/link"
import { FormEvent } from "react"
import { rolesData } from "@/lib/api"
import BackLink from "@/app/components/global/BackLink"




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
            <BackLink href="/usuarios">Volver a usuarios</BackLink>
            <h1 className="text-3xl font-bold mb-6">Crear Nuevo Usuario</h1>
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
                    <Label htmlFor="clave">Contraseña</Label>
                    <div className="relative">
                        <Key className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input id="clave" name="clave" type="password" className="pl-8" required />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="rol">Rol</Label>
                    <div className="relative">
                        <Building className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 z-10" />
                        <Select name="rol">
                            <SelectTrigger className="pl-8">
                                <SelectValue placeholder="Selecciona un rol" />
                            </SelectTrigger>
                            <SelectContent>
                                {rolesData.map((rol) => (
                                    <SelectItem key={rol.id} value={rol.id.toString()}>
                                        {rol.nombre}
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

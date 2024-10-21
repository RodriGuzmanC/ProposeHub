'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Building, Mail, Phone, User, Users } from 'lucide-react'
import ButtonTheme from "@/app/components/global/ButtonTheme"
import { postData } from "@/lib/utils/methods"
import Link from "next/link"
import { FormEvent } from "react"
import BackLink from "@/app/components/global/BackLink"
import { editarUsuario } from "@/lib/services/usuario"
import { editarConToast } from "@/lib/utils/alertToast"




const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formEntries = Object.fromEntries(formData.entries());
    console.log(formEntries)
    try {
        const data = await postData('https://proposehub.p.rapidapi.com/personas', { formEntries });
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

export default function EditarUsuarioClientPage({ usuario, roles }: any) {

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formEntries = Object.fromEntries(formData.entries());
        console.log(formEntries)
        try {
            await editarConToast({
                id: usuario.id,
                cuerpo: formEntries, 
                event: editarUsuario 
            });
            
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="container mx-auto px-8 py-8">
            <BackLink href="/usuarios">Volver a usuarios</BackLink>
            <h1 className="text-3xl font-bold mb-6">Editar Usuario - {usuario.id}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <div className="relative">
                        <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            id="nombre"
                            name="nombre"
                            className="pl-8"
                            defaultValue={usuario.nombre}
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
                            defaultValue={usuario.correo}
                            required
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="rol">Rol</Label>
                    <div className="relative">
                        <Building className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 z-10" />
                        <Select name="rol" defaultValue={usuario.id_rol.toString()}>
                            <SelectTrigger className="pl-8">
                                <SelectValue placeholder="Selecciona un rol" />
                            </SelectTrigger>
                            <SelectContent>
                                {roles.map((rol: any) => (
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
                        Editar Usuario
                    </ButtonTheme>
                </div>
            </form>
        </div>
    )
}

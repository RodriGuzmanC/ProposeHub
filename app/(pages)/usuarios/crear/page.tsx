'use client'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Building, Users, Mail, Key } from 'lucide-react'
import ButtonTheme from "@/app/components/global/ButtonTheme"
import { FormEvent, useEffect, useState } from "react"
import BackLink from "@/app/components/global/BackLink"
import { registrarUsuario } from "@/lib/services/usuario"
import { crearConToast } from "@/lib/utils/alertToast"
import { obtenerRoles } from "@/lib/services/rol"



export default function Page() {

    const [roles, setRoles] = useState<any>([]);

    const fetchRoles = async () => {
        const data = await obtenerRoles();
        setRoles(data);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const formEntries = Object.fromEntries(formData.entries())
        console.log('Form submitted:', formEntries)
    
        try {
            const data = {
                nombre: formEntries.nombre,
                correo: formEntries.correo,
                contrasena: formEntries.clave,
                id_rol: formEntries.rol,
              }
              //console.log(data)
              
            const res = await crearConToast({
                cuerpo: data,
                event: registrarUsuario
            });
            console.log(res)
    
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchRoles();
    }, []);

    return (
        <div className="container mx-auto px-8 py-8 bg-white text-primary">
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
                        Crear Usuario
                    </ButtonTheme>
                </div>
            </form>
        </div>
    )
}

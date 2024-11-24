'use client'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Phone, Mail, Building2 } from 'lucide-react'
import ButtonTheme from "@/app/components/global/ButtonTheme"
import BackLink from "@/app/components/global/BackLink"
import { crearOrganizacion } from "@/lib/services/organizacion"
import { crearConToast, notificacionAsyncrona } from "@/lib/utils/alertToast"
import { Organizacion } from "@/lib/utils/definitions"
import { useRouter } from "next/navigation"


export default function page() {
    const router = useRouter()

    async function handleSubmit(e: any) {

        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const formEntries = Object.fromEntries(formData.entries())
        try {
            /*await crearConToast({
                cuerpo: formEntries, 
                event: crearOrganizacion 
            });*/

            const nombre = formData.get('nombre') as string;
            const telefono = formData.get('telefono') as string;
            const correo = formData.get('correo') as string;

            const organizacionNueva: Partial<Organizacion> = {
                nombre: nombre,
                telefono: telefono,
                correo: correo
            }
            await notificacionAsyncrona(crearOrganizacion(organizacionNueva), 'Creando...', 'Organizacion creada correctamente', 'Ocurrio un error, intentalo mas tarde')
            router.push('/contactos/organizaciones')
        } catch (error) {
            console.log(error)
        }

    }


    return (
        <div className="container mx-auto px-8 py-8">
            <BackLink href="/contactos/organizaciones">Volver a organizaciones</BackLink>
            <h1 className="text-3xl font-bold mb-6">Crear Organización</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <div className="relative">
                        <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            id="nombre"
                            name="nombre"
                            className="pl-8"
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
                            required
                        />
                    </div>
                </div>

                <div className='w-full flex justify-end'>
                    <ButtonTheme
                        type="submit"
                        className='w-fit'
                    >
                        <Building2 className="mr-2 h-4 w-4" />
                        Crear Organizacion
                    </ButtonTheme>
                </div>
            </form>
        </div>
    )
}


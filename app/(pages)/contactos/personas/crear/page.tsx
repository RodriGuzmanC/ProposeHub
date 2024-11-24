'use client'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Phone, ArrowLeft, Building, Users, Mail } from 'lucide-react'
import ButtonTheme from "@/app/components/global/ButtonTheme"
import { FormEvent, useEffect, useState } from "react"
import BackLink from "@/app/components/global/BackLink"
import { crearCliente } from "@/lib/services/cliente"
import { obtenerOrganizaciones } from "@/lib/services/organizacion"
import { crearConToast, notificacionAsyncrona } from "@/lib/utils/alertToast"
import { Cliente, Organizacion } from "@/lib/utils/definitions"
import { useRouter } from "next/navigation"





export default function Page() {
    const [organizaciones, setOrganizaciones] = useState<Organizacion[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const formEntries = Object.fromEntries(formData.entries())
        console.log('Form submitted:', formEntries)

        try {

            /*await crearConToast({ 
                cuerpo: formEntries, 
                event: crearCliente 
            });*/
            const nombre = formData.get('nombre') as string;
            const telefono = formData.get('telefono') as string;
            const correo = formData.get('correo') as string;
            const organizacionId = formData.get('organizacion') as string;

            const clienteNuevo: Partial<Cliente> = {
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
            await notificacionAsyncrona(crearCliente(clienteNuevo), 'Creando...', 'Contacto creado correctamente', 'Ocurrio un error, intentalo mas tarde')
            router.push('/contactos/personas')
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        const fetchOrganizaciones = async () => {
            try {
                const resultado = await obtenerOrganizaciones();
                setOrganizaciones(resultado);
            } catch (error) {
                console.error(error);
                setError('Error al cargar organizaciones');
            } finally {
                setLoading(false);
            }
        };
        fetchOrganizaciones();
    }, []);

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
                    <Label htmlFor="organizacion">Organización</Label>
                    <div className="relative">
                        <Building className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 z-10" />
                        <Select name="organizacion">
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
                        Crear Contacto
                    </ButtonTheme>
                </div>
            </form>
        </div>
    )
}

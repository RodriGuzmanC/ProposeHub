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

type Contact = {
    id: number;
    correo: string;
    nombre: string;
    telefono: string;
    organizacion: number;
    estado: string;
}

type Organization = {
    id: number;
    nombre: string;
    telefono: string;
    correo: string;
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
];

const contactos: Contact[] = [
    { id: 1, correo: 'juan@gmail.com', nombre: 'Juan Pérez', telefono: '555-1234', organizacion: 1, estado: 'activo' },
    { id: 2, correo: 'mari@gmail.com', nombre: 'María López', telefono: '555-5678', organizacion: 2, estado: 'activo' },
    { id: 3, correo: 'carlos@gmail.com', nombre: 'Carlos García', telefono: '555-9012', organizacion: 3, estado: 'activo' },
    { id: 4, correo: 'ana@gmail.com', nombre: 'Ana González', telefono: '555-3456', organizacion: 4, estado: 'inactivo' },
    { id: 5, correo: 'pedro@gmail.com', nombre: 'Pedro Martínez', telefono: '555-7890', organizacion: 5, estado: 'activo' },
    { id: 6, correo: 'sofia@gmail.com', nombre: 'Sofía Fernández', telefono: '555-1122', organizacion: 6, estado: 'inactivo' }
]

type PageProps = {
    params: {
        id: string;
    };
}

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

export default function Page({ params }: PageProps) {
    const contactoActual = contactos.find((c) => c.id === parseInt(params.id));

    if (!contactoActual) {
        return <p>Contacto no encontrado</p>;
    }

    return (
        <div className="container mx-auto px-8 py-8">
            <Link href="/contactos/personas" className="flex items-center text-principal-200 mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Contactos
            </Link>
            <h1 className="text-3xl font-bold mb-6">Editar Contacto - {params.id}</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <div className="relative">
                        <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                            id="nombre"
                            name="nombre"
                            className="pl-8"
                            defaultValue={contactoActual.nombre}
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
                            defaultValue={contactoActual.correo}
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
                            defaultValue={contactoActual.telefono}
                            required
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="organization">Organización</Label>
                    <div className="relative">
                        <Building className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 z-10" />
                        <Select name="organization" defaultValue={contactoActual.organizacion.toString()}>
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
                        Editar Contacto
                    </ButtonTheme>
                </div>
            </form>
        </div>
    )
}

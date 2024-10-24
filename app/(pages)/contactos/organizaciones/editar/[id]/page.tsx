"use server"
import EditarOrganizacionesClient from "./client"
import { obtenerOrganizacion } from "@/lib/services/organizacion"

interface PageProps {
    params: { id: string }
}

const fetchOrganizacion = async (id: number) => {
    try {
        return await obtenerOrganizacion(id);;
    } catch (error) {
        console.error(error);
    }
};


export default async function Page({ params }: PageProps) {
    // Llama a fetchCliente directamente
    const organizacion = await fetchOrganizacion(parseInt(params.id));
    
    return (
        <EditarOrganizacionesClient organizacion={organizacion}></EditarOrganizacionesClient>
    )
}

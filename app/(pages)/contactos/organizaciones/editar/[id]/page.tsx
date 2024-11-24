"use server"
import ErrorInterface from "@/app/components/global/ErrorInterface";
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
    if (organizacion == undefined) return <ErrorInterface></ErrorInterface>

    return (
        <EditarOrganizacionesClient organizacion={organizacion}></EditarOrganizacionesClient>
    )
}

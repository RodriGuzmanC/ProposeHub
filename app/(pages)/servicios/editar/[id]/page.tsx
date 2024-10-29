"use server"
import { obtenerRol } from "@/lib/services/rol";
import EditarRolesClient from "./client";
import EditarOrganizacionesClient from "./client"
import { obtenerOrganizacion } from "@/lib/services/organizacion"
import EditarServiciosClient from "./client";
import { obtenerServicio } from "@/lib/services/servicio";

interface PageProps {
    params: { id: string }
}

const fetchServicio = async (id: number) => {
    try {
        const data = await obtenerServicio(id);;
        return data
    } catch (error) {
        console.error(error);
    }
};


export default async function Page({ params }: PageProps) {
    // Llama a fetchCliente directamente
    const servicio = await fetchServicio(parseInt(params.id));

    return (
        <EditarServiciosClient servicio={servicio}></EditarServiciosClient>
    )
}

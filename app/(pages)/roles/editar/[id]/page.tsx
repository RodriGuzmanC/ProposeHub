"use server"
import { obtenerRol } from "@/lib/services/rol";
import EditarRolesClient from "./client";
import EditarOrganizacionesClient from "./client"
import { obtenerOrganizacion } from "@/lib/services/organizacion"

interface PageProps {
    params: { id: string }
}

const fetchRol = async (id: number) => {
    try {
        const data = await obtenerRol(id);;
        return data
    } catch (error) {
        console.error(error);
    }
};


export default async function Page({ params }: PageProps) {
    // Llama a fetchCliente directamente
    const rol = await fetchRol(parseInt(params.id));
    console.log(rol)
    return (
        <EditarRolesClient rol={rol}></EditarRolesClient>
    )
}

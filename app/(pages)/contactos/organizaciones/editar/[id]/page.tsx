import EditarOrganizacionesClient from "./client"
import { obtenerOrganizacion } from "@/lib/services/organizacion"

interface PageProps {
    params: { id: string }
}

const fetchOrganizacion = async (id: number) => {
    try {
        const resultado = await obtenerOrganizacion(id);
        return resultado;
    } catch (error) {
        console.error(error);
        return []; // Retornar un arreglo vacío en caso de error
    }
};


export default async function Page({ params }: PageProps) {
    // Llama a fetchCliente directamente
    const organizacion = await fetchOrganizacion(parseInt(params.id));

    console.log(organizacion)
    
    return (
        <EditarOrganizacionesClient organizacion={organizacion}></EditarOrganizacionesClient>
    )
}

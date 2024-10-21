import { obtenerCliente } from "@/lib/services/cliente"
import EditarClienteClient from "./client"
import { obtenerOrganizaciones } from "@/lib/services/organizacion";


const fetchOrganizaciones = async () => {
    try {
        const resultado = await obtenerOrganizaciones();
        return resultado;
    } catch (error) {
        console.error(error);
        return []; // Retornar un arreglo vacío en caso de error
    }
};

const fetchCliente = async (id: number) => {
    try {
        const resultado = await obtenerCliente(id);

        return resultado
    } catch (error) {
        console.error(error);
    }
};

type PageProps = {
    params: {
        id: string;
    }
}

export default async function Page({ params }: PageProps) {

    // Llama a fetchCliente directamente
    const cliente = await fetchCliente(parseInt(params.id));
    const organizaciones = await fetchOrganizaciones();

    console.log(cliente)
    return (
        <EditarClienteClient datosContactoActual={cliente} organizaciones={organizaciones}></EditarClienteClient>
    )
}

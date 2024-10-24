
import EditarUsuarioClientPage from "./client"
import { obtenerRoles } from "@/lib/services/rol"
import { obtenerUsuario } from "@/lib/services/usuario"


type PageProps = {
    params: {
        id: string;
    };
}

const fetchUsuario = async (id: number) => {
    try {
        const resultado = await obtenerUsuario(id);

        return resultado
    } catch (error) {
        console.error(error);
    }
};

export default async function Page({ params }: PageProps) {
    // Llama a fetchCliente directamente
    const usuario = await fetchUsuario(parseInt(params.id));

    return (
        <EditarUsuarioClientPage usuario={usuario} ></EditarUsuarioClientPage>
    )
}

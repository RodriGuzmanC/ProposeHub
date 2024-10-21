import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Building, Mail, Phone, User, Users } from 'lucide-react'
import ButtonTheme from "@/app/components/global/ButtonTheme"
import { postData } from "@/lib/utils/methods"
import Link from "next/link"
import { FormEvent } from "react"
import BackLink from "@/app/components/global/BackLink"
import EditarUsuarioClientPage from "./client"
import { obtenerRoles } from "@/lib/services/rol"
import { obtenerUsuario } from "@/lib/services/usuario"


type PageProps = {
    params: {
        id: string;
    };
}

const fetchRoles = async () => {
    try {
        const resultado = await obtenerRoles();
        return resultado;
    } catch (error) {
        console.error(error);
        return []; // Retornar un arreglo vacío en caso de error
    }
};

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
    const roles = await fetchRoles();

    return (
        <EditarUsuarioClientPage usuario={usuario} roles={roles} ></EditarUsuarioClientPage>
    )
}

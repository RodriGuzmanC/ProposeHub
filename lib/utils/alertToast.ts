import { toast } from "react-toastify";

interface toastInterface{
    cuerpo: any
    event: (cuerpo: any) => any
}

interface toastEditInterface{
    id: number
    cuerpo: any
    event: (id: number, cuerpo: any) => any
}

interface toastLoginInterface{
    correo: string
    clave: string
    event: (correo: string, clave: string) => any
}

export async function crearConToast({cuerpo, event} : toastInterface){
    toast.promise(
      () => event(cuerpo),
      {
        pending: 'Creando...',
        success: {
            render({data} : any) {
                return data?.message ?? 'Creado correctamente ';
            },
        },
        error: {
          render({ data } : any) {
            // Aquí 'data' contiene el error rechazado
            return data?.message ?? 'Error al crear'; // Usa el mensaje de error o un mensaje predeterminado
        },
        },
    }
    )
}

export async function editarConToast({ id, cuerpo, event }: toastEditInterface) {
    toast.promise(
        () => event(id, cuerpo),
        {
            pending: 'Editando...',
            success: {
                render({ data }: any) {
                    return data?.message ?? 'Editado correctamente';
                },
            },
            error: {
                render({ data }: any) {
                    return data?.message ?? 'Error al editar';
                },
            },
        }
    );
}



export async function EnviarCorreoConToast({ cuerpo, event }: toastInterface) {
    toast.promise(
        () => event(cuerpo),
        {
            pending: 'Enviando...',
            success: {
                render({ data }: any) {
                    return data?.message ?? 'Enviado correctamente';
                },
            },
            error: {
                render({ data }: any) {
                    return data?.message ?? 'Error al enviar';
                },
            },
        }
    );
}



export async function loginConToast({ correo, clave, event }: toastLoginInterface) {
    toast.promise(
        () => event(correo, clave),
        {
            pending: 'Validando...',
            success: {
                render({ data }: any) {
                    return data?.message ?? 'Logueado correctamente';
                },
            },
            error: {
                render({ data }: any) {
                    return data?.message ?? 'Error al loguearse';
                },
            },
        }
    );
}
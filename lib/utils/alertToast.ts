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

export async function crearConToast({cuerpo, event} : toastInterface){
    toast.promise(
      () => event(cuerpo),
      {
        pending: 'Eliminando...',
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
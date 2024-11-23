import { toast } from "react-toastify";

interface toastInterface {
    cuerpo: any
    event: (cuerpo: any) => any
}

interface toastEditInterface {
    id: number
    cuerpo: any
    event: (id: number, cuerpo: any) => any
}

interface toastLoginInterface {
    correo: string
    clave: string
    event: (correo: string, clave: string) => any
}


interface toastSubirImagenInterface {
    body: any
    event: (body: any) => any
}

interface toastRecuperarContrasenaInterface {
    correo: string
    recuperarRuta: string
    event: (correo: string, recuperarRuta: string) => any
}

interface cambiarContrasenaInterface {
    id_usuario: number
    contrasena: string
    event: (id_usuario: number, contrasena: string) => any
}



export async function crearConToast({ cuerpo, event }: toastInterface) {
    toast.promise(
        () => event(cuerpo),
        {
            pending: 'Creando...',
            success: {
                render({ data }: any) {
                    return data?.message ?? 'Creado correctamente ';
                },
            },
            error: {
                render({ data }: any) {
                    // Aquí 'data' contiene el error rechazado
                    return data?.message ?? 'Error al crear'; // Usa el mensaje de error o un mensaje predeterminado
                },
            },
        }
    )
}

export async function editarConToast({ id, cuerpo, event }: toastEditInterface) {
    return toast.promise(
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
    return toast.promise(
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

export async function subirImagenConToast({ body, event }: toastSubirImagenInterface) {
    return toast.promise(
        () => event(body),
        {
            pending: 'Guardando...',
            success: {
                render({ data }: any) {
                    return data?.message ?? 'Guardado correctamente';
                },
            },
            error: {
                render({ data }: any) {
                    return data?.message ?? 'Error al guardar el recurso';
                },
            },
        }
    );
}


export async function recuperarContrasenaConToast({ correo, recuperarRuta, event }: toastRecuperarContrasenaInterface) {
    return toast.promise(
        () => event(correo, recuperarRuta),
        {
            pending: 'Estamos procesando tu solicitud, por favor espera...',
            success: {
                render({ data }: any) {
                    return data?.message ?? '¡Listo! Te hemos enviado un correo con las instrucciones para recuperar tu contraseña.';
                },
            },
            error: {
                render({ data }: any) {
                    return data?.message ?? 'Hubo un problema al procesar tu solicitud. Intenta nuevamente más tarde.';
                },
            },

        }
    )
        ;
}



export async function cambiarContrasenaConToast({ id_usuario, contrasena, event }: cambiarContrasenaInterface) {
    return toast.promise(
        () => event(id_usuario, contrasena),
        {
            pending: 'Estamos procesando tu solicitud, por favor espera...',
            success: {
                render({ data }: any) {
                    return data?.message ?? '¡Listo! Tu contraseña ha sido actualizada, intenta iniciar sesion';
                },
            },
            error: {
                render({ data }: any) {
                    return data?.message ?? 'Hubo un problema al procesar tu solicitud. Intenta nuevamente más tarde.';
                },
            },

        }
    );
}




export const notificacionToast = {
    success: (message: string) => {
        toast.success(message);
    },
    error: (message: string) => {
        toast.error(message);
    },
    info: (message: string) => {
        toast.info(message);
    },
    warn: (message: string) => {
        toast.warn(message);
    },
};

// Función asíncrona para manejar operaciones con promesas
export async function notificacionAsyncrona(promise: Promise<void>, loadingMessage = 'Cargando...', successMessage = 'Operación exitosa', errorMessage = 'Hubo un error') {
    const toastId = toast.loading(loadingMessage); // Mostrar un toast de carga

    try {
        // Esperamos la promesa
        await promise;

        // Si la promesa se resuelve con éxito, mostramos un toast de éxito
        toast.update(toastId, {
            render: successMessage,
            type: 'success',
            isLoading: false,
            autoClose: 5000
        });
    } catch (error) {
        // Si la promesa falla, mostramos un toast de error
        toast.update(toastId, {
            render: errorMessage,
            type: 'error',
            isLoading: false,
            autoClose: 5000
        });
    }
}


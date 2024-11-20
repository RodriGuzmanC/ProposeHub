import { getData, postData } from "@/lib/utils/methods";


export const recuperarContrasena = async (correo: string, recuperarRuta: string): Promise<any> => {
    try {
        const data = {
            correo: correo,
            recuperar_ruta: recuperarRuta
        }
        const res = await postData(`recuperar-contrasena/regenerar/`, data);
        return res; // Devuelve true si la operación se realiza correctamente
    } catch (error) {
        throw new Error(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
};


export const cambiarContrasena = async (idUsuario: number, contrasenaNueva: string): Promise<any> => {
    try {
        const data = {
            id_usuario: idUsuario,
            contrasena_nueva: contrasenaNueva
        }
        const res = await postData(`recuperar-contrasena/resetear/`, data);
        return res; // Devuelve true si la operación se realiza correctamente
    } catch (error) {
        throw new Error(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
};


export const validarToken = async (token: string): Promise<any> => {
    try {
        
        const res = await getData(`recuperar-contrasena/${token}`);
        // Verificamos si la respuesta es satisfactoria
        if (res.error) {
            return false;
        }

        return res; // Devuelve true si la operación se realiza correctamente
    } catch (error) {
        throw new Error(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
};
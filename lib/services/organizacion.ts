import { OrganizacionInterface } from "../utils/definitions";

export const obtenerOrganizaciones = async () => {
    try {
        //const response = await apiClient.get('/usuarios');
        //return response.data;
        const OrganizationsDataExample = [
            { id: 1, nombre: "Organización Alpha", telefono: 5551234, correo: "contacto@alpha.com" },
            { id: 2, nombre: "Beta Solutions", telefono: 5555678, correo: "info@beta.com" },
            { id: 3, nombre: "Gamma Corp", telefono: 5559101, correo: "support@gamma.com" },
            { id: 4, nombre: "Delta Group", telefono: 5551213, correo: "sales@delta.com" },
            { id: 5, nombre: "Epsilon Enterprises", telefono: 5551415, correo: "contact@epsilon.com" },
            { id: 6, nombre: "Zeta Innovations", telefono: 5551617, correo: "hello@zeta.com" },
            { id: 7, nombre: "Eta Solutions", telefono: 5551819, correo: "info@eta.com" },
            { id: 8, nombre: "Theta Technologies", telefono: 5552021, correo: "support@theta.com" },
            { id: 9, nombre: "Iota Ventures", telefono: 5552223, correo: "hello@iota.com" },
            { id: 10, nombre: "Kappa Labs", telefono: 5552425, correo: "contact@kappa.com" }
        ]
        
        return OrganizationsDataExample
    } catch (error) {
        throw new Error(`Error al obtener usuarios: ${error}`);
    }
};


export async function eliminarOrganizacion(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
        console.log(`eliminando la organizacion: ${id}`);
        
        // Simulamos un retraso para representar la operación de eliminación
        setTimeout(() => {
            // Aquí puedes incluir la lógica real para eliminar al cliente
            // Por ejemplo, realizar una solicitud fetch a la API para eliminar el usuario

            // Si la operación es exitosa
            //resolve(true);
            
            // Si hay un error, puedes rechazar la promesa
            reject(new Error("Error al eliminar el organizacion"));
        }, 3000);
    });
}

export async function crearOrganizacion(data: Object): Promise<boolean> {
    return new Promise((resolve, reject) => {
        console.log(`creando la organizacion: ${data}`);
        
        // Simulamos un retraso para representar la operación de eliminación
        setTimeout(() => {
            // Aquí puedes incluir la lógica real para eliminar al cliente
            // Por ejemplo, realizar una solicitud fetch a la API para eliminar el usuario

            // Si la operación es exitosa
            //resolve(true);
            
            // Si hay un error, puedes rechazar la promesa
            reject(new Error("Error al crear la organizacion"));
        }, 3000);
    });
}

export async function editarOrganizacion(data: Object): Promise<boolean> {
    return new Promise((resolve, reject) => {
        console.log(`creando la organizacion: ${data}`);
        
        // Simulamos un retraso para representar la operación de eliminación
        setTimeout(() => {
            // Aquí puedes incluir la lógica real para eliminar al cliente
            // Por ejemplo, realizar una solicitud fetch a la API para eliminar el usuario

            // Si la operación es exitosa
            //resolve(true);
            
            // Si hay un error, puedes rechazar la promesa
            reject(new Error("Error al crear la organizacion"));
        }, 3000);
    });
}
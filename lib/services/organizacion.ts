import { Organizacion } from "../utils/definitions";
import { deleteData, getData, postData, updateData } from "../utils/methods";


const OrganizationsDataExample = [
    { id: 1, nombre: "Organización Alpha", telefono: '5551234', correo: "contacto@alpha.com" },
    { id: 2, nombre: "Beta Solutions", telefono: '5555678', correo: "info@beta.com" },
    { id: 3, nombre: "Gamma Corp", telefono: '5559101', correo: "support@gamma.com" },
    { id: 4, nombre: "Delta Group", telefono: '5551213', correo: "sales@delta.com" },
    { id: 5, nombre: "Epsilon Enterprises", telefono: '5551415', correo: "contact@epsilon.com" },
    { id: 6, nombre: "Zeta Innovations", telefono: '5551617', correo: "hello@zeta.com" },
    { id: 7, nombre: "Eta Solutions", telefono: '5551819', correo: "info@eta.com" },
    { id: 8, nombre: "Theta Technologies", telefono: '5552021', correo: "support@theta.com" },
    { id: 9, nombre: "Iota Ventures", telefono: '5552223', correo: "hello@iota.com" },
    { id: 10, nombre: "Kappa Labs", telefono: '5552425', correo: "contact@kappa.com" }
];


// Obtener todas las organizaciones
export const obtenerOrganizaciones = async (): Promise<Organizacion[]> => {
    try {
        const organizaciones = await getData('organizaciones');
        return organizaciones; // Devuelve los datos obtenidos
    } catch (error) {
        throw new Error(`Error al obtener organizaciones: ${error}`);
    }
};

// Obtener una organización por ID
export const obtenerOrganizacion = async (id: number): Promise<Organizacion> => {
    try {
        const organizacion = await getData(`organizaciones/${id}`);
        if (!organizacion) throw new Error(`Organizacion con ID ${id} no encontrado`);

        return organizacion; // Devuelve la organización obtenida
    } catch (error) {
        throw new Error(`Error al obtener la organización: ${error}`);
    }
};

// Crear una nueva organización
export const crearOrganizacion = async (organizacion: Partial<Organizacion>): Promise<Organizacion> => {
    try {
        // Extraemos los datos necesarios del objeto
        const { nombre, telefono, correo } = organizacion;
        // Creamos el cuerpo
        const cuerpo = { nombre, telefono, correo };
        // Realizamos la solicitud
        const organizacionNueva = await postData('organizaciones', cuerpo);
        return organizacionNueva; // Devuelve true si la operación se realiza correctamente
    } catch (error) {
        throw new Error(`Error al crear organización: ${error}`);
    }
};

// Editar una organización
export const editarOrganizacion = async (organizacion: Partial<Organizacion>): Promise<Organizacion> => {
    try {
        // Extraemos los datos necesarios del objeto
        const { id, nombre, telefono, correo } = organizacion;
        // Creamos el cuerpo
        const cuerpo = { nombre, telefono, correo };
        // Realizamos la solicitud
        const organizacionEditada = await updateData(`organizaciones/${id}`, cuerpo);
        return organizacionEditada; // Devuelve true si la operación se realiza correctamente
    } catch (error) {
        throw new Error(`Error al editar organización: ${error}`);
    }
};

// Eliminar una organización
export const eliminarOrganizacion = async (id: number): Promise<Organizacion> => {
    try {
        const organizacionEliminada = await deleteData(`organizaciones/${id}`);
        return organizacionEliminada; // Devuelve true si la operación se realiza correctamente
    } catch (error) {
        throw new Error(`Error al eliminar organización: ${error}`);
    }
};


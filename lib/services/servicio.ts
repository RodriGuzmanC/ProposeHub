import { Servicio } from "../utils/definitions";
import { deleteData, getData, postData, updateData } from "../utils/methods";

const serviciosData = [
    { id: 1, nombre: 'Diseño web'},
    { id: 2, nombre: 'Facebook ADS'},
    { id: 3, nombre: 'Aplicaciones web'},
    { id: 4, nombre: 'Hubspot'}
];

// Obtener todas los servicios
export const obtenerServicios = async (): Promise<Servicio[]> => {
    try {
        const servicios = await getData('servicios')
        return servicios
    } catch (error) {
        throw new Error(`Error al obtener usuarios: ${error}`);
    }
};

// Obtener una organización por ID
export const obtenerServicio = async (id: number): Promise<Servicio> => {
    try {
        const servicio = await getData(`servicios/${id}`)

        if (!servicio) throw new Error(`Rol con ID ${id} no encontrado`);
        return servicio;
    } catch (error) {
        throw new Error(`Error al obtener rol: ${error}`);
    }
};

// Crear una nueva organización
export const crearServicio = async (servicio: Partial<Servicio>): Promise<Servicio> => {
    try {
        // Extraemos los datos necesarios del objeto
        const { nombre, descripcion } = servicio;
        // Creamos el cuerpo
        const cuerpo = { nombre, descripcion };
        // Realizamos la solicitud
        const servicioNuevo = await postData('servicios', cuerpo);
        return servicioNuevo;
    } catch (error) {
        throw new Error(`Error al crear el rol: ${error}`);
    }
};

// Editar una organización
export const editarServicio = async (servicio: Servicio) => {
    try {
        // Extraemos los datos necesarios del objeto
        const { id, nombre, descripcion } = servicio;
        // Creamos el cuerpo
        const cuerpo = { nombre, descripcion };
        // Realizamos la solicitud
        const servicioEditado = await updateData(`servicios/${id}`, cuerpo);
        return servicioEditado;
    } catch (error) {
        throw new Error(`Error al editar rol: ${error}`);
    }
};

// Eliminar una organización
export const eliminarServicio = async (id: number): Promise<Servicio> => {
    try {
        const servicioEliminado = await deleteData(`servicios/${id}`);
        return servicioEliminado;
    } catch (error) {
        throw new Error(`Error al eliminar rol: ${error}`);
    }
};
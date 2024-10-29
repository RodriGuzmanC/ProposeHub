import { deleteData, getData, postData, updateData } from "../utils/methods";

const serviciosData = [
    { id: 1, nombre: 'Diseño web'},
    { id: 2, nombre: 'Facebook ADS'},
    { id: 3, nombre: 'Aplicaciones web'},
    { id: 4, nombre: 'Hubspot'}
];

// Obtener todas las organizaciones
export const obtenerServicios = async () => {
    try {
        return await getData('servicios')
    } catch (error) {
        throw new Error(`Error al obtener usuarios: ${error}`);
    }
};

// Obtener una organización por ID
export const obtenerServicio = async (id: number) => {
    try {
        const cliente = await getData(`servicios/${id}`)

        if (!cliente) throw new Error(`Rol con ID ${id} no encontrado`);
        return cliente;
    } catch (error) {
        throw new Error(`Error al obtener rol: ${error}`);
    }
};

// Crear una nueva organización
export const crearServicio = async (cuerpo: any) => {
    try {
        await postData('servicios', cuerpo);
        return true; // Devuelve true si la operación se realiza correctamente
    } catch (error) {
        throw new Error(`Error al crear el rol: ${error}`);
    }
};

// Editar una organización
export const editarServicio = async (id: number, cuerpo: any) => {
    try {
        await updateData(`servicios/${id}`, cuerpo);
        return true; // Devuelve true si la operación se realiza correctamente
    } catch (error) {
        throw new Error(`Error al editar rol: ${error}`);
    }
};

// Eliminar una organización
export const eliminarServicio = async (id: number): Promise<boolean> => {
    try {
        await deleteData(`servicios/${id}`);
        return true; // Devuelve true si la operación se realiza correctamente
    } catch (error) {
        throw new Error(`Error al eliminar rol: ${error}`);
    }
};
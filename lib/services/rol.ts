import { deleteData, getData, postData, updateData } from "../utils/methods";

const rolesData = [
    { id: 1, nombre: 'editor', descripcion: 'Responsable de la edición de contenido y publicaciones.' },
    { id: 2, nombre: 'administrador', descripcion: 'Encargado de la administración general del sistema con acceso completo.' },
    { id: 3, nombre: 'desarrollador', descripcion: 'Desarrolla y mantiene las funcionalidades técnicas del sistema.' },
    { id: 4, nombre: 'diseñador', descripcion: 'Crea y diseña los elementos visuales y la experiencia de usuario.' }
];

// Obtener todos los clientes
export const obtenerRoles = async () => {
    try {
        //return await getData('roles')
        return rolesData;
    } catch (error) {
        throw new Error(`Error al obtener usuarios: ${error}`);
    }
};

// Obtener un cliente por ID
export const obtenerRol = async (id: number) => {
    try {
        const cliente = await getData(`roles/${id}`)

        if (!cliente) throw new Error(`Rol con ID ${id} no encontrado`);
        return cliente;
    } catch (error) {
        throw new Error(`Error al obtener rol: ${error}`);
    }
};


// Crear una nueva organización
export const crearRol = async (cuerpo: any): Promise<boolean> => {
    try {
        await postData('roles', cuerpo);
        return true; // Devuelve true si la operación se realiza correctamente
    } catch (error) {
        throw new Error(`Error al crear el rol: ${error}`);
    }
};

// Editar una organización
export const editarRol = async (id: number, cuerpo: any): Promise<boolean> => {
    try {
        await updateData(`roles/${id}`, cuerpo);
        return true; // Devuelve true si la operación se realiza correctamente
    } catch (error) {
        throw new Error(`Error al editar rol: ${error}`);
    }
};

// Eliminar una organización
export const eliminarRol = async (id: number): Promise<boolean> => {
    try {
        await deleteData(`roles/${id}`);
        return true; // Devuelve true si la operación se realiza correctamente
    } catch (error) {
        throw new Error(`Error al eliminar rol: ${error}`);
    }
};
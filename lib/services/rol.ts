import { Rol } from "../utils/definitions";
import { deleteData, getData, postData, updateData } from "../utils/methods";

const rolesData = [
    { id: 1, nombre: 'editor', descripcion: 'Responsable de la edición de contenido y publicaciones.' },
    { id: 2, nombre: 'administrador', descripcion: 'Encargado de la administración general del sistema con acceso completo.' },
    { id: 3, nombre: 'desarrollador', descripcion: 'Desarrolla y mantiene las funcionalidades técnicas del sistema.' },
    { id: 4, nombre: 'diseñador', descripcion: 'Crea y diseña los elementos visuales y la experiencia de usuario.' }
];

// Obtener todos los roles
export const obtenerRoles = async (): Promise<Rol[]> => {
    try {
        const roles = await getData('roles');
        return roles;
    } catch (error) {
        throw new Error(`Error al obtener los roles: ${(error as Error).message}`);
    }
};

// Obtener un rol por ID
export const obtenerRol = async (id: number): Promise<Rol> => {
    try {
        const rol = await getData(`roles/${id}`)

        if (!rol) throw new Error(`Rol con ID ${id} no encontrado`);
        return rol;
    } catch (error) {
        throw new Error(`Error al obtener rol: ${error}`);
    }
};


// Crear un nuevo rol
export const crearRol = async (rol: Partial<Rol>): Promise<Rol> => {
    try {
        // Extraemos los datos necesarios del objeto
        const { nombre, descripcion } = rol;
        // Creamos el cuerpo
        const cuerpo = { nombre, descripcion };
        // Realizamos la solicitud
        const rolNuevo = await postData('roles', cuerpo);
        return rolNuevo; // Devuelve true si la operación se realiza correctamente
    } catch (error) {
        throw new Error(`Error al crear el rol: ${error}`);
    }
};

// Editar un rol
export const editarRol = async (rol: Rol): Promise<Rol> => {
    try {
        // Extraemos los datos necesarios del objeto
        const { id, nombre, descripcion } = rol;
        // Creamos el cuerpo para la actualizacion
        const cuerpo = { nombre, descripcion };
        // Realizamos la solicitud de actualización
        const rolEditado = await updateData(`roles/${id}`, cuerpo);

        return rolEditado;
    } catch (error) {
        throw new Error(`Error al editar rol: ${error}`);
    }
};

// Eliminar una organización
export const eliminarRol = async (id: number): Promise<Rol> => {
    try {
        const rolEliminado = await deleteData(`roles/${id}`);
        return rolEliminado; // Devuelve true si la operación se realiza correctamente
    } catch (error) {
        throw new Error(`Error al eliminar rol: ${error}`);
    }
};
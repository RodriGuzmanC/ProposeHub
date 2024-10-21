
const rolesData = [
    { id: 1, nombre: 'editor', descripcion: 'Responsable de la edición de contenido y publicaciones.' },
    { id: 2, nombre: 'administrador', descripcion: 'Encargado de la administración general del sistema con acceso completo.' },
    { id: 3, nombre: 'desarrollador', descripcion: 'Desarrolla y mantiene las funcionalidades técnicas del sistema.' },
    { id: 4, nombre: 'diseñador', descripcion: 'Crea y diseña los elementos visuales y la experiencia de usuario.' }
];

// Obtener todas las organizaciones
export const obtenerRoles = async () => {
    return rolesData;
};

// Obtener una organización por ID
export const obtenerRol = async (id: number) => {
    return rolesData.find(org => org.id === id) || null;
};

// Crear una nueva organización
export const crearRol = async (cuerpo: any) => {
    
    return true;
};

// Editar una organización
export const editarRol = async (id: number, cuerpo: any) => {
    try {
        return true
    } catch (error) {
        return false
    }
};

// Eliminar una organización
export const eliminarRol = async (id: number): Promise<boolean> => {
    const index = rolesData.findIndex(org => org.id === id);
    if (index !== -1) {
        rolesData.splice(index, 1);
        return true;
    }
    return false;
};
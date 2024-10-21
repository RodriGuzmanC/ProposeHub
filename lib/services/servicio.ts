
const serviciosData = [
    { id: 1, nombre: 'Diseño web'},
    { id: 2, nombre: 'Facebook ADS'},
    { id: 3, nombre: 'Aplicaciones web'},
    { id: 4, nombre: 'Hubspot'}
];

// Obtener todas las organizaciones
export const obtenerServicios = async () => {
    return serviciosData;
};

// Obtener una organización por ID
export const obtenerServicio = async (id: number) => {
    return serviciosData.find(org => org.id === id) || null;
};

// Crear una nueva organización
export const crearServicio = async (cuerpo: any) => {
    
    return true;
};

// Editar una organización
export const editarServicio = async (id: number, cuerpo: any) => {
    try {
        return true
    } catch (error) {
        return false
    }
};

// Eliminar una organización
export const eliminarServicio = async (id: number): Promise<boolean> => {
    const index = serviciosData.findIndex(org => org.id === id);
    if (index !== -1) {
        serviciosData.splice(index, 1);
        return true;
    }
    return false;
};
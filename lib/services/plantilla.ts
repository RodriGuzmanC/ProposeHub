
const plantillas = [
    { id: 1, nombre: 'Plantilla 1', contenido: 'Descripción corta de la plantilla' },
    { id: 2, nombre: 'Plantilla 2', contenido: 'Descripción corta de la plantilla' },
    { id: 3, nombre: 'Plantilla 3', contenido: 'Descripción corta de la plantilla' },
    { id: 4, nombre: 'Plantilla 4', contenido: 'Descripción corta de la plantilla' },
  ];

// Obtener todas las organizaciones
export const obtenerPlantillas = async () => {
    return plantillas;
};

// Obtener una organización por ID
export const obtenerPlantilla = async (id: number) => {
    return plantillas.find(org => org.id === id) || null;
};

// Crear una nueva organización
export const crearPlantilla = async (cuerpo: any) => {
    
    return true;
};

// Editar una organización
export const editarPlantilla = async (id: number, cuerpo: any) => {
    try {
        return true
    } catch (error) {
        return false
    }
};

// Eliminar una organización
export const eliminarPlantilla = async (id: number): Promise<boolean> => {
    const index = plantillas.findIndex(org => org.id === id);
    if (index !== -1) {
        plantillas.splice(index, 1);
        return true;
    }
    return false;
};
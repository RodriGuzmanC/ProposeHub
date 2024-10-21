
const propuestas = [
    { id: 1, titulo: 'Propuesta 1', monto: 1500, fecha: '15 octubre 2024', estado: 'aceptado' },
    { id: 2, titulo: 'Propuesta 2', monto: 2100, fecha: '10 octubre 2024', estado: 'aceptado' },
    { id: 3, titulo: 'Propuesta 3', monto: 1200, fecha: '08 octubre 2024', estado: 'aceptado' },
    { id: 4, titulo: 'Propuesta 4', monto: 2500, fecha: '31 octubre 2024', estado: 'aceptado' },
    { id: 5, titulo: 'Propuesta 5', monto: 2500, fecha: '31 octubre 2024', estado: 'aceptado' },
    { id: 6, titulo: 'Propuesta 6', monto: 2500, fecha: '31 octubre 2024', estado: 'abierto' },
    { id: 7, titulo: 'Propuesta 7', monto: 2500, fecha: '31 octubre 2024', estado: 'abierto' },
    { id: 8, titulo: 'Propuesta 8', monto: 2500, fecha: '31 octubre 2024', estado: 'en-progreso' },
    { id: 9, titulo: 'Propuesta 9', monto: 2500, fecha: '31 octubre 2024', estado: 'aceptado' },
    { id: 10, titulo: 'Propuesta 10', monto: 2500, fecha: '31 octubre 2024', estado: 'abierto' },
    { id: 11, titulo: 'Propuesta 11', monto: 2500, fecha: '31 octubre 2024', estado: 'abierto' },
    { id: 12, titulo: 'Propuesta 12', monto: 2500, fecha: '31 octubre 2024', estado: 'en-progreso' },
    { id: 13, titulo: 'Propuesta 13', monto: 2500, fecha: '31 octubre 2024', estado: 'declinado' },
    { id: 14, titulo: 'Propuesta 14', monto: 2500, fecha: '31 octubre 2024', estado: 'declinado' },
    { id: 15, titulo: 'Propuesta 15', monto: 2500, fecha: '31 octubre 2024', estado: 'declinado' },
]

// Obtener todas las organizaciones
export const obtenerPropuestas = async () => {
    return propuestas;
};

// Obtener una organización por ID
export const obtenerPropuesta = async (id: number) => {
    return propuestas.find(org => org.id === id) || null;
};

// Crear una nueva organización
export const crearPropuesta = async (cuerpo: any) => {
    
    return true;
};

// Editar una organización
export const editarPropuesta = async (id: number, cuerpo: any) => {
    try {
        return true
    } catch (error) {
        return false
    }
};

// Eliminar una organización
export const eliminarPropuesta = async (id: number): Promise<boolean> => {
    const index = propuestas.findIndex(org => org.id === id);
    if (index !== -1) {
        propuestas.splice(index, 1);
        return true;
    }
    return false;
};
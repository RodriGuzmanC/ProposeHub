

export const obtenerPropuestas = async () => {
    try {
        //const response = await apiClient.get('/usuarios');
        //return response.data;
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
        return propuestas
    } catch (error) {
        throw new Error(`Error al obtener usuarios: ${error}`);
    }
};
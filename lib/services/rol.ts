
export const obtenerClientes = async () => {
    try {
        //const response = await apiClient.get('/usuarios');
        //return response.data;
        const rolesData = [
            { id: 1, nombre: 'editor', descripcion: 'Responsable de la edición de contenido y publicaciones.' },
            { id: 2, nombre: 'administrador', descripcion: 'Encargado de la administración general del sistema con acceso completo.' },
            { id: 3, nombre: 'desarrollador', descripcion: 'Desarrolla y mantiene las funcionalidades técnicas del sistema.' },
            { id: 4, nombre: 'diseñador', descripcion: 'Crea y diseña los elementos visuales y la experiencia de usuario.' }
        ];
        
        return rolesData
    } catch (error) {
        throw new Error(`Error al obtener usuarios: ${error}`);
    }
};
const ContactosDataExample = [
    { id: 1, correo: 'juan@gmail.com', nombre: 'Juan Pérez', telefono: 5551234, organizacion: 1 },
    { id: 2, correo: 'mari@gmail.com', nombre: 'María López', telefono: 5555678, organizacion: 2 },
    { id: 3, correo: 'carlos@gmail.com', nombre: 'Carlos García', telefono: 5559012, organizacion: 3 },
    { id: 4, correo: 'ana@gmail.com', nombre: 'Ana González', telefono: 5553456, organizacion: 4 },
    { id: 5, correo: 'pedro@gmail.com', nombre: 'Pedro Martínez', telefono: 5557890, organizacion: 5 },
    { id: 6, correo: 'sofia@gmail.com', nombre: 'Sofía Fernández', telefono: 5551122, organizacion: 6 }
];

// Obtener todos los clientes
export const obtenerClientes = async () => {
    try {
        return ContactosDataExample;
    } catch (error) {
        throw new Error(`Error al obtener usuarios: ${error}`);
    }
};

// Obtener un cliente por ID
export const obtenerCliente = async (id: number) => {
    try {
        const cliente = ContactosDataExample.find(cliente => cliente.id === id);

        if (!cliente) throw new Error(`Cliente con ID ${id} no encontrado`);
        return cliente;
    } catch (error) {
        throw new Error(`Error al obtener cliente: ${error}`);
    }
};

// Editar un cliente
export const editarCliente = async (id: number, cuerpo: any) => {
    // Aquí solo se devuelve un cliente del ejemplo
    //return ContactosDataExample[id - 1]; // Devuelve el primer cliente como ejemplo
    
    return false
};

// Crear un nuevo cliente
export const crearCliente = async (cuerpo: any) => {
    // Simula la creación del cliente, puedes ajustar esto según tus necesidades
    ContactosDataExample.push({ id: ContactosDataExample.length + 1, ...cuerpo });
    return true; // Devuelve true para indicar éxito
};

// Eliminar un cliente (método existente)
export async function eliminarCliente(id: number): Promise<boolean> {
    const index = ContactosDataExample.findIndex(cliente => cliente.id === id);
    if (index === -1) {
        throw new Error(`Cliente con ID ${id} no encontrado`);
    }
    ContactosDataExample.splice(index, 1);
    return true; // Devuelve true para indicar éxito
}



/*
export const obtenerClientes = async () => {
    try {
        //const response = await apiClient.get('/usuarios');
        //return response.data;
        const ContactosDataExample = [
            { id: 1, correo: 'juan@gmail.com', nombre: 'Juan Pérez', telefono: 5551234, organizacion: 1, estado: 'activo' },
            { id: 2, correo: 'mari@gmail.com', nombre: 'María López', telefono: 5555678, organizacion: 2, estado: 'activo' },
            { id: 3, correo: 'carlos@gmail.com', nombre: 'Carlos García', telefono: 5559012, organizacion: 3, estado: 'activo' },
            { id: 4, correo: 'ana@gmail.com', nombre: 'Ana González', telefono: 5553456, organizacion: 4, estado: 'inactivo' },
            { id: 5, correo: 'pedro@gmail.com', nombre: 'Pedro Martínez', telefono: 5557890, organizacion: 5, estado: 'activo' },
            { id: 6, correo: 'sofia@gmail.com', nombre: 'Sofía Fernández', telefono: 5551122, organizacion: 6, estado: 'inactivo' }
        ]
        
        return ContactosDataExample
    } catch (error) {
        throw new Error(`Error al obtener usuarios: ${error}`);
    }
};*/

/*
export async function eliminarCliente(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
        console.log(`eliminando al usuario: ${id}`);
        
        setTimeout(() => {
            // Aquí puedes incluir la lógica real para eliminar al cliente
            // Por ejemplo, realizar una solicitud fetch a la API para eliminar el usuario

            // Si la operación es exitosa
            //resolve(true);
            
            // Si hay un error, puedes rechazar la promesa
            reject(new Error("Error al eliminar el usuario"));
        }, 3000);
    });
}

*/




/*export async function eliminarCliente(id: number): Promise<boolean> {
    try {
        const response = await fetch(`https://tu-api.com/usuarios/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // Aquí puedes agregar un token de autorización si es necesario
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al eliminar el usuario');
        }

        return true;
    } catch (error) {
        console.error('Error al eliminar el cliente:', error);
        throw error;
    }
}*/

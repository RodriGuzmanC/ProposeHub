import { deleteData, getData, postData, updateData } from "../utils/methods";

const ContactosDataExample = [
    { id: 1, correo: 'juan@gmail.com', nombre: 'Juan Pérez', telefono: '5551234', organizacion: 1, nombreOrganizacion: 'Organización A' },
    { id: 2, correo: 'mari@gmail.com', nombre: 'María López', telefono: '5555678', organizacion: 2, nombreOrganizacion: 'Organización B' },
    { id: 3, correo: 'carlos@gmail.com', nombre: 'Carlos García', telefono: '5559012', organizacion: 3, nombreOrganizacion: 'Organización C' },
    { id: 4, correo: 'ana@gmail.com', nombre: 'Ana González', telefono: '5553456', organizacion: 4, nombreOrganizacion: 'Organización D' },
    { id: 5, correo: 'pedro@gmail.com', nombre: 'Pedro Martínez', telefono: '5557890', organizacion: 5, nombreOrganizacion: 'Organización E' },
    { id: 6, correo: 'sofia@gmail.com', nombre: 'Sofía Fernández', telefono: '5551122', organizacion: 6, nombreOrganizacion: 'Organización F' }
];

// Obtener todos los clientes
export const obtenerClientes = async () => {
    try {
        return await getData('clientes')
        //return ContactosDataExample;
    } catch (error) {
        throw new Error(`Error al obtener usuarios: ${error}`);
    }
};

// Obtener un cliente por ID
export const obtenerCliente = async (id: number) => {
    try {
        const cliente = await getData(`clientes/${id}`)

        if (!cliente) throw new Error(`Cliente con ID ${id} no encontrado`);
        return cliente;
    } catch (error) {
        throw new Error(`Error al obtener cliente: ${error}`);
    }
};


// Crear una nueva organización
export const crearCliente = async (cuerpo: any): Promise<boolean> => {
    try {
        const data = {
            nombre: cuerpo.nombre,
            correo: cuerpo.correo,
            telefono: cuerpo.telefono,
            id_organizacion: cuerpo.organization
        }
        await postData('clientes', data);
        return true; // Devuelve true si la operación se realiza correctamente
    } catch (error) {
        throw new Error(`Error al crear el cliente: ${error}`);
    }
};

// Editar una organización
export const editarCliente = async (id: number, cuerpo: any): Promise<boolean> => {
    try {
        const data = {
            nombre: cuerpo.nombre,
            correo: cuerpo.correo,
            telefono: cuerpo.telefono,
            id_organizacion: cuerpo.organization
        }
        await updateData(`clientes/${id}`, data);
        return true; // Devuelve true si la operación se realiza correctamente
    } catch (error) {
        throw new Error(`Error al editar cliente: ${error}`);
    }
};


export const eliminarCliente = async (id: number): Promise<boolean> => {
    try {
        await deleteData(`clientes/${id}`);
        return true; // Devuelve true si la operación se realiza correctamente
    } catch (error) {
        throw new Error(`Error al eliminar cliente: ${error}`);
    }
};

export const validarCredencialesCliente = async (correo: string, clave: string): Promise<boolean> => {
    try {
        //await deleteData(`clientes/${id}`);
        return true; // Devuelve true si la operación se realiza correctamente
    } catch (error) {
        throw new Error(`Error al eliminar cliente: ${error}`);
    }
};
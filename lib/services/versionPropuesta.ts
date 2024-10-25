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
export const obtenerVersionesPropuesta = async () => {
    try {
        return await getData('versiones-propuestas')
        //return ContactosDataExample;
    } catch (error) {
        throw new Error(`Error al obtener las versiones de la propuesta: ${error instanceof Error ? error.message : String(error)}`);
    }
};

// Obtener un cliente por ID
export const obtenerVersionPropuesta = async (id: number) => {
    try {
        const cliente = await getData(`versiones-propuestas/${id}`)

        if (!cliente) throw new Error(`Version con ID ${id} no encontrado`);
        return cliente;
    } catch (error) {
        throw new Error(`Error al obtener la version de la propuesta: ${error instanceof Error ? error.message : String(error)}`);
    }
};


// Crear una nueva organización
export const crearVersionPropuesta = async (cuerpo: any): Promise<boolean> => {
    try {
        const data = {
            id_propuesta: cuerpo.id,
            contenido: cuerpo.jsongrapes
        }
        await postData('versiones-propuestas', data);
        return true; // Devuelve true si la operación se realiza correctamente
    } catch (error) {
        throw new Error(`Error al crear la version de la propuesta: ${error instanceof Error ? error.message : String(error)}`);
    }
};

// Editar una organización
export const editarVersionPropuesta = async (id: number, cuerpo: any): Promise<boolean> => {
    try {
        const data = {
            contenido: cuerpo.contenido
        }
        await updateData(`versiones-propuestas/${id}`, data);
        return true; // Devuelve true si la operación se realiza correctamente
    } catch (error) {
        throw new Error(`Error al editar la version de la propuesta: ${error instanceof Error ? error.message : String(error)}`);
    }
};


/*export const eliminarCliente = async (id: number): Promise<boolean> => {
    try {
        await deleteData(`clientes/${id}`);
        return true; // Devuelve true si la operación se realiza correctamente
    } catch (error) {
        throw new Error(`Error al eliminar cliente: ${error instanceof Error ? error.message : String(error)}`);
    }
};*/


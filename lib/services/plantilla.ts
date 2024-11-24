import { Plantilla } from "../utils/definitions";
import { deleteData, getData, postData, updateData } from "../utils/methods";

const plantillas = [
    { id: 1, nombre: 'Plantilla 1', contenido: 'Descripción corta de la plantilla' },
    { id: 2, nombre: 'Plantilla 2', contenido: 'Descripción corta de la plantilla' },
    { id: 3, nombre: 'Plantilla 3', contenido: 'Descripción corta de la plantilla' },
    { id: 4, nombre: 'Plantilla 4', contenido: 'Descripción corta de la plantilla' },
];

// Obtener todas las organizaciones
export const obtenerPlantillas = async (): Promise<Plantilla[]> => {
    try {
        const plantillas = await getData('plantillas');
        return plantillas; // Devuelve los datos obtenidos
    } catch (error) {
        throw new Error(`Error al obtener plantillas: ${error instanceof Error ? error.message : String(error)}`);
    }
};

// Obtener una organización por ID
export const obtenerPlantilla = async (id: number): Promise<Plantilla> => {
    try {
        const plantilla = await getData(`plantillas/${id}`);
        return plantilla; // Devuelve la organización obtenida
    } catch (error) {
        throw new Error(`Error al obtener la organización: ${error instanceof Error ? error.message : String(error)}`);
    }
};

// Crear una nueva organización
export const crearPlantilla = async (plantilla: Partial<Plantilla>): Promise<Plantilla> => {
    try {
        /*const data = {
            nombre: cuerpo.nombre,
            descripcion: cuerpo.descripcion
        }*/
        // Extraemos los datos necesarios del objeto
        const { nombre, descripcion, is_active } = plantilla;
        // Creamos el cuerpo
        const cuerpo = { nombre, descripcion, is_active };
        // Realizamos la solicitud
        const plantillaCreada = await postData('plantillas/', cuerpo);
        return plantillaCreada
        //return true; // Devuelve true si la operación se realiza correctamente
    } catch (error) {
        throw new Error(`Error al crear plantilla: ${error instanceof Error ? error.message : String(error)}`);

    }
};

// Editar una organización
export const editarPlantilla = async (plantilla: Plantilla): Promise<Plantilla> => {
    try {
        /*const data = {
            nombre: cuerpo.nombre ?? null,
            contenido: cuerpo.contenido ?? null
        }*/
        // Extraemos los datos necesarios del objeto
        const { id, nombre, descripcion, contenido, is_active } = plantilla;
        // Creamos el cuerpo
        const cuerpo = { nombre, descripcion, contenido, is_active };
        // Realizamos la solicitud
        const plantillaEditada = await updateData(`plantillas/${id}`, cuerpo);
        return plantillaEditada
        //return true; // Devuelve true si la operación se realiza correctamente
    } catch (error) {
        throw new Error(`Error al actualizar la plantilla: ${error instanceof Error ? error.message : String(error)}`);

    }
};


export const editarContenidoPlantilla = async (plantilla: Partial<Plantilla>): Promise<Boolean> => {
    try {
        /*const data = {
            contenido: cuerpo.contenido
        }*/
       // Extraemos los datos necesarios del objeto
       const { id, nombre, descripcion, contenido, is_active } = plantilla;
       // Creamos el cuerpo
       const cuerpo = { nombre, descripcion, contenido, is_active };
       // Realizamos la solicitud
        const estadoOperacion = await updateData(`plantillas/${id}`, cuerpo);
        return estadoOperacion 
        //return true; // Devuelve true si la operación se realiza correctamente
    } catch (error) {
        throw new Error(`Error al actualizar la plantilla: ${error instanceof Error ? error.message : String(error)}`);

    }
};

// Eliminar una organización
export const eliminarPlantilla = async (id: number): Promise<Plantilla> => {
    try {
        const data = await deleteData(`plantillas/${id}`);
        return data; // Devuelve la organización obtenida
    } catch (error: any) {
        throw new Error(`Error al guardar plantilla: ${error instanceof Error ? error.message : String(error)}`);
    }
};


export const guardarPlantilla = async (id: number, dataGrapesJson: any) => {
    try {
        const data = await updateData(`plantillas/contenido/${id}`, dataGrapesJson);
        return data; // Devuelve la organización obtenida
    } catch (error: any) {
        throw new Error(`Error al guardar plantilla: ${error instanceof Error ? error.message : String(error)}`);
    }
};



export const obtenerContenidoPlantilla = async (id: number) => {
    try {
        const contenidoJson = await getData(`plantillas/contenido/${id}`);
        return contenidoJson.data; // Devuelve la organización obtenida
    } catch (error) {
        throw new Error(`Error al guardar la plantilla: ${error instanceof Error ? error.message : String(error)}`);
    }
};
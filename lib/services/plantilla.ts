import { getData, postData, updateData } from "../utils/methods";

const plantillas = [
    { id: 1, nombre: 'Plantilla 1', contenido: 'Descripción corta de la plantilla' },
    { id: 2, nombre: 'Plantilla 2', contenido: 'Descripción corta de la plantilla' },
    { id: 3, nombre: 'Plantilla 3', contenido: 'Descripción corta de la plantilla' },
    { id: 4, nombre: 'Plantilla 4', contenido: 'Descripción corta de la plantilla' },
  ];

// Obtener todas las organizaciones
export const obtenerPlantillas = async () => {
    try {
        const data = await getData('plantillas');
        return data; // Devuelve los datos obtenidos
    } catch (error) {
        throw new Error(`Error al obtener plantillas: ${error instanceof Error ? error.message : String(error)}`);
    }
};

// Obtener una organización por ID
export const obtenerPlantilla = async (id: number) => {
    try {
        const data = await getData(`plantillas/${id}`);
        return data; // Devuelve la organización obtenida
    } catch (error) {
        throw new Error(`Error al obtener la organización: ${error instanceof Error ? error.message : String(error)}`);
    }
};

// Crear una nueva organización
export const crearPlantilla = async (cuerpo: any) => {
    try {
        const data = {
            nombre: cuerpo.nombre,
            descripcion: cuerpo.descripcion
        }
        return await postData('plantillas/', data);
        //return true; // Devuelve true si la operación se realiza correctamente
    } catch (error) {
        throw new Error(`Error al crear plantilla: ${error instanceof Error ? error.message : String(error)}`);

    }
};

// Editar una organización
export const editarPlantilla = async (id: number, cuerpo: any) => {
    try {
        const data = {
            nombre: cuerpo.nombre ?? null,
            contenido: cuerpo.contenido ?? null
        }
        return await updateData(`plantillas/${id}`, data);
        //return true; // Devuelve true si la operación se realiza correctamente
    } catch (error) {
        throw new Error(`Error al actualizar la plantilla: ${error instanceof Error ? error.message : String(error)}`);

    }
};


export const editarContenidoPlantilla = async (id: number, cuerpo: any) => {
    try {
        const data = {
            contenido: cuerpo.contenido
        }
        return await updateData(`plantillas/${id}`, data);
        //return true; // Devuelve true si la operación se realiza correctamente
    } catch (error) {
        throw new Error(`Error al actualizar la plantilla: ${error instanceof Error ? error.message : String(error)}`);

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


export const guardarPlantilla = async (id:number, dataGrapesJson: any) => {
    try {
        const data = await updateData(`plantillas/contenido/${id}`, dataGrapesJson);
        return data; // Devuelve la organización obtenida
    } catch (error : any) {
        throw new Error(`Error al guardar plantilla: ${error instanceof Error ? error.message : String(error)}`);
    }
};



export const obtenerContenidoPlantilla = async (id:number) => {
    try {
        const contenidoJson = await getData(`plantillas/contenido/${id}`);
        return contenidoJson.data; // Devuelve la organización obtenida
    } catch (error) {
        throw new Error(`Error al guardar la plantilla: ${error instanceof Error ? error.message : String(error)}`);
    }
};
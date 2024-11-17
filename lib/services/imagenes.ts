import { getData, postData } from "../utils/methods";

const urlStorage = process.env.NEXT_PUBLIC_STORAGE_URL;

export const obtenerAssets = async () => {
    try {
        // Obtienes los datos de los clientes
        const imagenes = await getData('imagenes')
        
        
        return imagenes
    } catch (error) {
        throw new Error(`Error al obtener imagenes: ${error instanceof Error ? error.message : String(error)}`);
    }
};


export const cargarAssetsExtras = async (nextPageUrl: string) => {
    try {
        // Obtienes los datos de los clientes
        const response = await fetch(nextPageUrl);
        const imagenes = await response.json();
        
        const dataNormalizada = Array.isArray(imagenes.data)
            ? imagenes.data // Ya es iterable, lo dejas como está
            : Object.entries(imagenes.data).map(([key, value]: [string, any]) => ({
                id: key, // Usamos la clave como ID
                ...value, // Los valores originales del objeto
            }));
            return {
                ...imagenes,
                data: dataNormalizada, // Sobrescribimos 'data' con el formato normalizado
            };
    } catch (error) {
        throw new Error(`Error al obtener imagenes: ${error instanceof Error ? error.message : String(error)}`);
    }
};

export const buscarAssets = async (nombre: string) => {
    try {
        // Obtienes los datos de los clientes
        const imagenes = await getData(`imagenes/buscar/${nombre}`)
        return imagenes
    } catch (error) {
        throw new Error(`Error al obtener imagenes: ${error instanceof Error ? error.message : String(error)}`);
    }
};


export const subirAsset = async (files: FileList | File[]) => {
    try {
        const formData = new FormData();

        // Añadir los archivos al FormData
        for (let i = 0; i < files.length; i++) {
            formData.append('image', files[i]); // Nombre del archivo
        }

        // Hacer la petición al servidor
        const response = await fetch('http://127.0.0.1:8000/api/imagenes', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Error al subir la imagen: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        console.log('Imágenes subidas exitosamente:', data);
    } catch (error) {
        throw new Error(`Error al subir las imágenes: ${error instanceof Error ? error.message : String(error)}`);
    }
};

import { getData, postData } from "../utils/methods";

const urlStorage = process.env.NEXT_PUBLIC_STORAGE_URL;

export const obtenerAssets = async () => {
    try {
        // Obtienes los datos de los clientes
        const imagenes = await getData('imagenes')
        /*const assets = imagenes.map((img: any) => ({
            src: `${urlStorage}${img.url}`,
            name: `Imagen ${img.id}`,
            type: 'image',
        }));*/
        // Añadir el prefijo a cada URL de las imágenes en data
        const assets = imagenes.data.map((img: any) => ({
            ...img, // Mantener los otros datos de cada imagen
            url: `${urlStorage}${img.url}`, // Modificar la URL añadiendo el prefijo
        }));
        
        return {
            ...imagenes, // Regresar todo el objeto original
            data: assets, // Sobrescribir data con las URLs actualizadas
        };
    } catch (error) {
        throw new Error(`Error al obtener imagenes: ${error instanceof Error ? error.message : String(error)}`);
    }
};


export const cargarAssetsExtras = async (nextPageUrl: string) => {
    try {
        // Obtienes los datos de los clientes
        const response = await fetch(nextPageUrl);
        const imagenes = await response.json();
        
        // Añadir el prefijo a cada URL de las imágenes en data
        const assets = imagenes.data.map((img: any) => ({
            ...img, // Mantener los otros datos de cada imagen
            url: `${urlStorage}${img.url}`, // Modificar la URL añadiendo el prefijo
        }));
        
        return {
            ...imagenes, // Regresar todo el objeto original
            data: assets, // Sobrescribir data con las URLs actualizadas
        };
    } catch (error) {
        throw new Error(`Error al obtener imagenes: ${error instanceof Error ? error.message : String(error)}`);
    }
};

export const buscarAssets = async (nombre: string) => {
    try {
        // Obtienes los datos de los clientes
        const imagenes = await postData('imagenes/buscar', {nombre: nombre})
        const assets = imagenes.map((img: any) => ({
            src: `${urlStorage}${img.path}`,
            name: `Imagen ${img.id}`,
            type: 'image',
        }));
        return assets;
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

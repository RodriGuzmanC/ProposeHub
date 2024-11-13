
//const urlApi = 'http://127.0.0.1:8000/api/'
const urlApi = process.env.NEXT_PUBLIC_API_URL;

export async function postData(tipo: string, data: object) {

    try {
        const response = await fetch(`${urlApi}${tipo}`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.error) {
            // Manejo de error en la respuesta exitosa
            console.error("Error en la respuesta:", result.mensaje);

            throw new Error(result.mensaje) // o manejar el error de otra forma
        }
        return result; // Respuesta exitosa sin errores

        //return response.json();
    } catch (error) {
        throw new Error((<Error>error).message);
    }
}


export async function getData(tipo: string) {
    try {
        const response = await fetch(`${urlApi}${tipo}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        if (result.error) {
            // Manejo de error en la respuesta exitosa
            console.error("Error en la respuesta:", result.mensaje);

            throw new Error(result.mensaje) // o manejar el error de otra forma
        }
        return result; // Respuesta exitosa sin errores

        // Devuelve los datos en formato JSON
        //return response.json();
    } catch (error) {
        throw new Error((<Error>error).message);
    }
}



export async function updateData(tipo: string, data: object) {
    try {
        const response = await fetch(`${urlApi}${tipo}`, {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Convertir el objeto a JSON
        });

        const result = await response.json();

        if (result.error) {
            // Manejo de error en la respuesta exitosa
            console.error("Error en la respuesta:", result.mensaje);

            throw new Error(result.mensaje) // o manejar el error de otra forma
        }
        return result; // Respuesta exitosa sin errores

        //return response.json(); // Devuelve la respuesta en formato JSON
    } catch (error) {
        throw new Error((<Error>error).message);
    }
}



export async function deleteData(tipo: string) {
    try {
        const response = await fetch(`${urlApi}${tipo}`, {
            method: 'DELETE',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();

        if (result.error) {
            // Manejo de error en la respuesta exitosa
            console.error("Error en la respuesta:", result.mensaje);

            throw new Error(result.mensaje) // o manejar el error de otra forma
        }
        return result; // Respuesta exitosa sin errores

        //return response.json(); // Devuelve la respuesta en formato JSON

    } catch (error) {
        throw new Error((<Error>error).message);
    }
}


export async function downloadRequest(endpoint: string, data: object){
    try {
        const res = await fetch(`${urlApi}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error('Error al descargar el archivo');

        // Crear un Blob con el contenido de la respuesta
        const blob = await res.blob();
        
        // Crear un enlace de descarga
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'archivo.pdf';
        document.body.appendChild(link);
        link.click();
        
        // Limpiar
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error al descargar el PDF:', error);
    }
}

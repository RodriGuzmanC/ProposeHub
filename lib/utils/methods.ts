
const urlApi = 'http://127.0.0.1:8000/api/'
//const urlApi = process.env.API_URL

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



export async function postData(tipo: string, data: object) {
    const response = await fetch(`http://127.0.0.1:8000/api/${tipo}`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return response.json(); // parses JSON response into native JavaScript objects
}


export async function getData(tipo: string) {
    const response = await fetch(`http://127.0.0.1:8000/api/${tipo}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Verifica si la respuesta fue exitosa
    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    // Devuelve los datos en formato JSON
    return response.json();
}



export async function updateData(tipo: string, data: object) {
    const response = await fetch(`http://127.0.0.1:8000/api/${tipo}`, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Convertir el objeto a JSON
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json(); // Devuelve la respuesta en formato JSON
}



export async function deleteData(tipo: string) {
    const response = await fetch(`http://127.0.0.1:8000/api/${tipo}`, {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    // Para el caso 204, no se necesita convertir a JSON
    if (response.status === 204) {
        return; // Puedes retornar undefined implícitamente
    }

    return response.json(); // Devuelve la respuesta en formato JSON
}


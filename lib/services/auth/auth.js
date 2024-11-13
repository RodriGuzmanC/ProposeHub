
/**
 *  AUTENTICACION PARA USUARIOS
 */


// Guardar la sesión 
export const setSession = (userInfo) => {
    document.cookie = `userInfo=${JSON.stringify(userInfo)}; path=/;`;
};

// Obtener ID de usuario desde la cookie
export const getUserIdFromSession = () => {
    const match = document.cookie.match(/userInfo=([^;]+)/);
    if (match) {
        const userInfo = JSON.parse(decodeURIComponent(match[1]));
        return userInfo.id; // Asumiendo que `userInfo` contiene un campo `id`
    }
    return null;
};

// Cerrar sesión
export const logoutSession = () => {
    document.cookie = 'userInfo=; Max-Age=0; path=/;';
    window.location.href = '/contactos/personas';
};


export const getUserFromSession = () => {
    const userInfoCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('userInfo='));

    if (userInfoCookie) {
        try {
            return JSON.parse(decodeURIComponent(userInfoCookie.split('=')[1]));
        } catch (error) {
            console.error("Error al parsear la información de usuario:", error);
        }
    }
    return null; // Retorna null si no hay cookie o si falla el parseo
};

/**
 * 
 *  AUTENTICACION PARA CLIENTES
 * 
 */

// Guardar la sesión 
export const setClientSession = (clientInfo) => {
    document.cookie = `clientInfo=${JSON.stringify(clientInfo)}; path=/;`;
};

// Obtener ID de usuario desde la cookie
export const getClientIdFromSession = () => {
    const match = document.cookie.match(/clientInfo=([^;]+)/);
    if (match) {
        const clientInfo = JSON.parse(decodeURIComponent(match[1]));
        return clientInfo.id; // Asumiendo que `userInfo` contiene un campo `id`
    }
    return null;
};

// Cerrar sesión
export const logoutClientSession = () => {
    document.cookie = 'clientInfo=; Max-Age=0; path=/;';
    window.location.href = '/vista/propuesta/login';
};


export const getClientFromSession = () => {
    const clientInfoCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('clientInfo='));

    if (clientInfoCookie) {
        try {
            return JSON.parse(decodeURIComponent(clientInfoCookie.split('=')[1]));
        } catch (error) {
            console.error("Error al parsear la información de cliente:", error);
        }
    }
    return null; // Retorna null si no hay cookie o si falla el parseo
};




export const getRedirection = () => {
    // Buscar la cookie 'redirect_to' entre todas las cookies
    const redirectionCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('redirect_to='));

    if (redirectionCookie) {
        try {
            // Extraer el valor de la cookie
            const redirectionUrl = decodeURIComponent(redirectionCookie.split('=')[1]);
            return redirectionUrl;
        } catch (error) {
            console.error("Error al decodificar la URL de redirección:", error);
        }
    }
    // Retorna null si no existe la cookie o si ocurre un error
    return '/';
};

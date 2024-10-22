import { OrganizacionInterface } from "../utils/definitions";


const OrganizationsDataExample = [
    { id: 1, nombre: "Organización Alpha", telefono: '5551234', correo: "contacto@alpha.com" },
    { id: 2, nombre: "Beta Solutions", telefono: '5555678', correo: "info@beta.com" },
    { id: 3, nombre: "Gamma Corp", telefono: '5559101', correo: "support@gamma.com" },
    { id: 4, nombre: "Delta Group", telefono: '5551213', correo: "sales@delta.com" },
    { id: 5, nombre: "Epsilon Enterprises", telefono: '5551415', correo: "contact@epsilon.com" },
    { id: 6, nombre: "Zeta Innovations", telefono: '5551617', correo: "hello@zeta.com" },
    { id: 7, nombre: "Eta Solutions", telefono: '5551819', correo: "info@eta.com" },
    { id: 8, nombre: "Theta Technologies", telefono: '5552021', correo: "support@theta.com" },
    { id: 9, nombre: "Iota Ventures", telefono: '5552223', correo: "hello@iota.com" },
    { id: 10, nombre: "Kappa Labs", telefono: '5552425', correo: "contact@kappa.com" }
];

// Obtener todas las organizaciones
export const obtenerOrganizaciones = async () => {
    return OrganizationsDataExample;
};

// Obtener una organización por ID
export const obtenerOrganizacion = async (id: number) => {
    return OrganizationsDataExample.find(org => org.id === id) || null;
};

// Crear una nueva organización
export const crearOrganizacion = async (cuerpo: any) => {
    
    return true;
};

// Editar una organización
export const editarOrganizacion = async (id: number, cuerpo: any) => {
    try {
        return true
    } catch (error) {
        return false
    }
};

// Eliminar una organización
export const eliminarOrganizacion = async (id: number): Promise<boolean> => {
    const index = OrganizationsDataExample.findIndex(org => org.id === id);
    if (index !== -1) {
        OrganizationsDataExample.splice(index, 1);
        return true;
    }
    return false;
};

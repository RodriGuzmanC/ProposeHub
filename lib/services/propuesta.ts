import { postData } from "../utils/methods";
import { decodificadorEstructuraGrapesJS, reemplazarEstructuraGrapesJS } from "../utils/placeholderExtract";
import { obtenerContenidoPlantilla, obtenerPlantilla } from "./plantilla";
import { crearVersionPropuesta } from "./versionPropuesta";

const propuestas = [
    { id: 1, titulo: 'Propuesta 1', monto: 1500, fecha: '15 octubre 2024', estado: 'aceptado' },
    { id: 2, titulo: 'Propuesta 2', monto: 2100, fecha: '10 octubre 2024', estado: 'aceptado' },
    { id: 3, titulo: 'Propuesta 3', monto: 1200, fecha: '08 octubre 2024', estado: 'aceptado' },
    { id: 4, titulo: 'Propuesta 4', monto: 2500, fecha: '31 octubre 2024', estado: 'aceptado' },
    { id: 5, titulo: 'Propuesta 5', monto: 2500, fecha: '31 octubre 2024', estado: 'aceptado' },
    { id: 6, titulo: 'Propuesta 6', monto: 2500, fecha: '31 octubre 2024', estado: 'abierto' },
    { id: 7, titulo: 'Propuesta 7', monto: 2500, fecha: '31 octubre 2024', estado: 'abierto' },
    { id: 8, titulo: 'Propuesta 8', monto: 2500, fecha: '31 octubre 2024', estado: 'en-progreso' },
    { id: 9, titulo: 'Propuesta 9', monto: 2500, fecha: '31 octubre 2024', estado: 'aceptado' },
    { id: 10, titulo: 'Propuesta 10', monto: 2500, fecha: '31 octubre 2024', estado: 'abierto' },
    { id: 11, titulo: 'Propuesta 11', monto: 2500, fecha: '31 octubre 2024', estado: 'abierto' },
    { id: 12, titulo: 'Propuesta 12', monto: 2500, fecha: '31 octubre 2024', estado: 'en-progreso' },
    { id: 13, titulo: 'Propuesta 13', monto: 2500, fecha: '31 octubre 2024', estado: 'declinado' },
    { id: 14, titulo: 'Propuesta 14', monto: 2500, fecha: '31 octubre 2024', estado: 'declinado' },
    { id: 15, titulo: 'Propuesta 15', monto: 2500, fecha: '31 octubre 2024', estado: 'declinado' },
]

// Obtener todas las organizaciones
export const obtenerPropuestas = async () => {
    return propuestas;
};

// Obtener una organización por ID
export const obtenerPropuesta = async (id: number) => {
    return propuestas.find(org => org.id === id) || null;
};

// Crear una nueva organización
export const crearPropuesta = async (cuerpo: any) => {
    try {
        // Preparamos los datos
        const data = {
            id_plantilla: cuerpo.idPlantilla,
            id_servicio: cuerpo.idServicio,
            id_organizacion: cuerpo.idOrganizacion,
            titulo: cuerpo.titulo,
            monto: cuerpo.presupuesto,
            descripcionEmpresa: cuerpo.orgDescripcion,
            informacion: 'Aqui ira info',
            id_usuario: 1,
            id_estado: 1,
        }
        // Obtenemos la ESTRUCTURA de la plantilla
        const grapesJsContent = await obtenerPlantilla(data.id_plantilla)

        const estructura = decodificadorEstructuraGrapesJS(grapesJsContent.contenido) // ['{{titulo}}', '{{saludo}}']
        
        // Creamos la propuesta
        //const respuestaDeIa = await postData('obtenerRespuestaAI', data); // NO FUNCIONA

        // Aqui deberia de obtenerse la respuesta de la AI usando await, pero por ahora tenemos este objeto
        const respuestaDeIa = {
            titulo: 'Propuesta comercial para Loopsy',
            descripcion: 'Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo "Contenido aquí, contenido aquí". Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de "Lorem Ipsum" va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo. Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).',
            presupuesto: '2000',
            conclusion: 'Muchas gracias'
        }
        
        // Una vez obtenida la respuesta podemos proceder a crear la propuesta
        // Creamos la propuesta
        const propuestaCreada = await postData('propuestas', data);

        // INYECTA el contenido generalo por la AI en la plantilla
        // OJO: La estructura del mensaje que devuelve la AI debe coincidir con la estructura de la plantilla
        const nuevoGrapesJSContent = reemplazarEstructuraGrapesJS(grapesJsContent.contenido, respuestaDeIa)
        console.log(nuevoGrapesJSContent)
        console.log(propuestaCreada)
        // Una vez inyectado, ya esta listo para almacenarse como la primera version de esta propuesta
        const cuerpoDeVersionACrear = {
            id: propuestaCreada.id,
            jsongrapes: JSON.stringify(nuevoGrapesJSContent)
        }
        console.log(cuerpoDeVersionACrear)
        await crearVersionPropuesta(cuerpoDeVersionACrear)
        // Retornamos true para que luego, en el front redirija al usuario
        return true;
    } catch (error) {
        throw new Error(`Ocurrio un error al crear la propuesta ${error instanceof Error ? error.message : String(error)}`)
    }
};

// Editar una organización
export const editarPropuesta = async (id: number, cuerpo: any) => {
    try {
        return true
    } catch (error) {
        return false
    }
};

// Eliminar una organización
export const eliminarPropuesta = async (id: number): Promise<boolean> => {
    const index = propuestas.findIndex(org => org.id === id);
    if (index !== -1) {
        propuestas.splice(index, 1);
        return true;
    }
    return false;
};
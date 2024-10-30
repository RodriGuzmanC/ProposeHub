import { respuestaDeIaEjemplo } from "../utils/definitions";
import { deleteData, getData, postData, updateData } from "../utils/methods";
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
    try {
        const res = await getData("propuestas")
        return res;
    } catch (error) {

    }
};

// Obtener una organización por ID
export const obtenerPropuesta = async (id: number) => {
    try {
        const propuesta = await getData(`propuestas/${id}`)

        if (!propuesta) throw new Error(`Propuesta con ID ${id} no encontrada`);
        return propuesta;
    } catch (error) {
        console.error(error)
    }
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
            usar_ai: cuerpo.usarAi,
            descripcionEmpresa: cuerpo.orgDescripcion,
            informacion: 'Aqui ira info',
            id_usuario: 1,
            id_estado: 1,
        }
        // Obtenemos la ESTRUCTURA de la plantilla
        const grapesJsContent = await obtenerPlantilla(data.id_plantilla)

        let contenidoGrapesJS = grapesJsContent.contenido

        // Creamos el contenido con AI y lo inyectamos a la plantilla
        if (data.usar_ai == true) {
            //const respuestaDeIa = await postData('obtenerRespuestaAI', data); // NO FUNCIONA
            const estructura = decodificadorEstructuraGrapesJS(grapesJsContent.contenido) // ['{{titulo}}', '{{saludo}}']
            contenidoGrapesJS = reemplazarEstructuraGrapesJS(grapesJsContent.contenido, respuestaDeIa)
        }
        // Una vez obtenida la respuesta podemos proceder a crear la propuesta
        // Creamos la propuesta
        const propuestaCreada = await postData('propuestas', data);


        // Una vez inyectado, ya esta listo para almacenarse como la primera version de esta propuesta
        const cuerpoDeVersionACrear = {
            id_propuesta: propuestaCreada.id,
            contenido: contenidoGrapesJS,
            en_edicion: 1
        }
        console.log(cuerpoDeVersionACrear)
        await crearVersionPropuesta(cuerpoDeVersionACrear)
        // Retornamos true para que luego, en el front redirija al usuario
        return true;
    } catch (error) {
        throw new Error(`Ocurrio un error al crear la propuesta ${error instanceof Error ? error.message : String(error)}`)
    }
};



export const EjemploPrueba = async (cuerpo: any) => {
    try {
        // Preparamos los datos
        const data = {
            id_plantilla: cuerpo.id_plantilla,
            id_servicio: cuerpo.id_servicio,
            id_organizacion: cuerpo.id_organizacion,
            titulo: cuerpo.titulo,
            monto: cuerpo.monto,
            usar_ai: cuerpo.usar_ai,
            descripcionEmpresa: cuerpo.descripcionEmpresa,
            instrucciones_adicionales: cuerpo.instrucciones_adicionales,
            informacion: cuerpo.descripcionEmpresa,
            id_usuario: 1,
            id_estado: 1,
        }
        // Obtenemos la ESTRUCTURA de la plantilla
        const grapesJsContent = await obtenerPlantilla(data.id_plantilla)

        let contenidoGrapesJS = grapesJsContent.contenido

        // Creamos el contenido con AI y lo inyectamos a la plantilla
        if (data.usar_ai == true) {
            const estructura = decodificadorEstructuraGrapesJS(grapesJsContent.contenido) // ['{{titulo}}', '{{saludo}}']
            console.log("Estructura")
            console.log(estructura)
            const dataParaAi = {
                id_servicio: data.id_servicio,
                id_organizacion: data.id_organizacion,
                titulo: data.titulo,
                monto: data.monto,
                descripcionEmpresa: data.descripcionEmpresa,
                indicaciones: data.instrucciones_adicionales,
                estructura: estructura
            }
            console.log(dataParaAi)
            const respuestaDeIa = await postData('propuestas/respuesta-ai', dataParaAi); // NO FUNCIONA
            console.log("Desde laravel respuesta")
            console.log(respuestaDeIa)

            // Ahora reemplazamos el texto de la plantilla por el texto hecho por la AI
            contenidoGrapesJS = reemplazarEstructuraGrapesJS(grapesJsContent.contenido, respuestaDeIa)
            console.log(contenidoGrapesJS)
        }
        // Una vez obtenida la respuesta podemos proceder a crear la propuesta
        // Creamos la propuesta
        console.log("Antes de crear propuesta")
        console.log(data)
        const propuestaCreada = await postData('propuestas', cuerpo);


        // Una vez inyectado, ya esta listo para almacenarse como la primera version de esta propuesta
        const cuerpoDeVersionACrear = {
            id_propuesta: propuestaCreada.id,
            contenido: contenidoGrapesJS,
            en_edicion: 1
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
        await updateData(`propuestas/${id}`, cuerpo)
        return true
    } catch (error) {
        return false
    }
};

export const editarHtmlCssPropuesta = async (id: number, cuerpo: any) => {
    try {
        const data = {
            version_publicada: cuerpo.version_publicada,
            html: cuerpo.html,
            css: cuerpo.css
        }
        const res = await updateData(`propuestas/${id}`, data)
        console.log(res)
        return true
    } catch (error) {
        console.log(error)
    }
};

// Eliminar una organización
export const eliminarPropuesta = async (id: number): Promise<boolean> => {
    try {

        const res = await deleteData(`propuestas/${id}`);
        return res; // Devuelve true si la operación se realiza correctamente
    } catch (error) {
        throw new Error((<Error>error).message);
    }
};
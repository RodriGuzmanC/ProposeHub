import { Propuesta, VersionPropuesta } from "../utils/definitions";
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
export const obtenerPropuestas = async (estado: string): Promise<Propuesta[]> => {
    try {
        const res = await getData(`propuestas?estado=${estado}`)
        return res;
    } catch (error) {
        throw new Error(`Error al obtener plantillas: ${error instanceof Error ? error.message : String(error)}`);

    }
};

// Obtener una organización por ID
export const obtenerPropuesta = async (id: number): Promise<Propuesta> => {
    try {
        const propuesta = await getData(`propuestas/${id}`)

        if (!propuesta) throw new Error(`Propuesta con ID ${id} no encontrada`);
        return propuesta;
    } catch (error) {
        throw new Error(`Error al obtener plantillas: ${error instanceof Error ? error.message : String(error)}`);

    }
};

// Crear una nueva organización
/*export const crearPropuesta = async (usar_ai: Boolean, descripcionEmpresa: string, propuesta: Propuesta): Promise<Propuesta> => {
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
        // Extraemos los datos necesarios del objeto
        const { id_plantilla, id_servicio, id_organizacion, titulo, monto, id_usuario, id_estado } = propuesta;
        // Creamos el cuerpo
        const cuerpo = { id_plantilla, id_servicio, id_organizacion, titulo, monto, id_usuario, id_estado };
        // Realizamos la solicitud
        // Obtenemos la ESTRUCTURA de la plantilla
        const grapesJsContent = await obtenerPlantilla(id_plantilla)

        let contenidoGrapesJS = grapesJsContent.contenido

        // Creamos el contenido con AI y lo inyectamos a la plantilla
        if (usar_ai == true) {
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
};*/



export const crearPropuesta = async (
    usar_ai: boolean,
    descripcionEmpresa: string,
    instrucciones_adicionales: string,
    propuesta: Partial<Propuesta>
): Promise<Propuesta> => {
    try {
        // Preparamos los datos
        /*const data = {
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
        }*/
        // Extraemos los datos necesarios del objeto
        const { id_plantilla, id_servicio, id_organizacion, titulo, monto, id_usuario, id_estado, informacion } = propuesta;
        // Creamos el cuerpo
        const cuerpo = { id_plantilla, id_servicio, id_organizacion, titulo, monto, id_usuario, id_estado, informacion };
        
        // Realizamos la solicitud
        if (!id_plantilla) throw new Error("No se ha encontrado el id de la plantilla proporcionada")
        // Obtenemos la ESTRUCTURA de la plantilla
        const grapesJsContent = await obtenerPlantilla(id_plantilla)
        let contenidoGrapesJS = grapesJsContent.contenido

        /** Creamos el contenido con AI y lo inyectamos a la plantilla SI ES QUE SE INDICO QUE SE USARA IA */
        if (usar_ai == true) {
            const estructura = decodificadorEstructuraGrapesJS(contenidoGrapesJS) // ['titulo', 'saludo']
            console.log("Estructura")
            console.log(estructura)

            const dataParaAi = {
                id_servicio: id_servicio,
                id_organizacion: id_organizacion,
                titulo: titulo,
                monto: monto,
                descripcionEmpresa: descripcionEmpresa,
                indicaciones: instrucciones_adicionales,
                estructura: estructura
            }
            // Realizamos la solicitud a GEMINI para que retorne el contenido de la propuesta en la estructura dada
            console.log(dataParaAi)
            const respuestaDeIa = await postData('propuestas/respuesta-ai', dataParaAi);
            console.log("Desde laravel respuesta")
            console.log(respuestaDeIa)

            // Ahora reemplazamos el contenido de la plantilla por el texto hecho por la AI
            contenidoGrapesJS = reemplazarEstructuraGrapesJS(grapesJsContent.contenido, JSON.parse(respuestaDeIa))
            console.log(contenidoGrapesJS)
        }

        // Creamos la propuesta
        console.log("Antes de crear propuesta")
        const propuestaCreada = await postData('propuestas', cuerpo);


        // Una vez inyectado, ya esta listo para almacenarse como la primera version de esta propuesta
        const cuerpoDeVersionACrear: Partial<VersionPropuesta> = {
            id_propuesta: propuestaCreada.id,
            contenido: contenidoGrapesJS,
            en_edicion: true,
            generado_por_ia: usar_ai,
        }
        console.log(cuerpoDeVersionACrear)
        await crearVersionPropuesta(cuerpoDeVersionACrear)
        // Retornamos true para que luego, en el front redirija al usuario
        return propuestaCreada;
    } catch (error) {
        throw new Error(`Ocurrio un error al crear la propuesta ${error instanceof Error ? error.message : String(error)}`)
    }
};

export const llamarGeminiApi = async (cuerpo: any) => {
    try{
        const data = {
            id_plantilla: cuerpo.id_plantilla,
            id_servicio: cuerpo.id_servicio,
            id_organizacion: cuerpo.id_organizacion,
            titulo: cuerpo.titulo,
            monto: cuerpo.monto,
            usar_ai: cuerpo.usar_ai,
            descripcionEmpresa: cuerpo.descripcionEmpresa,
            instrucciones_adicionales: ' no hay indicaciones',
            informacion: cuerpo.descripcionEmpresa,
            indicaciones: 'no hay indicaciones',
            id_usuario: 1,
            id_estado: 1,
        }
        const grapesJsContent = await obtenerPlantilla(data.id_plantilla)
        // Creamos el contenido con AI y lo inyectamos a la plantilla
        if (data.usar_ai == true) {
            const estructura = decodificadorEstructuraGrapesJS(grapesJsContent.contenido) // ['{{titulo}}', '{{saludo}}']
            console.log("Estructura de la plantilla")
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
            //console.log(dataParaAi)
            console.log("antes de llamar a gemini")
            const respuestaDeIa = await postData('propuestas/respuesta-ai', dataParaAi); // NO FUNCIONA
            console.log("Desde laravel respuesta")
            console.log(respuestaDeIa)

            // Ahora reemplazamos el texto de la plantilla por el texto hecho por la AI
            let contenidoGrapesJS = reemplazarEstructuraGrapesJS(grapesJsContent.contenido, JSON.parse(respuestaDeIa))
            console.log("Ya reemplazado")
            console.log(contenidoGrapesJS)
        }
    } catch (error) {
        throw new Error(`Ocurrio un error al lalmar a gemini ${error instanceof Error ? error.message : String(error)}`)
    }
}

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
        
        return res
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
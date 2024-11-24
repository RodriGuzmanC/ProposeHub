'use client'
import LoadingFallback from '@/app/components/grapes/LoadingFallback';
import { obtenerPlantilla } from '@/lib/services/plantilla';
import { editarHtmlCssPropuesta } from '@/lib/services/propuesta';
import { editarVersionPropuesta, obtenerVersionEnEdicion, obtenerVersionesPropuesta, obtenerVersionPropuesta } from '@/lib/services/versionPropuesta';
import { editarConToast, notificacionAsyncrona } from '@/lib/utils/alertToast';
import { VersionPropuesta } from '@/lib/utils/definitions';
import dynamic from 'next/dynamic';
import { lazy, Suspense, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// Lazy loading para GrapesJSComponent
const GrapesJSComponent = lazy(() => import('@/app/components/grapes/GrapesJSComponente'));


interface EditorPageProps{
    params: { id: string }
}

// Solo edita las propuestas
export default function EditorPropuestaPage({params} : EditorPageProps) {
    const [slug, setSlug] = useState<number>(parseInt(params.id)); // Inicializa como null
    const [idVersionPropuesta, setIdVersionPropuesta] = useState()

    async function getVersionporPropuesta() : Promise<VersionPropuesta>{
        try {
            if (slug == null) {
                throw new Error("No se ingreso un parametro")
            }
            // Obtenemos las versiones de la propuesta
            const versionEnEdicion = await obtenerVersionEnEdicion(slug)
            return versionEnEdicion
        } catch (error) {
            throw new Error("Hubo un error al momento de obtener la version en edicion")
        }
    }
    /**
     * Obtiene el contenido GrapesJS en formato String
     * @returns Devuelve un objeto JSON
     */
    async function obtenerContenidoVersion(){
        try {
            
            const version : VersionPropuesta = await getVersionporPropuesta()
            
            // Verifica que la propiedad "contenido" exista en el objeto
            if (version && version.contenido) {
                return JSON.parse(version.contenido); // Accede directamente a la propiedad "contenido"
            }
        } catch (error) {
            throw new Error("Hubo un error al momento de obtener la version en edicion")
        }
    }

    /**
     * 
     * @param grapesJSData Objeto GrapesJS en formato JSON
     * @returns Devuelve true si salio bien
     */
    async function actualizarVersion(grapesJSData : any){
        try {
            const versionActual : VersionPropuesta = await getVersionporPropuesta()

            const data = {
                contenido: JSON.stringify(grapesJSData)
            }
            //const version: any = await editarVersionPropuesta(slug, data)

            /*const version = await editarConToast({
                id: versionActual.id,
                cuerpo: data,
                event: editarVersionPropuesta
            })*/
            const versionActualizar : Partial<VersionPropuesta> = {
                id: slug,
                contenido: JSON.stringify(grapesJSData),
            }
            await notificacionAsyncrona(editarVersionPropuesta(versionActualizar), 'Actualizando...', 'Cambios guardados', 'Ocurrio un error, intentalo mas tarde')
            // Verifica que la propiedad "contenido" exista en el objeto
            /*if (version && version.contenido) {
                return version.contenido; // Accede directamente a la propiedad "contenido"
            }*/
           return versionActualizar
        } catch (error) {
            throw new Error("Hubo un error al momento de obtener la ultima version")
        }
    }

    async function publicarHtmlCss(html:string, css:string){

        try {
            const version = await getVersionporPropuesta()
        
            if (slug == null) {
                throw new Error("No se ingreso un parametro")
            }
            
            const data = {
                version_publicada: version.id,
                html: html,
                css: css
            }

            await editarConToast({
                id: slug,
                cuerpo: data,
                event: editarHtmlCssPropuesta
            })
            const url = `${process.env.NEXT_PUBLIC_ROOT}/vista/propuesta/${slug}`;
            toast.success(
                <div>Accede aquí: <a href={`${url}`} target='blank'>{`${url}`}</a>
                </div>
            );

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="h-screen flex flex-col">
            {/* El editor de GrapesJS */}
            <div className="flex-grow">
                {slug !== null ? ( // Verifica si slug está disponible
                    <Suspense fallback={<LoadingFallback />}>
                        <GrapesJSComponent 
                        slug={slug} 
                        loadFunction={obtenerContenidoVersion} 
                        storeFunction={actualizarVersion} 
                        launchFunction={publicarHtmlCss}
                        isProposeEditor={true}
                        linkHome={"/propuestas"}
                        />
                    </Suspense>
                ) : (
                    <LoadingFallback /> // Muestra un cargador mientras se obtiene el slug
                )}
            </div>
        </div>
    );
};
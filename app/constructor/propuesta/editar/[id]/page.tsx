'use client'
import LoadingFallback from '@/app/components/grapes/LoadingFallback';
import { obtenerPlantilla } from '@/lib/services/plantilla';
import { editarVersionPropuesta, obtenerVersionPropuesta } from '@/lib/services/versionPropuesta';
import { editarConToast } from '@/lib/utils/alertToast';
import dynamic from 'next/dynamic';
import { lazy, Suspense, useEffect, useState } from 'react';

// Lazy loading para GrapesJSComponent
const GrapesJSComponent = lazy(() => import('@/app/components/grapes/GrapesJSComponente'));


interface EditorPageProps{
    params: { id: string }
}

// Solo edita las propuestas
export default function EditorPropuestaPage({params} : EditorPageProps) {
    const [slug, setSlug] = useState<number | null>(parseInt(params.id)); // Inicializa como null

    /**
     * Obtiene el contenido GrapesJS en formato String
     * @returns Devuelve un objeto JSON
     */
    async function obtenerVersion(){
        try {
            if (slug == null) {
                throw new Error("No se ingreso un parametro")
            }

            const version: any = await obtenerVersionPropuesta(slug)
            
            // Verifica que la propiedad "contenido" exista en el objeto
            if (version && version.contenido) {
                return JSON.parse(version.contenido); // Accede directamente a la propiedad "contenido"
            }
        } catch (error) {
            throw new Error("Hubo un error al momento de obtener la ultima version")
        }
    }


    /**
     * 
     * @param grapesJSData Objeto GrapesJS en formato JSON
     * @returns Devuelve true si salio bien
     */
    async function actualizarVersion(grapesJSData : any){
        try {
            if (slug == null) {
                throw new Error("No se ingreso un parametro")
            }
            const data = {
                contenido: JSON.stringify(grapesJSData)
            }
            //const version: any = await editarVersionPropuesta(slug, data)
            const version = await editarConToast({
                id: slug,
                cuerpo: data.contenido,
                event: editarVersionPropuesta
            })
            // Verifica que la propiedad "contenido" exista en el objeto
            /*if (version && version.contenido) {
                return version.contenido; // Accede directamente a la propiedad "contenido"
            }*/
           return true
        } catch (error) {
            throw new Error("Hubo un error al momento de obtener la ultima version")
        }
    }

    return (
        <div className="h-screen flex flex-col">
            {/* El editor de GrapesJS */}
            <div className="flex-grow">
                {slug !== null ? ( // Verifica si slug está disponible
                    <Suspense fallback={<LoadingFallback />}>
                        <GrapesJSComponent slug={slug} loadFunction={obtenerVersion} storeFunction={actualizarVersion}/>
                    </Suspense>
                ) : (
                    <LoadingFallback /> // Muestra un cargador mientras se obtiene el slug
                )}
            </div>
        </div>
    );
};
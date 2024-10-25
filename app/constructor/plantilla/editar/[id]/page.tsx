'use client'
import LoadingFallback from '@/app/components/grapes/LoadingFallback';
import { editarContenidoPlantilla, editarPlantilla, obtenerPlantilla } from '@/lib/services/plantilla';
import { editarConToast } from '@/lib/utils/alertToast';
import dynamic from 'next/dynamic';
import { lazy, Suspense, useEffect, useState } from 'react';

// Lazy loading para GrapesJSComponent
const GrapesJSComponent = lazy(() => import('@/app/components/grapes/GrapesJSComponente'));


interface EditorPageProps{
    params: { id: string }
}

// Solo edita las plantillas
export default function EditorPlantillaPage({params} : EditorPageProps) {
    const [slug, setSlug] = useState<number | null>(parseInt(params.id)); // Inicializa como null

    /**
     * Obtiene el contenido GrapesJS en formato String
     * @returns Devuelve un objeto JSON
     */
    async function cargarPlantilla(){
        try {
            if (slug == null) {
                throw new Error("No se ingreso un parametro")
            }

            const plantilla: any = await obtenerPlantilla(slug)
            // Verifica que la propiedad "contenido" exista en el objeto
            if (plantilla && plantilla.contenido) {
                return JSON.parse(plantilla.contenido); // Accede directamente a la propiedad "contenido"
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
    async function almacenarPlantilla(grapesJSData : any){
        try {
            if (slug == null) {
                throw new Error("No se ingreso un parametro")
            }
            const data = {
                contenido: JSON.stringify(grapesJSData)
            }
            //const plantilla: any = await editarPlantilla(slug, data)
            const plantilla = await editarConToast({
                id: slug,
                cuerpo: data.contenido,
                event: editarContenidoPlantilla
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
                        <GrapesJSComponent slug={slug} loadFunction={cargarPlantilla} storeFunction={almacenarPlantilla} />
                    </Suspense>
                ) : (
                    <LoadingFallback /> // Muestra un cargador mientras se obtiene el slug
                )}
            </div>
        </div>
    );
};
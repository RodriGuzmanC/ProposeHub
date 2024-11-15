'use client'
import { generatePDFNuevo } from '@/app/components/grapes/DownloadPdf';
import CarouselVista from '@/app/components/propuestas/CarouselVista';
import HeaderVistaPropuesta from '@/app/components/propuestas/HeaderVista';
import PagesLoading from '@/app/components/skeletons/PagesLoading';
import { Button } from '@/components/ui/button';
import { getClientIdFromSession } from '@/lib/services/auth/auth';
import { editarPropuesta, obtenerPropuesta } from '@/lib/services/propuesta';
import { editarConToast } from '@/lib/utils/alertToast';
import { downloadRequest, postData } from '@/lib/utils/methods';
import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface PropuestasViewPageProps {
    params: { id: string }
}




const PropuestaPage = ({ params }: PropuestasViewPageProps) => {
    const [slug, setSlug] = useState<number | null>(parseInt(params.id));
    const [htmlContent, setHtmlContent] = useState<string | null>(null);
    const [cssContent, setCssContent] = useState<string | null>(null);
    const [error, setError] = useState("")
    const [datosPropuesta, setDatosPropuesta] = useState()

    // Estado por si el id de propuesta pasado no es correcto
    const [contenidoEstaCargado, setContenidoEstaCargado] = useState(false)

    
    async function aceptarPropuestaFun(){
        try {
            const data = {
                id_cliente: getClientIdFromSession(),
                id_estado: 3
            }
            if (slug == null) {
                setError("El id pasado es invalido o no existe")
                throw new Error("El id pasado es invalido o no existe")
            }
            await editarConToast({
                id: slug,
                cuerpo: data,
                event: editarPropuesta
            })

        } catch (error) {
            console.error(error)
        }
    }
    
    useEffect(() => {
        
        async function cargarContenido() {
            try {
                // Obtener el contenido de localStorage
                if (slug == null) {
                    setError("El id pasado es invalido o no existe")
                    throw new Error("El id pasado es invalido o no existe")
                }
                
                const propuesta = await obtenerPropuesta(slug)

                if (!propuesta){
                    setError('El contenido no esta disponible, intentalo mas tarde')
                    throw new Error('El contenido no esta disponible, intentalo mas tarde')
                }

                const storedHtml = propuesta.html
                const storedCss = propuesta.css

                if (storedHtml) setHtmlContent(storedHtml);
                if (storedCss) setCssContent(storedCss);

                setContenidoEstaCargado(true)

            } catch (error) {
                console.log(error)
            }
        }
        cargarContenido()
    }, []);

    const obtenerHtmlYGenerarPDF = async () => {
        const res = await downloadRequest('generar-pdf', {id: slug});
    };

    return (
        <div>
            {/* Mostrar mensaje de error si existe */}
            {error ? (
                <div className="error-message h-screen w-screen flex justify-center items-center font-semibold ">
                    {error}
                </div>
            ) : htmlContent ? (
                <div>
                    {/* Header fijo con botón "Aceptar propuesta" */}
                    <HeaderVistaPropuesta 
                        slug={slug}
                        aceptarPropuestaFun={aceptarPropuestaFun} 
                        obtenerHtmlYGenerarPDF={obtenerHtmlYGenerarPDF}
                    />
                    <div>
                        <style>{cssContent}</style>


                        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                        {/*<CarouselVista items={htmlContent}></CarouselVista>*/}
                    </div>
                </div>
            ) : (
                <PagesLoading />
            )}
        </div>
    );
};

export default PropuestaPage;


'use client'
import { generatePDFNuevo } from '@/app/components/grapes/DownloadPdf';
import HeaderVistaPropuesta from '@/app/components/propuestas/HeaderVista';
import PagesLoading from '@/app/components/skeletons/PagesLoading';
import { Button } from '@/components/ui/button';
import { editarPropuesta, obtenerPropuesta } from '@/lib/services/propuesta';
import { editarConToast } from '@/lib/utils/alertToast';
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
    const router = useRouter()
    const [botonAceptar, setBotonAceptar] = useState(true)

    // Estado por si el id de propuesta pasado no es correcto
    const [contenidoEstaCargado, setContenidoEstaCargado] = useState(false)

    async function aceptarPropuestaFun(){
        try {
            const data = {
                id_estado: 3
            }
            if (slug == null) {
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
                    throw new Error("El id pasado es invalido o no existe")
                }
                
                const propuesta = await obtenerPropuesta(slug)

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

    const obtenerHtmlYGenerarPDF = () => {
        const elements = document.querySelectorAll('.page'); // Selecciona todos los elementos con la clase "page"
        generatePDFNuevo(elements); // Llama a la función para generar el PDF
    };

    return (
        <div>
            
            {/* Header fijo con botón "Aceptar propuesta" */}
            <HeaderVistaPropuesta aceptarPropuestaFun={aceptarPropuestaFun} obtenerHtmlYGenerarPDF={obtenerHtmlYGenerarPDF}></HeaderVistaPropuesta>
            
            {htmlContent && (
                <div>
                    <style>{cssContent}</style>
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                </div>
            )}
            {!htmlContent && <PagesLoading></PagesLoading>}
        </div>
    );
};

export default PropuestaPage;


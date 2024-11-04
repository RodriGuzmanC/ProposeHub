'use client'
import { generatePDFNuevo } from '@/app/components/grapes/DownloadPdf';
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
            <header className="sticky top-0 left-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <span className="text-lg font-semibold">ProposeHub</span>
                        </div>

                        <Button variant="default" className="bg-green-600 hover:bg-green-700 text-white" onClick={aceptarPropuestaFun}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Aceptar propuesta
                        </Button>
                        <button onClick={obtenerHtmlYGenerarPDF}>
                            Descargar pdf
                        </button>
                    </div>
                </div>
            </header>
            {htmlContent && (
                <div>
                    <style>{cssContent}</style>
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                </div>
            )}
            {!htmlContent && <p>No hay contenido disponible.</p>}
        </div>
    );
};

export default PropuestaPage;



import ModalBackground from "../global/ModalBackground";
import type { Plugin } from 'grapesjs';
import ReactDOM from 'react-dom'; // Asegúrate de importar ReactDOM correctamente
import { downloadRequest, downloadRequestPdf } from "@/lib/utils/methods";
import { Document, Page } from 'react-pdf';
import { useEffect, useState } from "react";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Button } from "@/components/ui/button";
import { Download, Loader2, X } from "lucide-react";


interface PdfPrevInterface{
    slug: number
}

export const PdfPreviewModalPlugin: Plugin<PdfPrevInterface> = (editor, options) => {
    const { slug } = options
    // Referencia al modal que se crea para contener al plugin
    let modalContainer: HTMLDivElement | null = null;
    // Obtener el panel de acción donde están los botones
    const actionButtonsPanel = editor.Panels.getPanel('action-buttons');

    // Verificar si el panel ya contiene botones
    const existingButtons = actionButtonsPanel ? actionButtonsPanel.get('buttons') : [];


    // Panel de botones en el panel de acción de GrapesJS
    editor.Panels.addPanel({
        id: 'enviar-pdf',
        el: '.panel__action-buttons', // Asegúrate de que esta clase exista en tu HTML
        buttons: [
            {
                id: 'enviar-pdf',
                command() {
                    if (!modalContainer) {
                        // Crear un contenedor para el modal solo si no existe
                        modalContainer = document.createElement("div");
                        modalContainer.id = "modal-pdf-container";  // Puedes agregar un id si lo deseas
                        document.body.appendChild(modalContainer);  // Lo añadimos al body del documento
                    }

                    // Renderizar el modal dentro del contenedor
                    abrirModalCorreo(modalContainer);
                },
                className: '', // Cambié el icono a uno más adecuado
                attributes: { title: 'Pdf' },
                label: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M12.186 14.552c-.617 0-.977.587-.977 1.373 0 .791.371 1.35.983 1.35.617 0 .971-.588.971-1.374 0-.726-.348-1.349-.977-1.349z"></path><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM9.155 17.454c-.426.354-1.073.521-1.864.521-.475 0-.81-.03-1.038-.06v-3.971a8.16 8.16 0 0 1 1.235-.083c.768 0 1.266.138 1.655.432.42.312.684.81.684 1.522 0 .775-.282 1.309-.672 1.639zm2.99.546c-1.2 0-1.901-.906-1.901-2.058 0-1.211.773-2.116 1.967-2.116 1.241 0 1.919.929 1.919 2.045-.001 1.325-.805 2.129-1.985 2.129zm4.655-.762c.275 0 .581-.061.762-.132l.138.713c-.168.084-.546.174-1.037.174-1.397 0-2.117-.869-2.117-2.021 0-1.379.983-2.146 2.207-2.146.474 0 .833.096.995.18l-.186.726a1.979 1.979 0 0 0-.768-.15c-.726 0-1.29.438-1.29 1.338 0 .809.48 1.318 1.296 1.318zM14 9h-1V4l5 5h-4z"></path><path d="M7.584 14.563c-.203 0-.335.018-.413.036v2.645c.078.018.204.018.317.018.828.006 1.367-.449 1.367-1.415.006-.84-.485-1.284-1.271-1.284z"></path></svg>`  // El texto que aparece junto al ícono
            },
        ],
    });

    // Función para montar el modal dentro del contenedor creado
    const abrirModalCorreo = async (container: HTMLDivElement) => {
        /*const url = await downloadRequestPdf('generar-pdf', { id: slug })
        if (!url) {
            return null;
        }
        console.log(url)*/
        // Renderizar el modal de React en el contenedor dinámico
        ReactDOM.render(
            <PdfPreview
                slug={slug}
                closeEvent={()=>cerrarModalCorreo(container)}
            />,
            container
        );
    };

    // Función para cerrar el modal y limpiar el contenedor
    const cerrarModalCorreo = (container: HTMLDivElement) => {
        // Desmontar el componente React
        ReactDOM.unmountComponentAtNode(container);
        // Eliminar el contenedor del DOM
        document.body.removeChild(container);
        // Opcional: Reiniciar la referencia del contenedor
        modalContainer = null;
    };

};



const PdfPreview = ({ slug, closeEvent }: { slug: number, closeEvent: () => void }) => {
    const [numPages, setNumPages] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [url, setUrl] = useState('')

    const handleLoadSuccess = ({ numPages }: { numPages: number }) => {
        setIsLoading(false);
    };

    useEffect(()=>{
        async function cargarDatos(){
            const url = await downloadRequestPdf('generar-pdf', { id: slug })
            if (!url) {
                return null;
            }
            setUrl(url)
            setIsLoading(false);
        }
        cargarDatos()

    }, [])

    const handleDownload = () => {
        downloadRequest('generar-pdf', { id: slug });
      };

    const styles = {
        pdfContainer: {
            width: "80%",  // Ajusta al 80% del ancho de la pantalla
            maxWidth: "1200px",  // Ancho máximo
            maxHeight: "80vh",  // 80% de la altura de la pantalla
            backgroundColor: "white",  // Fondo blanco para el modal
            padding: "16px",  // Espaciado alrededor del visor
            borderRadius: "8px",  // Bordes redondeados
            overflow: "auto",  // Evita desbordamiento
            zIndex: 1001,  // Asegura que el visor quede por encima del fondo
            position: "relative" as "relative",
        }
    }

    return (
        <ModalBackground>
          <div className="w-[80%] max-w-[1200px] max-h-[80vh] bg-white p-4 rounded-lg overflow-auto relative z-[1001]">
            
            
            {isLoading ? (
                <div>
                    
              <div className="flex flex-col items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="mt-2 text-lg text-gray-600">Cargando PDF...</span>
              </div>
              </div>
            ) : (
                <div>
                    <div className="flex justify-between mb-4 sticky top-2 left-3 z-10">
              <Button
                onClick={handleDownload}
                variant="outline"
                className="flex items-center gap-2"
              >
                Descargar PDF
                <Download className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={closeEvent}
                className="rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
                <span className="sr-only">Cerrar</span>
              </Button>
            </div>
              <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
                <Viewer 
                  fileUrl={url} 
                  defaultScale={1}
                />
              </Worker>
              </div>
            )}
          </div>
        </ModalBackground>
      );
};

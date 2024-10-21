import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function PrintPDFButton() {
    const [pages, setPages] = useState<NodeListOf<Element>>();

    useEffect(() => {
        setPages(document.querySelectorAll('[data-page="true"]'));
    }, []); // Se ejecuta una vez al montar el componente

    const generatePDF = () => {
        if (pages && pages.length > 0) {
            const pdf = new jsPDF();
            const promises: Promise<any>[] = []; // Para almacenar las promesas de html2canvas

            pages.forEach((page, index) => {
                const pageElement = page as HTMLElement; 

                promises.push(
                    html2canvas(pageElement, { scale: 2 }).then((canvas) => {
                        const imgData = canvas.toDataURL('image/png');
                        const imgWidth = 210; 
                        const pageHeight = (canvas.height * imgWidth) / canvas.width; 
                        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, pageHeight);
                        
                        if (index < pages.length - 1) {
                            pdf.addPage();
                        }
                    })
                );
            });

            Promise.all(promises).then(() => {
                pdf.save("documento.pdf");
            });
        } else {
            console.error('No se encontraron páginas con el atributo data-page.');
        }
    };

    return (
        <div>
            <button onClick={generatePDF} className="bg-blue-500 text-white px-4 py-2 rounded">
                Descargar como PDF
            </button>
        </div>
    );
}



/*import jsPDF from 'jspdf';

export default function PrintPDFButton({contenido} : any) {
    const generatePDF = () => {
        // Obtén el iframe por su selector
        const iframe = document.querySelector('iframe'); // Ajusta esto según tu selector

        if (iframe) {
            // Accede al documento del iframe
            const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;

            if (iframeDocument) {
                // Obtén el contenido del body del iframe
                const content = iframeDocument.body.innerHTML;

                // Crea un nuevo documento PDF
                const pdf = new jsPDF();

                // Agrega contenido HTML al PDF
                pdf.html(content, {
                    callback: function(pdf){
                        pdf.save("prueba.pdf")
                    },
                    html2canvas: { scale: 1}
                })

            } else {
                console.error('No se pudo acceder al documento del iframe.');
            }
        } else {
            console.error('No se encontró el iframe.');
        }
    };

    return (
        <div>
            <button onClick={generatePDF} className="bg-blue-500 text-white px-4 py-2 rounded">
                Descargar como PDF
            </button>
        </div>
    );
}*/

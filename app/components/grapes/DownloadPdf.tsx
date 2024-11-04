import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const generatePDF = (pages: any) => {

    if (pages && pages.length > 0) {
        const pdf = new jsPDF();
        const promises: Promise<any>[] = []; // Para almacenar las promesas de html2canvas

        pages.forEach((page : any, index : any) => {
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




export const generatePDFNuevo = async (elements: any) => {
    const pdf = new jsPDF('p', 'mm', 'a4');

    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];

        // Convierte el elemento HTML a una imagen usando html2canvas
        const canvas = await html2canvas(element, { scale: 1, useCORS: true, allowTaint: true });
        const imgData = canvas.toDataURL('image/jpeg', 1.0);

        // Define las dimensiones de la imagen en el PDF
        const imgWidth = 210; // Ancho en mm para una página A4
        const pageHeight = 297; // Alto en mm para una página A4
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Añade la imagen al PDF en la posición correcta
        if (i === 0) {
            pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight); // Primera página
        } else {
            pdf.addPage(); // Añade una nueva página
            pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight); // Añade la imagen en la nueva página
        }
    }

    // Guarda el PDF
    pdf.save('document.pdf');
};




'use client'
import { Button } from '@/components/ui/button';
import { extractCssFromJson, extractHtmlFromJson } from '@/lib/utils/pdfConverter';
import { decoderGrapesJSBlocks, decoderGrapesJSBlocksWithReplacement, findPlaceholdersInGrapesJS } from '@/lib/utils/placeholderExtract';
import { CheckCircle, Menu } from 'lucide-react';
import { useEffect, useState } from 'react';


const ViewPage = () => {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [cssContent, setCssContent] = useState<string | null>(null);

  useEffect(() => {
    // Recuperar el JSON almacenado en localStorage
    const savedJson = localStorage.getItem('gjsProject');
    if (savedJson) {
      const projectData = JSON.parse(savedJson);

      // Extraer el HTML de los componentes
      const html = extractHtmlFromJson(projectData);

      // Extraer el CSS de los estilos
      const css = extractCssFromJson(projectData);

      setHtmlContent(html);
      setCssContent(css);
    }
  }, []);





  const savedJson = localStorage.getItem('gjsProject') ?? [];
  console.log(decoderGrapesJSBlocks(savedJson)); // ["titulo", "descripcion"]



  const nuevoTexto = {
    titulo: 'Propuesta comercial innovadora',
    descripcion: 'esta es una descripcion para esta propuesta innovadora',
    saludo: 'hola que tal',
    link: 'facebook.com',
    segundero: 'Aqui vamos en la segunda pag'
  };
  console.log(decoderGrapesJSBlocksWithReplacement(savedJson, nuevoTexto))
  return (
    <div>
      {/* Header fijo con botón "Aceptar propuesta" */}
      <header className="sticky top-0 left-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-lg font-semibold">ProposeHub</span>
            </div>
            
            <Button variant="default" className="bg-green-600 hover:bg-green-700 text-white">
              <CheckCircle className="mr-2 h-4 w-4" />
              Aceptar propuesta
            </Button>
          </div>
        </div>
      </header>
      {/* Inyectar el CSS si existe */}
      {cssContent && <style dangerouslySetInnerHTML={{ __html: cssContent }} />}

      {/* Renderizar el HTML extraído del JSON */}
      {htmlContent ? (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      ) : (
        <p>No content available</p>
      )}
    </div>
  );
};

export default ViewPage;
